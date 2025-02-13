import React, { useEffect, useState } from 'react'
import Header from './Header'
import "./css/Home.css"
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import { FaRegCopyright } from "react-icons/fa";

function Home() {
  const [demo, setdemo] = useState("")
  const [post1, setpost] = useState([])
  const [like, setlike] = useState("")
  const [likecound, setlikecound] = useState([])


  useEffect(() => {
    const usefunction = async () => {
      const getdata = await fetch("http://localhost:3001/getall")
      const total = await getdata.json()
      await setpost(total)
      const likeall = await fetch("http://localhost:3001/likeall")
      const likedata = await likeall.json()
      await setlikecound(likedata)

    }
    usefunction()
  }, [])
  console.log(post1);
  console.log(likecound);
  const [comment, setcomment] = useState("")
  const user = JSON.parse(localStorage.getItem('name'))
  const userID = JSON.parse(localStorage.getItem('id'))
  console.log(user);

  const Commenthandle = async () => {
    const data = await fetch('http://localhost:3001/patch', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        comment: comment,
        username: user,
        _id: demo




      })
    })
    const total = await data.json()
    console.log(total);
    toast.success("success", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      progress: undefined,
    })
    setcomment("")


    const getdata = await fetch("http://localhost:3001/getall")
    const total1 = await getdata.json()
    await setpost(total1)


  }

  console.log(demo);

  const filterpost = post1.filter((cur) => cur._id === demo)
  const handlelike = async (postID) => {
    const data = await fetch('http://localhost:3001/like', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        user: userID,
        postid: postID
      })
    })
    const total = await data.json()
    setlike(total)
    console.log(like);
    const likeall = await fetch("http://localhost:3001/likeall")
    const likedata = await likeall.json()
    await setlikecound(likedata)
  }

  return (
    <>
      <Header />
      <div className='homemain'>
        <div className='row d-flex gap-5 ms-5'>
          {
            post1.map((cur) => {
              return <div className='col-12 col-md-6 col-lg-5' id="innerhome" key={cur._id}>
                <p>{cur.author}</p>
                <h2>{cur.Title}</h2>
                <p>{cur.post}</p>
                <span><AiOutlineLike type='button' onClick={() => handlelike(cur._id)} style={{ fontSize: "1.6rem" }} /><span style={{ marginLeft: '-0.4rem', fontSize: '1.2rem' }} className="badge text-dark">{likecound.reduce((total, cur1) => total + cur1.postdetails.filter(prev => prev.postid === cur._id).length, 0)}</span></span>
                <span style={{ marginLeft: "3rem", fontSize: "1.4rem" }}><FaRegComment onClick={() => setdemo(cur._id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop" /><span style={{ marginLeft: '-0.4rem' }} class="badge text-dark">{cur.comment.length-1}</span></span>
              </div>
            })

          }
        </div>
      </div>

      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">Comment</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">

                  <input type="text" class="form-control" value={comment} onChange={(e) => setcomment(e.target.value)} placeholder='Add a Comment' id="comment" />

                </div>
              </form>
              <hr />
              {filterpost.map((cur) => {
                return <div>
                  {cur.comment.map((prev) => {
                    return <>
                      <p>{prev.username}</p>
                      <p>{prev.comments}</p>
                    </>

                  })}
                </div>
              })}


            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" data-bs-dismiss="modal" disabled={comment.length === 0} style={{ cursor: comment.length === 0 ? "not-allowed" : "pointer" }} onClick={Commenthandle} class="btn btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ position: 'sticky', bottom: '0px' }}>
        <h3 className='footer' >Copyright<span><FaRegCopyright /></span>2025</h3>
      </div>
      <ToastContainer />
    </>
  )
}

export default Home