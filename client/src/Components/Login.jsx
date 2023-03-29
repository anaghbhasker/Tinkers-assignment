import React from "react";
import './Login.css'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate=useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let obj = {
            email: data.get("email"),
            password: data.get("password"),
            };
            if(obj.email&&obj.password){
                let regEmail =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(regEmail.test(obj.email.toString())){
                axios.post('http://localhost:4000/login',obj).then((response)=>{
                    if (response.data.status==="success") {
                        localStorage.setItem('ownertoken',response.data.token);
                        navigate('/pokemons')
                    } else {
                        toast.error(response.data.message, {
                            position: "top-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            });
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            }else{
                toast.error(`Please enter valid email address`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
            }
            }else{
            toast.error(`OOPS! All fields are required`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
          }
    }
  return (
    <>
    <div className="login">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h3>Login Here</h3>
        <label for="username">Username</label>
        <input type="text" name="email" placeholder="Email or Phone" id="username" />

        <label for="password">Password</label>
        <input type="password" name="password" placeholder="Password" id="password" />
        <button>Log In</button>
      </form>
    </div>
    </>
  );
}

export default Login;
