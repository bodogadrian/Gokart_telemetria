const socket = new WebSocket('ws://localhost:5000')

const names = JSON.parse(localStorage.getItem("idname"))

const divs = document.getElementById("container")

for(i=0;i<names.length;i++){ 
  divs.innerHTML += 
  `<div class="box">
        <h4>Név:<p>${names[i].gokart_name}</p></h4>
         <h4>Típus:<p>${names[i].gokart_messageType}</p></h4>
        <h4>Felhasználó:<p>${names[i].username}</p></h4>
 </div>`
    }   


const Xcoordinates = JSON.parse(localStorage.getItem("Xcoordinates"))
const Ycoordinates = JSON.parse(localStorage.getItem("Ycoordinates"))


const coordinates = []
for(var i=0;i<Xcoordinates.length;i++){
        coordinates.push([Xcoordinates[i],Ycoordinates[i]])
}

var myChart;

let canvas = document.getElementById('myChart');

let ctx = canvas.getContext('2d');


function download_CSV_file(){
    var csv = ",";

    coordinates.forEach(function(row){
        csv += row.join(",");
        csv += "\n";
    })

    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8"+encodeURI(csv);
    hiddenElement.target = "_blank";

    hiddenElement.download = "gokarts.csv";
    hiddenElement.click()
    location.reload()
}

onload = fetch("/csv/gokarts.csv").then(res=>{

    return res.text()

}).then(data=>{

    let result = data.split(/\r?\n|\r/).map(e=>{

        return e.split(",")
    })


        myChart = new Chart(ctx, {
    
            type: 'scatter',
    
            data: {
    
                datasets: [{
    
                    label:["A referencia megtett útvonala"],
                    
                    backgroundColor:["red"],
    
                    data: result.map(pos => ({x: pos[0],y: pos[1]}))
                    
                },]
    
            },
    
            options: {
                
    
                responsive: false,
    
                aspectRatio: 1,
                
                maintainAspestRatio: true,
    
                scales: {
    
                    xAxes: [{
    
                        gridLines:{
                            color:"rgba(0,0,0,0)"
                        },

                        ticks:{
    
                            stepSize:2,
    
                            suggestedMax:10,
    
                            suggestedMin:-10,                       
    
                        }  
    
                    }],
    
                    yAxes: [{
    
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

let isDrawing = false;
let x = 0;
let y = 0;

canvas.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

canvas.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    drawLine(ctx, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    drawLine(ctx, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

var movementArr=[];

function drawLine(ctx, x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 4;
  ctx.moveTo(x1, y1);
  movementArr.push({from:[x1,y1], to:[x2,y2]})
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

document.getElementById("btn").onclick = function() {palyarajz()};

function palyarajz(){
    localStorage.setItem('Palya', JSON.stringify(movementArr))
}

})

