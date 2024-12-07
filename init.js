const mongoose = require('mongoose');
const Chat=require("./models/chat.js");
main()
 .then(()=>{
    console.log("connection successful");
 })
 .catch((err)=>console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allChats=[
    {
        from: "alice",
        to: "bob",
        msg: "Hey Bob, are we still on for the meeting tomorrow?",
        created_at: new Date(),
    },
    {
        from: "bob",
        to: "alice",
        msg: "Yes, I'll see you at 10 AM!",
        created_at: new Date(),
    },
    {
        from: "carol",
        to: "dave",
        msg: "Did you complete the project report?",
        created_at: new Date(),
    },
    {
        from: "dave",
        to: "carol",
        msg: "Almost done, I'll send it to you by tonight.",
        created_at: new Date(),
    },
    {
        from: "eve",
        to: "frank",
        msg: "Are you joining the team lunch on Friday?",
        created_at: new Date(),
    },
    {
        from: "frank",
        to: "eve",
        msg: "Yes, count me in!",
        created_at: new Date(),
    },
    {
        from: "grace",
        to: "heidi",
        msg: "Could you review my latest design?",
        created_at: new Date(),
    },
    {
        from: "heidi",
        to: "grace",
        msg: "Sure, I'll get back to you by this evening.",
        created_at: new Date(),
    },
    {
        from: "ivan",
        to: "judy",
        msg: "Let's catch up over coffee sometime next week.",
        created_at: new Date(),
    },
    {
        from: "judy",
        to: "ivan",
        msg: "Sounds great! Let’s set a time.",
        created_at: new Date(),
    }
];

Chat.insertMany(allChats);


// chat1.save().then((res)=>{
//    console.log(res);
// });