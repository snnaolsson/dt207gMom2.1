const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

//skapar ny databas
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/cv.db");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors()); //för att tillåta korsdomänsförfrågningar
app.use(express.json()); //skickar datan i json-format 


app.get("/cv", (req, res) => {
    res.json({message: 'Welcome to my API'})
});

app.get("/cv/jobs", (req, res)=> {

    db.all('SELECT * FROM jobs;', (err, rows)=>{
        if(err){
            res.status(500).json({error: "Something went wrong" + err});
            return;
        }

    if(rows.lenght === 0){
        res.status(404).json({message: 'No workplaces found'});
    }else{
        res.json(rows);
    };
});
});

//Lägg till användare /POST
app.post('/cv/jobs', (req, res)=>{
 
    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location= req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;

    let errors = {
        message: '',
        detail: '',
        https_response: {

        }
    }
    //error if no companyname or jobtitle is included
    if(!companyname || !jobtitle){
        //error msg
        errors.message = "Missing companyname or jobtitle";
        errors.detail = "You must include both companyname and jobtitle to add your workplace to your cv.";
       //error response code
        errors.https_response.message='Bad request';
        errors.https_response.code='400';

        res.status(400).json(errors);
        return;
    }
    
    if(companyname.lenght !== 0 && jobtitle.lenght !==0){
            //add workplace
        let stmt = db.prepare(  'INSERT INTO jobs(companyname, jobtitle, location, startdate, enddate)VALUES(?,?,?,?,?);');
        stmt.run(companyname, jobtitle, location, startdate, enddate);
        stmt.finalize();

    let work = {
        companyname: companyname,
        jobtitle: jobtitle,
        location: location,
        startdate: startdate,
        enddate: enddate
    };
    res.json({message: "Arbetet tillagt" + work});
}else{
  res.status(400).json(errors);
  console.log('400'+errors);
  return;     
}
});

//Uppdatera användare 
app.put('/cv/jobs/:id', (req, res)=>{
    let id = req.params.id;

    let companyname = req.body.companyname;
    let jobtitle = req.body.jobtitle;
    let location = req.body.location;
    let startdate = req.body.startdate;
    let enddate = req.body.enddate;

    let errors = {
        message: '',
        detail: '',
        https_response: {

        }
    }



    if(!companyname || !jobtitle){
           //error msg
           errors.message = "Missing companyname or jobtitle";
           errors.detail = "Your workplace must have both jobtitle and companyname.";
          //error response code
           errors.https_response.message='Internal server error';
           errors.https_response.code='500';
   
           res.status(500).json(errors);
           return;
    }
    if(companyname.lenght !==0 && jobtitle.lenght!==0){

    let stmt = db.prepare('UPDATE jobs SET companyname=?, jobtitle=?, location=?, startdate=?, enddate=? WHERE id=?;');
    stmt.run(companyname, jobtitle, location, startdate, enddate, id);
    stmt.finalize();

    res.json({message: companyname + " updated"})}
    else{
        res.status(500).json(errors);
        console.log('500'+errors);
        return; 
    }
    
});

app.delete('/cv/jobs/:id', (req, res)=>{
    let id = req.params.id;
    db.run('DELETE FROM jobs WHERE id=?;', id, (err)=>{
        if(err){console.log(err.message);}
    })
    res.json({message: 'Workplace deleted, id: ' + id});
})



app.listen(port, ()=>{
    console.log('Server is running on port: ' + port);
});