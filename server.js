const mongoose=require("mongoose");
const next=require("next");
const dotenv=require("dotenv");

const dev=process.env.NODE_ENV!="production";
const nextServer=next({dev});
const handle=nextServer.getRequestHandler();

dotenv.config({path: "./config.env"});
const app=require("./app");

//DATABASE
const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);

// mongoose.connect(DB,{
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,

// }).then(()=>console.log("DB connected Successfully"));

const PORT= process.env.PORT||3000;

nextServer.prepare().then(()=>{
    app.get("*",(req,res)=>{
        return handle(req,res);
    })
    app.listen(PORT,()=>{
        console.log(`App Running on port ${PORT}...`)
    })
})