import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Register () {
       const [userDetails, setUserDetails] = useState({
       name: "",
       email:"",
       password: "",
       age:""
      });

      const [message, setMessage] = useState({
        type: "invisible-msg",
        text: "Dummy msg"
      });

       function handleInput (event) {
        setUserDetails((prevObj)=>{
            return {...prevObj, [event.target.name]: event.target.value}
            

        });
       
         }

        function handleSubmit(event) {

        event.preventDefault();
        console.log(userDetails);

        fetch('https://api.edamam.com/api/nutrition-details', {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json"
                
            }
            
        })
        .then((response)=>response.json())
        .then((data)=>{
           
         setMessage({type: "success", text: data.message});
         setUserDetails({
            name: "",
            email:"",
            password: "",
            age:""
         })

           setTimeout(()=>{
            setMessage({type: "invisible-msg", text:"Dummy sg"});
           },5000);

        })
        .catch((err)=>{
            console.log(err);
        });
        } 
        
        
        // useEffect(()=>{
        //     console.log(details)
        //     },[details]) 



        



    return(
        <section className="container">

         <form className="form" onSubmit={handleSubmit}>
            <h1>Join Us For Fitness</h1>
            <input type="text" required onChange={handleInput} className="inp" 
            placeholder="Enter Name" name="name" value={userDetails.name}/>
            <input type="email" required onChange={handleInput} className="inp" 
            placeholder="Enter Email" name="email" value={userDetails.email}/>
            <input type="password" required maxLength={8} onChange={handleInput} className="inp" 
            placeholder="Enter Password" name="password" value={userDetails.password}/>
            <input type="number" required max={100} min={12} onChange={handleInput} className="inp" 
            placeholder="Enter Age" name="age" value={userDetails.age}/>
            <button className="btn" >Register Now</button>
            <p>Already Registered ? <Link to="/login">Login</Link> </p>
            <p className={message.type}>{message.text}</p>

         </form>

         {/* <button onClick={()=>{
            setDetails((prevObj)=>{
                return{...prevObj, name: "Caleb"}
            });
         }}>Click</button> */}


        </section>
    )
}
