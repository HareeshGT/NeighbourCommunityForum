import React, { useState } from 'react';
import "./signupForm__style.css"
import axios from "axios"; 
import { useNavigate } from 'react-router-dom';

export default function AuthForm({onLoginIn}) {

  const Navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  const [signupData,setSignupData] = useState({
    name:"",
    email:"",
    password:"",
    address:"",
    location:"",
    type:"user"
  });

  const [loginData,setLoginData] = useState({
    email:"",
    password:""
  });

  const handleToggle = () => {
    setIsLogin(!isLogin); // Toggle between login and signup
  };

  const onSignup = async(e)=>{
    e.preventDefault();
    console.log(signupData);
    const data = await axios.post("http://localhost:3000/signup",signupData);     
    
  }
  
  const onLogin = async(e)=>{
    e.preventDefault();
    const data = await axios.post("http://localhost:3000/login",loginData);     
    // if(data.data.userId)
    console.log(data);
    if(data.data.type=="user")
    {
      onLoginIn({userId:data.data.id,location:data.data.location,name:data.data.name})
      Navigate("/homepage");
    }
    
}

  return (
    <div className="signup-form__container">
    <div className="wrapper">
      <div className="title-text">
        <div className={`title login ${isLogin ? 'active' : ''}`}>Account</div>
        <div className={`title signup ${!isLogin ? 'active' : ''}`}>Account</div>
      </div>
      <div className="form-container">
        <div className="slide-controls">
          <input
            type="radio"
            name="slide"
            id="login"
            checked={isLogin}
            onChange={handleToggle}
            
            />
          <input
            type="radio"
            name="slide"
            id="signup"
            checked={!isLogin}
            onChange={handleToggle}
            />
          <label htmlFor="login" className="slide login">
            Login
          </label>
          <label htmlFor="signup" className="slide signup">
            SignUp
          </label>
          <div className="slider-tab"></div>
        </div>
        <div className="form-inner">
          {isLogin ? (
              <form action="#" className="login" onSubmit={onLogin}>
              <div className="field">
                <input type="text" placeholder="Email Address" required value={loginData.email} onChange={(e)=> (setLoginData({...loginData,email:e.target.value}))}/>
              </div>
              <div className="field">
                <input type="password" placeholder="Password" required value={loginData.password} onChange={(e)=> setLoginData({...loginData,password:e.target.value})}/>
              </div>
              <div className="pass-link">
                <a href="#">Reset password?</a>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                Don't Have Account? <a href="#" onClick={handleToggle}>Create A New</a>
              </div>
            </form>
          ) : (
              <form action="#" className="signup" onSubmit={onSignup}>
              <div className="field">
                <input type="text" name="name" placeholder="Name" required  value={signupData.name} onChange={(e)=> setSignupData({...signupData,name:e.target.value})}/>
              </div>
              <div className="field">
                <input type="text" name="email" placeholder="Email Address" required value={signupData.email} onChange={(e)=> setSignupData({...signupData,email:e.target.value})}/>
              </div>
              <div className="field">
                <input type="password" name="password" placeholder="Password" required value={signupData.password} onChange={(e)=> setSignupData({...signupData,password:e.target.value})}/>
              </div>
              <div className="field">
                <input type="text" name="address" placeholder="Address" required value={signupData.address} onChange={(e)=> setSignupData({...signupData,address:e.target.value})}/>
              </div>
              <div className="field">

                <select name="" id="" value={signupData.location} onChange={e=>setSignupData({...signupData,location:e.target.value})}>
                  <option value="" disabled>Select Location</option>
                  <option value="Karur">Karur</option>
                  <option value="Erode">Erode</option>
                  <option value="Namakkal">Namakkal</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Salem">Salem</option>
                </select>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="SignUp"/>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
          </div>
  );
}
