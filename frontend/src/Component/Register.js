import React, { useState } from 'react'
import './css/Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    name: Username,
                    email: Useremail,
                    password: Userpassword
                })
            })
            const total = await data.json()
            if (data.status === 401) {
                toast.error(total, { autoClose: 1000, pauseOnHover: false, position: "top-center" })
            }
            else {
                toast.success("success Register", { autoClose: 1000, pauseOnHover: false, position: "top-center" })
                setTimeout(() => {
                    navigate('/login')

                }, 2000);


            }
            console.log(total);



        }
        catch (err) {
            toast.error(err)

        }


    }
    const [Username, setname] = useState("")
    const [Useremail, setemail] = useState("");
    const [Userpassword, setpassword] = useState("");


    return (
        <div className='regfullcontainer'>
            <div className='reginner'>

                <form onSubmit={handleSubmit}>

                    <h2 className='regis'>Register</h2>
                    <div className='input-box'>

                        <input type="text" name='name' placeholder='Name' value={Username} onChange={(e) => setname(e.target.value)} required />

                    </div>
                    <div className='input-box'>
                        <input type="email" name='email' placeholder='EMAIL' value={Useremail} onChange={(e) => setemail(e.target.value)} required />

                    </div>
                    <div className='input-box'>

                        <input type="password" name='password' placeholder=' PASSWORD' value={Userpassword} onChange={(e) => setpassword(e.target.value)} required />

                    </div>


                    <div className='regbtn'><button type='submit' className='regbtn'>Submit</button></div>
                    <p className='para'>you already have an account?<button className='loginbtn' role='link'><Link className='lina' to="/login">Login</Link></button></p>

                </form>
            </div>

            <ToastContainer />


        </div>
    )
}

export default Register