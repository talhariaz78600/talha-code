const { response } = require("express");
const express= require("express");
const cors= require('cors');
const { Configuration, OpenAIApi } =require( "openai");
const OPENAI_API_KEY='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'
const configuration = new Configuration({
    
    apiKey:OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
 




const app=express();
app.use(express.json());
app.use(cors());
app.get('/ping',(req,res)=>{
    res.json({
        message:"ping"
    })
})
app.post('/chat',(req,res)=>{
    const question=req.body.question;
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 3863,
        temperature: 0,
      }).then((response)=>{
       return response?.data.choices?.[0].text;
      }).then((answer="")=>{
        const array=answer?.split("\n").filter((value)=>value).map((value)=>value.trim());
        return array;
      })
      .then((answer)=>{
          res.json({
              answer:answer,
              propt:question,
          })

      });
})
app.listen(3000,()=>{
console.log("Server is listening on port 3000");
})