import React, { useEffect, useState } from 'react'
import Header from './Header'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import "./css/Profile.css"
import { MdDelete } from "react-icons/md";

function Profile() {
  const [data, getdata] = useState([])
  const userID = JSON.parse(localStorage.getItem('id'))
  const name = JSON.parse(localStorage.getItem('name'))
  const user = JSON.parse(localStorage.getItem('name'))
  const [post, setpost] = useState([])
  const [like, setlike] = useState("")
  const [likecound, setlikecound] = useState([])
  const [demo, setdemo] = useState("")
  const [comment, setcomment] = useState("")

  useEffect(() => {
    const getfunction = async () => {
      const getdata1 = await fetch("http://localhost:3001/getone")
      const total = await getdata1.json()
      await getdata(total)
    }
    getfunction()

  }, [])
  console.log(data);

  const filterdata = data.filter((cur) => cur._id === userID)
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

  console.log(filterdata);
  useEffect(() => {
    const usefunction = async () => {
      const getdata = await fetch("http://localhost:3001/getall")
      const total = await getdata.json()
      await setpost(total)




    }
    usefunction()
  }, [])

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
  console.log(demo);
  const handledelete = async (id) => {
    const deletedata = await fetch(`http://localhost:3001/delete/${id}`, {
      method: 'DELETE'
    })
    const total = await deletedata.json()
    console.log(total);

    toast.success("delete post", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      progress: undefined,
    })
    const getdata = await fetch("http://localhost:3001/getall")
    const total1 = await getdata.json()
    await setpost(total1)



  }
  const filterpost = post.filter((cur) => cur.author === name)
  console.log(filterpost);





  return (
    <>
      <Header />
      <div className='  mt-5' id="profileinner">


        {filterdata.map((cur) => {
          return <div className='mt-3' id="profile">
            <h1>PROFILE</h1>
            <h3>Name:{cur.name}</h3>
            <h3>Email:{cur.email}</h3>
          </div>

        })}
        <div><h3 style={{ textDecoration: 'underline' }}>POST</h3></div>
        {filterpost.length === 0 ?
          <h2>NO POST</h2> : filterpost.map((cur) => {
            return <div className='col-12 col-md-6 col-lg-5' id="innerprofile" key={cur._id}>
              <p>{cur.author}</p>
              <h2>{cur.Title}</h2>
              <p>{cur.post}</p>
              <span><AiOutlineLike type='button' onClick={() => handlelike(cur._id)} style={{ fontSize: "1.6rem" }} /><span style={{ marginLeft: '-0.4rem' }} className="badge text-dark">{likecound.reduce((total, cur1) => total + cur1.postdetails.filter(prev => prev.postid === cur._id).length, 0)}</span></span>
              <span style={{ marginLeft: "3rem", fontSize: "1.4rem" }}><FaRegComment style={{ cursor: 'pointer' }} onClick={() => setdemo(cur._id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop" /><span style={{ marginLeft: '-0.4rem' }} class="badge text-dark">{cur.comment.length - 1}</span> <span><MdDelete onClick={() => handledelete(cur._id)} style={{ marginLeft: "2rem", cursor: 'pointer' }} /></span></span>
            </div>
          })

        }


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

                      <p><b>{prev.comments}</b></p>
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
      <ToastContainer />
    </>
  )
}

export default Profile