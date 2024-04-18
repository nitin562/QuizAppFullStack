const express=require("express")
const cors=require("cors")
const app=express()
const port=8000||process.env.PORT // if env file is present and make sure install dotenv but if you have new version of nodejs then dotenv functionality is built in

app.use(cors()) //cors issue solved
app.use(express.json()) //json body parser middleware
//using api modules
app.use("/api/quiz",require("./API/Quiz.api"))

//listen at port
app.listen(port,()=>{
    console.log(`Server started at http://localhost:8000`)
})


