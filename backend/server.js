import express, { response } from "express"
import Cors from "cors"
import Twitter from "twitter-lite";
import dotenv from "dotenv/config"





// client id SFYtSWxLbkhVVkxGYjNyM0pUM0I6MTpjaQ
// client secret XAKjbwqhBirN6iG_7mM02brjQnRB3oLDCjd8Rgt6ffxRIfRng8
const app=express();
//MIDDLEWARE
app.use(express.json())
app.use(Cors())

const client=new Twitter({
    subdomain:"api",
    version:"2.0",
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
    console.log(req.body.oauth_token,"token")
    console.log(req.body.oauth_verifier,"verifier")
})



//ENDPOINTS



app.listen(8800,()=>(console.log("Connected to backend")))