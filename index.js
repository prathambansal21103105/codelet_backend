const express=require("express");
const cors=require("cors");
const {User,Question}=require("./config.js");
const app=express();

app.use(express.json());
app.use(cors());

const fetchData=async()=>{
    const snapshot=await User.get();
    const list=snapshot.docs.map((doc)=>doc.data());
    return list;
}
const fetchQuestions=async()=>{
    const snapshot=await Question.get();
    const list=snapshot.docs.map((doc)=>doc.data());
    return list;
}
app.get("/fetchQuestions",async(req,res)=>{
    const list=await fetchQuestions();
    res.json({questions:list});
})
app.post("/createQuestions",async(req,res)=>{
    const data=req.body;
    Question.add(data);
    const updatedList=await fetchQuestions();
    res.json({questions:updatedList});
    // res.send({msg:"User added"});
})
app.post("/create",async(req,res)=>{
    const data=req.body;
    const list=await fetchData();
    let flag=0;
    for(const user of list){
        if(user.username==data.username && user.password==data.password){
            res.json({msg:"Exists"});
            flag=1;
            break;
        }
    }
    if(flag==0){
        User.add(data);
        const updatedList=await fetchData();
        res.json({users:updatedList});
    }
    // res.send({msg:"User added"});
})

app.get("/create",(req,res)=>{
    res.send({msg:"abc"});
})

app.get("/fetchUsers",async(req,res)=>{
    const list=await fetchData();
    res.json({users:list});
})

app.listen(4000,()=>{
    console.log("Server is running on port 4000.");
})