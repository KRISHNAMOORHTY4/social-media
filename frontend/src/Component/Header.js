import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./css/Header.css"
import { IoHome } from "react-icons/io5";
import { MdPostAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
function Header() {
    const navigate = useNavigate()
    const handlelogout = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (

        <div  >
            <nav className="navbar navbar-expand-lg navbar fixed-top " id="naven">
                <div className="container-fluid">
                    <Link to="/home" className="navbar-brand" style={{ color: "white" }} >Social Media</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link " id="link"><span><IoHome style={{ marginRight: '0.2rem', marginBottom: '0.2rem' }} /></span>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/post" className="nav-link" id="link"><span><MdPostAdd style={{ marginRight: '0.2rem', marginBottom: '0.2rem' }} /></span>Post</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link" id="link"><span><CgProfile style={{ marginRight: '0.2rem', marginBottom: '0.2rem' }} /></span>Profile</Link>
                            </li>
                            <li className='nav-item'>
                                <button className='btnbtn mt-2' style={{ backgroundColor: "transparent", color: "white", border: "none" }} onClick={handlelogout}><span><FiLogOut style={{ marginRight: '0.2rem', marginBottom: '0.2rem' }} /></span> Logout</button>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default Header