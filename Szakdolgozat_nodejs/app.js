const express = require("express")
const mysql = require("mysql");
const path = require("path")
const app = express();
const server = require("http").createServer(app)
const WebSocket = require("ws")
const wss = new WebSocket.Server({server:server});


const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Sopron97",
    database: "db"
});

app.set('view engine','hbs')

app.use(express.urlencoded({extended:false}))

app.use(express.json())


db.connect((error) =>{
    if(error){
        console.log(error)
    }else{
        console.log("MYSQL Connected....")
    }
})

app.use("/",require("./routes/pages"))
app.use("/auth",require("./routes/auth"))


wss.on("connection",function connection(ws){

    console.log("Új kliens csatlakozva")

    var join = ("select users.username, gokart_users.gokart_name, gokart_users.gokart_messageType from gokart_users LEFT JOIN users ON users.id = gokart_users.gokart_id")
    db.query(join,function(err,results){
        if(err) throw err;
        ws.send(JSON.stringify({
            nameandgokart:results
        }))

    })


    ws.send("Új kliens csatlakozva")


    ws.on("message",function incoming(message){

        var gokarts = (JSON.parse(message))
        
        db.query("select gokart_name and gokart_messageType from gokart_users where gokart_name = ? and gokart_messageType = ?",[gokarts.data.name[0],gokarts.data.messageType[0]],(error,results) =>{
            
            if(error) {
                console.log(error);
            }
            
            if(results.length > 0){
                console.log("Már van ilyen tulajdonságú gokart az adatbázisban")
            }
            
            else{
                db.query("INSERT INTO gokart_users (gokart_name,gokart_messageType) values(?,?)",[gokarts.data.name[0],gokarts.data.messageType[0]]);
                console.log("A "+gokarts.data.name[0]," bekerült az adatbázisba")            
            }
        }) 
        
        db.query("select gokart_name and gokart_messageType from gokart_users where gokart_name = ? and gokart_messageType = ?",[gokarts.data.name[1],gokarts.data.messageType[1]],(error,results) =>{
            
            if(error) {
                console.log(error);
            }
            
            if(results.length > 0){
                console.log("Már van ilyen tulajdonságú gokart az adatbázisban")
            }
            
            else{
                db.query("INSERT INTO gokart_users (gokart_name,gokart_messageType) values(?,?)",[gokarts.data.name[1],gokarts.data.messageType[1]]);
                console.log("A "+gokarts.data.name[1]," bekerült az adatbázisba")            
            }
        })

        db.query("select gokart_name and gokart_messageType from gokart_users where gokart_name = ? and gokart_messageType = ?",[gokarts.data.name[2],gokarts.data.messageType[2]],(error,results) =>{
        
            if(error) {
                console.log(error);
            }
        
            if(results.length > 0){
                console.log("Már van ilyen tulajdonságú gokart az adatbázisban")
            }
            
            else{
                db.query("INSERT INTO gokart_users (gokart_name,gokart_messageType) values(?,?)",[gokarts.data.name[2],gokarts.data.messageType[2]]);
                console.log("A "+gokarts.data.name[2]," bekerült az adatbázisba")            
            }
        }) 
        
    })

})

server.listen(5000, () =>{
    console.log("Server started on Port 5000")
})