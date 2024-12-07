const express=require('express');
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
//app.use(express.static(path.join(__dirname, "public"), { maxAge: 0 }));
//to parse data from form to db
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("__method"));
main()
 .then(()=>{
    console.log("connection successful");
 })
 .catch((err)=>console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/chats",async (req,res)=>{
    let chats= await Chat.find();
    res.render("index.ejs",{chats});
});
//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})
//create route
app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newChat.save()
    .then((res)=>{// when use then then dont require await
       console.log("chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
})
//EDIT ROUTE
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})
// update route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    // because in object there is no name new msg
    let {msg:newMsg}=req.body;
    let updateChat=await Chat.findByIdAndUpdate(id,
        {msg:newMsg},
        {runValidators:true,new:true}
    );
    res.redirect("/chats");

})
app.get("/",(req,res)=>{
    res.send("root is working");
});

// let chat1= new Chat({
//     from:"vishal",
//     to:"bhavesh",
//     msg:"Send me your exam sheets",
//     created_at:new Date(),
// });

// chat1.save().then((res)=>{
//    console.log(res);
// });
app.listen(8080,()=>{
   console.log("server is listening on port 8080");
});