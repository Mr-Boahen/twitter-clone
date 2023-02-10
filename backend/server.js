import express, { response } from "express"
import Cors from "cors"
import Twitter from "twitter-lite-v2";
import Twit from "twit"
import dotenv from "dotenv/config";





// client id SFYtSWxLbkhVVkxGYjNyM0pUM0I6MTpjaQ
// client secret XAKjbwqhBirN6iG_7mM02brjQnRB3oLDCjd8Rgt6ffxRIfRng8
const app=express();
//MIDDLEWARE
app.use(express.json())
app.use(Cors())

var access_tokens=null

const client=new Twitter({
    subdomain:"api",
    version:"2",
    consumer_key:"M4njLraZHMJncrLHN52bdOmO4",
    consumer_secret:"t5E9e07o21EQ6oDdfce61mK8yemRjFqvIp57K2CArwGVgz0YTm",
   
})


app.get('/login', (req, res) => {
    // Generate the authentication link
   client.getRequestToken("http://localhost:3000/").then((token)=>{
        
        return res.json(token)
        
        
    }).catch(console.error)
    
   
  
});

app.post("/accessToken",(req,res)=>{
    client.getAccessToken({
        oauth_token:req?.body.oauth_token,
        oauth_verifier:req?.body.oauth_verifier
    }).then((res)=>{
        access_tokens=res
        console.log(access_tokens)
        const twitter=new Twit({
            consumer_key:"M4njLraZHMJncrLHN52bdOmO4",
            consumer_secret:"t5E9e07o21EQ6oDdfce61mK8yemRjFqvIp57K2CArwGVgz0YTm",
            access_token_secret:access_tokens?(access_tokens?.oauth_token_secret):("hello"),
            access_token:access_tokens?(access_tokens?.oauth_token):("hello")
            
        })

        twitter.get("users/me",{id:access_tokens.user_id,screen_name:access_tokens.screen_name},(err,data,response)=>{
            console.log(data)
        })
        
       
        
        // app.get("/getUser",async(req,res)=>{
        //     await twitter.get("users/me").then((user)=>{
        //          console.log(user)
        //          res.json(user)
        //      }).catch(console.error)
        //  })
    }).catch(console.error)
    
})






//ENDPOINTS



app.listen(8800,()=>(console.log("Connected to backend")))