const socket = new WebSocket('ws://localhost:5000')

var ros = new ROSLIB.Ros({

    url:'ws://10.0.2.15:9090'

});

ros.on('connection',function(){

    console.log("Connected to websocket server")

});

ros.on('error',function(){

    console.log("Error connecting to websocket server: ",error)

}); 

ros.on('close',function(){

    console.log("Connection to websocket server closed.")

});


let gokartssub = []
let gokarts = {};
gokarts.name = []
gokarts.messageType = []

for(let i=1;i<4;i++){
    let topic = new ROSLIB.Topic({
        ros:ros,
        name: "/dwm120"+i+"/pos",
        messageType:"nav_msgs/Odometry"
    });
    gokartssub.push(topic)
    gokarts.name.push(topic.name)
    gokarts.messageType.push(topic.messageType)

}

var myChart2;

let canvas2 = document.getElementById('myChart2');

let ctx2 = canvas2.getContext('2d');

    myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: '# of Votes',
            data: [],
        }]
    },
    options: {
    
        legend:{
            display:false,
        },


        responsive: false,

        aspectRatio: 1,
        
        maintainAspestRatio: true,

        scales: {

            xAxes: [{

                display: false,

                gridLines:{
                    color:"rgba(0,0,0,0)"
                },
                
                ticks:{

                    stepSize:2,

                    suggestedMax:10,

                    suggestedMin:-10,                       

                }

            }]

,            yAxes: [{

                display: false,

                gridLines:{
                    color:"rgba(0,0,0,0)"
                },

                ticks:{
                    
                    stepSize:2,

                    suggestedMax:9,
                    
                    suggestedMin:-6,

                }

            }]

        }

    }
    
    
});
const movements = JSON.parse(localStorage.getItem("Palya"));

    function drawLine(ctx2, x1, y1, x2, y2) {
        ctx2.beginPath();
        ctx2.strokeStyle = 'white';
        ctx2.lineWidth = 6;
        ctx2.moveTo(x1, y1);
        ctx2.lineTo(x2, y2);
        ctx2.stroke();
        ctx2.closePath();
    }
    setTimeout(() => {
        for(const movement of movements){
            drawLine(ctx2,...movement.from,...movement.to)
        }
    }, 2000)



var myChart1;

let canvas1 = document.getElementById('myChart1');

let ctx1 = canvas1.getContext('2d');

const colors = ["red", "blue", "yellow","grey","black","purple","brown"]

socket.addEventListener("message",function (event){

    try{

        //Adatok fogadása a szervertől
        var datas = (JSON.parse(event.data))

        localStorage.setItem("idname",JSON.stringify(datas.nameandgokart))
        
        
    }catch(err){
    }

    function init(){

        myChart1 = new Chart(ctx1, {
    
            type: 'scatter',
    
                data: {

                    datasets: datas.nameandgokart.map((x, i) => ({

                        label:  [x.username + " - " + x.gokart_name.substring(4,8)],

                        backgroundColor: [colors[i]],

                        data: []
                    })
                    
            )},
    
            options: {
    
                responsive: false,
    
                aspectRatio: 1,
                
                maintainAspestRatio: true,

                legend: {

                    labels: {

                        boxWidth:14,

                        fontColor:"white",

                        fontSize:15,

                    }

                },
    
                scales: {
    
                    xAxes: [{
    
                        gridLines:{
                            color:"rgba(0,0,0,0)"
                        },
                        
                        ticks:{
    
                            stepSize:2,
    
                            suggestedMax:10,
    
                            suggestedMin:-10, 
                            
                            display:false,
    
                        }
    
                    }]
    
        ,            yAxes: [{
    
                        gridLines:{
                            color:"rgba(0,0,0,0)"
                        },
    
                        ticks:{
                            
                            stepSize:2,
    
                            suggestedMax:9,
                            
                            suggestedMin:-6,

                            display:false,
    
                        }
    
                    }]
    
                }
    
            }
            
    
        });
        
        
    
    }
    init();    

})


const names = JSON.parse(localStorage.getItem("idname"))
const firstlap = document.getElementById("firsttime")
const secondlap = document.getElementById("secondtime")
const thirdlap = document.getElementById("thirdtime")
const firstname = document.getElementById("firstname")
const secondname = document.getElementById("secondname")
const thirdname = document.getElementById("thirdname")

class Round{
    constructor(user) {
        this.user=user;
        this.isStarted = false;
        this.outside = false;
        this.startTime;
        this.endTime;
        this.seconds;
    }
}

const rounds = [];
for(let i=0;i<names.length;i++){
    rounds.push([new Round(names[i])])
}


function measure_lap_time(r,y,x){
    if(y > 0 && y < 0.5 && x > -4 && x < 0){
        if(!r[r.length -1].isStarted){
            r[r.length -1].startTime = performance.now();
            console.log("Belépett")
            r[r.length -1].isStarted = true;
            r[r.length -1].outside = false;
        }else if(r[r.length -1].outside === true){
            r[r.length -1].endTime = performance.now();
            r[r.length -1].seconds = (r[r.length -1].endTime - r[r.length -1].startTime)/1000;
            r.push(new Round(r[r.length - 1].user))
            r[r.length -1].startTime = performance.now();
            r[r.length -1].isStarted = true;
            r[r.length -1].outside = false;
        }

    }else if(r[r.length -1].isStarted){
        r[r.length -1].outside = true;
    }

}


function secondtimeheader(time){
    m = Math.trunc(time / 60) % 60;
    s = Math.trunc(time) % 60;
    ms = Math.trunc(time * 1000) % 100;

    return `${m || '00'}:${s.toString().length === 1 ? `0${s}` : s || '00'}.${ms || '00'}`;
}
function secondtime(time){
    m = Math.trunc(time / 60) % 60;
    s = Math.trunc(time) % 60;
    ms = Math.trunc(time * 1000) % 100;

    return `${m || '--'}:${s.toString().length === 1 ? `0${s}` : s || '--'}.${ms || '--'}`;
}

if("Xcoordinates" in localStorage){
    console.log("Az üzemeltető a pályarajz miatt futtatta már az adatokat")
}else{
    localStorage.setItem("Xcoordinates","null")
}
if("Ycoordinates" in localStorage){
    console.log()
}else{
    localStorage.setItem("Ycoordinates","null")
}

const xCoordinates = localStorage.getItem("Xcoordinates");
const yCoordinates = localStorage.getItem("Ycoordinates");
const speedstuff = document.getElementById("speeds")


let arrX = [];
let arrY = [];

for(let i=0;i<gokartssub.length;i++){
    speedstuff.innerHTML += `<div class="speedelements"> 
        <div><img id="gokart" src="/img/gokart.png"></img></div>                

        <div class="speedplayer1">               
            
        <div class="name">Name:</div>

        <span id="setting">Best:<span class = "best">--:--.--</span></span>
        
        <span id="setting">Top speed:<span class = "speed"">0 MPH</span></span>

        </div>

        </div>`
}
for (const [i,topics] of gokartssub.entries()){
    
    topics.subscribe(function(message){

        myChart1.data.datasets[i].data.push({x:message.pose.pose.position.x, y:message.pose.pose.position.y});        

        let x = message.pose.pose.position.x;

        let y = message.pose.pose.position.y;

        if(i === gokartssub.keys().next().value){
            arrX.push(x)
            arrY.push(y)

        }
        
        if(xCoordinates === "null" && yCoordinates === "null" || xCoordinates.length === arrX.length && yCoordinates.length === arrY.length){
            
            localStorage.setItem("Xcoordinates",JSON.stringify(arrX))

            localStorage.setItem("Ycoordinates",JSON.stringify(arrY))

        }
        else{
            console.log()
        }

        
        measure_lap_time(rounds[i],y,x)

        const sortedLaps = []


        for (laps of rounds) {

            const fastest = laps.sort((x, y) => (x.seconds || 999) - (y.seconds || 999));
            
            sortedLaps.push(fastest[0])
        }
        const users = []

        for (kor in rounds) {
            const fastest = rounds[kor].sort((x, y) => (x.seconds || 999) - (y.seconds || 999))[0].seconds;
            
            const filteredArray = rounds[kor].filter(x => x && x.seconds);

            const average = filteredArray.reduce((acc, stuff) => acc + stuff.seconds, 0) / (filteredArray.length) || "--";            
            
            const userData = {fastest, average, username: rounds[kor][0].user?.username}
            
            users.push(userData)
        }

        localStorage.setItem('users', JSON.stringify(users))

        const fastestLaps = sortedLaps.sort((x, y) => (x.seconds || 999) - (y.seconds || 999))
       
       
        firstlap.textContent = secondtimeheader(fastestLaps[0]?.seconds);
        
        secondlap.textContent = secondtimeheader(fastestLaps[1]?.seconds);
        
        thirdlap.textContent = secondtimeheader(fastestLaps[2]?.seconds);

        firstname.textContent = fastestLaps[0]?.seconds ? fastestLaps[0]?.user.username : "";

        secondname.textContent = fastestLaps[1]?.seconds ? fastestLaps[1]?.user.username : "";

        thirdname.textContent = fastestLaps[2]?.seconds ? fastestLaps[2]?.user.username : "";

        speedstuff.innerHTML ="";
        for(let i=0;i<gokartssub.length;i++){
            speedstuff.innerHTML += `<div class="speedelements"> 
                <div><img id="gokart" src="/img/gokart.png"></img></div>                

                <div class="speedplayer1">               
                    
                <div class="name">${fastestLaps[i]?.user.username}</div>

                <span id="setting">Best:<span class = "best">${secondtime(fastestLaps[i]?.seconds) || "--:--.--"}</span></span>
                
                <span id="setting">Top speed:<span class = "speed"">0 MPH</span></span>

                </div>

                </div>`
        }
        
        
        myChart1.update();

    })
}

//Küldendő adatok a klienstől
socket.addEventListener("open",function(event){
    socket.send(JSON.stringify({
        data: gokarts
    }))
})

     
    

