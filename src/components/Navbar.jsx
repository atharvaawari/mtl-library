import React from "react";
import '../App.css';

export default function Navbar() {



    return (
        <>
            <div className="container-fluid">
                <div className="row shadow py-2">
                    <div className="col-11 mx-auto ">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <div className="container-fluid">
                                <a className="navbar-brand" href="/">
                                    <img style={{width: '25px'}} src="https://www.mindyourlogic.com/static/Home_page_Assets/favicon.png" alt="" />
                                    <span>MindYourLogic</span></a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto gap-2">
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="https://mindyourlogic.team/home-page">Home</a>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Leaves
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a className="dropdown-item" href="https://mindyourlogic.team/office-leaves">Submit Leaves</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Uploads
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a className="dropdown-item" href="https://mindyourlogic.team/uploads-youtube">Youtube Uploads</a></li>
                                                <li><a className="dropdown-item" href="https://mindyourlogic.team/uploads-instagram">Instagram Uploads</a></li>
                                                <li><a className="dropdown-item" href="https://mindyourlogic.team/uploads-facebook">Facebook Uploads</a></li>
                                                <li><a className="dropdown-item" href="https://mindyourlogic.team/uploads-website">Website Uploads</a></li>
                                                <li><a className="dropdown-item" href="https://mindyourlogic.team/content-hub">Content hub</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Team Tasks
                                            </a>
                                            <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                                                <li><a className="dropdown-item" href="https://mindyourlogic.team/my-tasks">My Task</a></li>
                                                <li><a className="dropdown-item" href="https://mindyourlogic.team/tasks-animation">Team Animation</a></li>
                                                <li><a className="dropdown-item" href="https://mindyourlogic.team/tasks-game">Team Game</a></li>
                                                <li><a className="dropdown-item" href="https://mindyourlogic.team/tasks-uploads">Team Uploads</a></li>
                                                <li><a className="dropdown-item" href="https://mindyourlogic.team/tasks-website">Team Website</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Games
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a className="dropdown-item" href="https://mindyourlogic.team/games-score">Games Scores</a></li>
                                                
                                            </ul>
                                        </li>
                                    </ul>
                                    <form className="d-flex">
                                        <a href="/logout" className="btn btn-outline-secondary" type="submit">Logout</a>
                                    </form>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}