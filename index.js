const express=require("express");
const cors=require("cors");
const {User,Question,db}=require("./config.js");
const {doc,getDoc}=require("firebase/firestore");
const app=express();

app.use(express.json());
app.use(cors());

const fetchData=async()=>{
    const snapshot=await User.get();
    // console.log(snapshot.docs);
    // const list=snapshot.docs.map((doc)=>doc.data());
    const list=[];
    const data = snapshot.docs;
    for(const val of data){
        const obj=val.data();
        obj.id=val.id;
        list.push(obj);
    }
    // console.log("Data:");
    // console.log(data);
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
    res.json({ questions: updatedList });
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

app.post("/favs",async(req,res)=>{
    console.log("received");
    const data=req.body;
    const id=data["id"];
    const favs=data["favs"];
    console.log(data);
    const docRef=User.doc(id);
    const snap=await docRef.get();
    console.log(snap.data());
    const user=snap.data();
    user["favorites"]=favs;
    const delRes = await User.doc(id).delete();
    const addRes = await User.add(user);
    console.log(delRes);
    console.log(addRes.id);
    const responseData={};
    responseData["id"]=addRes.id;
    const userDetailsSnap=await User.doc(addRes.id).get();
    const userDetails=userDetailsSnap.data();
    userDetails.id=addRes.id;
    const userList=await fetchData();
    res.send({user:userDetails,items:userList});
    // console.log(docSnap);
    // console.log(docSnap.data());
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