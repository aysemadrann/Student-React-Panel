import React from 'react';
import './../../../assets/scss/sidebar.scss'
import Header from '../header/Header';
import Avatar from '../../../assets/images/avatar.png'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouseChimney, faBookmark, faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { Link, NavLink } from 'react-router-dom'
import { navbar } from '../../../data/Sidebar'

export default function SideBar() {
    library.add(faHouseChimney, faBookmark)

    return (
        <div className='sidebar'>
            <Header />
            <div className='sidebar-avatar'>
                <img src={Avatar} alt="avatar" />
                <h4 className='sidebar-avatar-name'>John Doe</h4>
                <p className='sidebar-avatar-role'>Admin</p>
            </div>
            <div className='navbar'>
                <ul>
                    {
                        navbar.map((item, index) => {
                            return (
                                <NavLink key={index} to={item.link} className={({ isActive, isPending }) =>
                                    isActive ? "active" : ""
                                }>
                                    <li>
                                        <FontAwesomeIcon icon={item.icon} />
                                        <span className='navbar-item'>{item.title}</span>
                                    </li>
                                </NavLink>
                            )
                        })
                    }
                </ul>
            </div>
            <div className='logout'>
                <Link to="/">
                    <span className='logout-text'>Logout</span>
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                </Link>
            </div>
        </div>
    )
}
