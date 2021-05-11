const express=require('express');
const path=require('path');
const port=8000;
const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());//this is a middleware
app.use(express.static('assets'));//this is also a middleware.To look our
//project better we include this folder

//middleware1
//app.use(function(req,res,next){
      //req.myName="Manish";
      //console.log("middleware1 is called");
      //next();
//});

//middleware2
//app.use(function(req,res,next){
     //console.log("My name from MW2",req.myName);
     //console.log("Middleware2 is called");
     //next();
//});

var contactList=[
    {
        name:"Manish",
        phone:"8910611562"
    },
    {
        name:"Rohit",
        phone:"910611562"
    },
    {
        name:"Punnet",
        phone:"10611562"
    }
]


app.get('/',function(req,res){
   //res.send("<h1> Cool, it is running! </h1>");
   Contact.find({},function(err,contacts){
          if(err){
             console.log('Eroor in fetching contacs from db');
             return;
          }
   return res.render('home',{title:"My Contacts List",
   contacts_list:contactList
        });
   });
});

app.post('/create-contact',function(req,res){
    // return res.redirect('/back');
    //console.log(req.body);
  //  contactList.push({
       //  name:req.body.name,
       //  phone:req.body.phone
   // });
    //contactList.push(req.body);
   // return res.redirect('back');
   Contact.create({
         name:req.body.name,
        phone:req.body.phone
   },function(err,newContact){
       if(err){
           console.log('error in creating a contact!');
           return;
       }
       console.log('*****',newContact);
       return res.redirect('back');
   });

});

//for deleting a contact
app.get('/delete-contact/',function(req,res){
    // console.log(req.query);
    //get the query from url
     let phone=req.query.phone;
     
     let contactIndex=contactList.findIndex(contact=>contact.phone==phone);
     if(contactIndex!=-1){
         contactList.splice(contactIndex,1);
     }
     return res.redirect('back');
});


app.listen(port,function(err){
    if(err){
        console.log("error in running server",err);
    }
    console.log("server is running fine on port",port);
})