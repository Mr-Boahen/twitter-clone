import logo from './logo.svg';
import './App.css';
import {useEffect,useState} from "react"
import axios from "axios"

function App() {

 



  const [a,s]=useState(null)  
  useEffect(()=>{
    
      const fetch= async()=>{
        const res=await axios.get("http://localhost:8800/login")
        s(res.data)
        
        
      
      }
      const getTokenFromUrl=()=>{
        return window?.location?.href.substring(23).split("&").reduce((initial,current)=>{
          var parts=current.split("=");
          initial[parts[0]]=decodeURIComponent(parts[1])
          return initial
        },{})
    }

    const sendTokens=async()=>{
      try{
        await axios.post("http://localhost:8800/accessToken",getTokenFromUrl())

      }catch(err){
          console.log(err)
      }

    }
      fetch()
      sendTokens()   

      



   
      
  },[])
  

  

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href={`https://api.twitter.com/oauth/authenticate?oauth_token=${a?.oauth_token}

          `}
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
