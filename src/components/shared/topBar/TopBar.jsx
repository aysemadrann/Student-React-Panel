import React from 'react'
import Arrow from '../../../assets/images/caret-circle-down.png'
import Bell from '../../../assets/images/bell.png'
import '../../../assets/scss/topbar.scss'

export default function TopBar() {
    return (
        <div className='topbar'>
            <img src={Arrow} alt="arrow" />
            <img src={Bell} alt="arrow" />
        </div>
    )
}
