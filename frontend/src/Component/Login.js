import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./css/Login.css"



function Login() {
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: Useremail,
          password: Userpassword
        })
      })
      const total = await data.json()

      if (data.status === 400) {
        toast.error(total, { autoClose: 1000, pauseOnHover: false, position: "top-center" })
        console.log(total);

      }
      else {
        localStorage.setItem('auth', JSON.stringify(total.token))
        localStorage.setItem('id', JSON.stringify(total.userdata._id))
        localStorage.setItem('name', JSON.stringify(total.userdata.name))
        toast.success("success Login", { autoClose: 1000, pauseOnHover: false, position: "top-center" })
        setTimeout(() => {
          navigate('/home')

        }, 2000);


      }
      console.log(total);


    }
    catch (err) {
      toast.error(err)

    }

  }
  const [Useremail, setemail] = useState("");
  const [Userpassword, setpassword] = useState("");

  return (
    <div className='loginfullcontainer'>
      <div className='logininner'>

        <form onSubmit={handleSubmit}>
          <div><h2>Login</h2></div>
          <div className='inputlo-box'>
            <input type="email" placeholder='EMAIL' value={Useremail} onChange={(e) => setemail(e.target.value)} required />     
          </div>
          <div className='inputlo-box'>
          <input type="password" placeholder=' PASSWORD' value={Userpassword} onChange={(e) => setpassword(e.target.value)} required />       
          </div>
          <div >   <button type='submit' className='logbtn'>Login</button></div>
          <p className='paral'>Dont have an Account?<button><Link to="/">Register</Link></button></p>
          <ToastContainer/>
        </form>
      </div>
    </div>
  )
}

export default Login