const async = require("hbs/lib/async");
const bcrypt = require("bcryptjs");
const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "db"
});

exports.register_with_password = (req,res) =>{
  console.log(req.body)
  const {username,password,email} = req.body;
    db.query("select email from users where email = ?", [email],async(error,results) =>{
        if(error) {
            console.log(error);
        }
         console.log(results) 
          if(results.length > 0){
            return res.render('register_with_password',{
              message:"Ez az email cím már használatban van."
            })
          }
          if (!username || !password || !email){
            return res.render('register_with_password',{
              message:"Kérlek add meg az adatokat!"
            })
          }
          
          let hashedPassword = await bcrypt.hash(password,8);
      
    db.query('INSERT INTO users SET ?', {username: username, password: hashedPassword ,email:email }, (error, results) => {
        if(error) {
          console.log(error);
        } else {
          console.log(results);
          return res.render('register_with_password', {
            message: 'Sikeres regisztráció'
          });
        }
      })
    });
}

exports.login_with_password = (req, res) => {
  const {username,password,email} = req.body;

  if (!username || !password || !email){
    return res.status(400).render('login_with_password',{
      message:"Kérlek add meg az adatokat!"
    })
  }
  db.query('SELECT * FROM users WHERE username = ? and email = ?', [username,email], async (error, results) => {
    if(results < 1 || !(await bcrypt.compare(password,results[0].password))){
      res.status(401).render("login_with_password",{
          message:"Hibás adatokat adtál meg"
      })
    }
    else{
      res.redirect("/gokart")
    }
  })
}

exports.register_admin = (req,res) =>{
  console.log(req.body)
  const {username,password,email} = req.body;
    db.query("select email from admin where email = ? ", [email],async(error,results) =>{
        if(error) {
            console.log(error);
          }
          if(results.length > 0){
            return res.render('register_admin',{
              message:"Ez az email cím már használatban van."
            })
          }
          if (!username || !password || !email){
            return res.render('register_admin',{
              message:"Kérlek add meg az adatokat!"
            })
          }
          
          let hashedPassword = await bcrypt.hash(password,8);
      
    db.query('INSERT INTO admin SET ?', {username: username, password: hashedPassword,email:email }, (error, results) => {
        if(error) {
          console.log(error);
        } else {
          console.log(results);
          return res.render('register_admin', {
            message: 'Sikeres regisztráció'
          });
        }
      })
    });
}

exports.login_admin = (req, res) => {
  const {username,password,identifier_code,email} = req.body;
  if (!username || !password || !identifier_code || !email){
    return res.status(400).render('login_admin',{
      message:"Kérlek add meg az adatokat!"
    })
  }
  db.query('SELECT * FROM admin WHERE username = ? and email = ?', [username,email], async (error, results) => {
    if(results <1  || !(await bcrypt.compare(password,results[0].password))){
      res.status(401).render("login_admin",{
        message:"Hibás adatokat adtál meg."
      })
    }
    if(identifier_code != "AdMiN123"){
      return res.status(400).render('login_admin',{
        message:"Az azonosító kód helytelen."
      })
    }
    else{
      res.redirect("/admin")
    }
  })

}
