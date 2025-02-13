import React, { useState } from 'react'
import Header from './Header'
import "./css/Post.css"
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Post() {
    const [title,settitle]=useState("")
    const [post,setpost]=useState("")
    const navigate=useNavigate()
    const user = JSON.parse(localStorage.getItem('name'))
const handlesubmit=(e)=>{
    e.preventDefault()
    fetch("http://localhost:3001/post",{
        method:'POST',
        headers:{"content-type":"application/json"},
        body:JSON.stringify({
            Title:title,
            Post:post,
            name:user
        })
    })

    console.log(post);
    console.log(title);
    toast.success("Successful added the post", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        progress: undefined,
      
       
        })
    setpost("");
    settitle("");

    setTimeout(() => {
        navigate("/home")      
    },2000);
   
    
    

}
  return (
    <>
    
    <Header/>

     
     <div className='d-flex justify-content-center'   style={{marginTop:'50px'}}>
       
       
        <form className="mt-4" id='postmain' onSubmit={handlesubmit} style={{width:"50%"}}>
            <div className='mb-3'>
                <h2>NEW POST</h2>
            </div>
            <div className='mb-5'>
                <label >Title</label>
                <input type="text" className='form-control' value={title} onChange={(e)=>settitle(e.target.value)} required />
            </div>
            <div className='mb-5 mt-3'>
                <label >POST</label>
                <textarea name="" className='form-control' id="" value={post} onChange={(e)=>setpost(e.target.value)} required></textarea>
            </div>
            <div className='mt-3 mb-5'>
                
                <input type="submit" className='form-control' id="postbtn" />
            </div>
            

        </form>
    </div>
    <ToastContainer/>
    </>
    
  )
}

export default Post