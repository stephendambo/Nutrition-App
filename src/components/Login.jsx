import { useState } from "react";
import { Link,useNavigate } from "react-router-dom"

export default function Login() {

    const navigate = useNavigate();

    const [userCreds, setUserCreds] = useState({

        email: "",
        password: ""
    }) 

    const [message, setMessage] = useState({
        type: "invisible-msg",
        text: "Dummy msg"
    });

    function handleInput(event) {
        setUserCreds((prevObj)=>{
        return{...prevObj,[event.target.name]:event.target.value}
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(userCreds);

        fetch("https://api.edamam.com/api/nutrition-details", {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers: {
                "Content-Type": "application/json"
            }
        })
             
            .then((response)=>{
                // console.log(response);
                if(response.status===404)
                {
                    setMessage({type: "error", text: "Username or Email Doesn't Exist"});
                }
                else if(response.status===403) {
                    setMessage({type: "error", text: "Incorrect password"});
                }
              
                   
                

                setTimeout(()=>{
                    setMessage({type: "invisible-Msg", text:"Dummy Msg"})
                },5000)

                return response.json();
            })
            .then((data)=>{

             

             if(data.token!==undefined) 
             {
                localStorage.setItem("nutrify-user", JSON.stringify(data));

                navigate("/track");
             }
               

            })
            .catch((err)=>{
                console.log(err);
            });
            
               
    }

    // var query = '1lb brisket and fries'
    // $.ajax({
    //     method: 'GET',
    //     url: 'https://api.api-ninjas.com/v1/nutrition?query=' + query,
    //     headers: { 'X-Api-Key': 'ZxLavkVKAkMcuvR8RiVZ8Q==YuT3jFRyulzplTx2'},
    //     contentType: 'application/json',
    //     success: function(result) {
    //         console.log(result);
    //     },
    //     error: function nutrition(jqXHR) {
    //         console.error('Error: ', jqXHR.responseText);
    //     }
    // });






    return (
        <section className="container">

         <form className="form" onSubmit={handleSubmit}>
            <h1>Login To Fitness</h1>
            
            <input type="email" onChange={handleInput} className="inp" require
            placeholder="Enter Email" name="email" value={userCreds.email}/>
            <input type="password" onChange={handleInput} className="inp" maxLength={8}
             placeholder="Enter Password" name="password" value={userCreds.password}/>
            <button className="btn">Login</button>
            <p>Don't Have an Account ? <Link to="/register">Register Now</Link></p>
            <p className={message.type}>{message.text}</p>

         </form>
        </section>
    )
}