import React from 'react';
import './nav-bar.css';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link} from 'react-router-dom'
const navbar=()=>{
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light shadow-sm   bg-white rounded" >
                <Link className="navbar-brand" to="/">
                   <span className="navbar-brand mb-0 h1"> Tour Planner</span>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav nav-tabs  ">
                    <li className="nav-item  px-md-3">
                        <Link className="nav-link " to="/"> <span className="align-text-bottom"><HomeIcon /></span> Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item px-md-3">
                        <Link className="nav-link" to="/post"><span className="align-text-bottom"><AddCircleIcon/></span> Post</Link>
                    </li>
                    <li className="nav-item px-md-3">
                        <Link className="nav-link" to="/login"><span className="align-text-bottom"><ExitToAppIcon/></span> Sign in</Link>
                    </li>

                </ul>
            </div>
            </nav>
        </div>
    )
};

export default navbar;