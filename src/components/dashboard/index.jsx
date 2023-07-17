import React from 'react'
import SideBar from '../shared/sideBar/SideBar'
import TopBar from '../shared/topBar/TopBar'
import InfoCard from '../card/InfoCard';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Bookmark from '../../assets/images/bookmark.png'
import Graduation from '../../assets/images/graduation-cap.png'
import User from '../../assets/images/vector.png'
import Usd from '../../assets/images/usd-square.png'

export default function Dashboard() {
    const cards = [
        {
            title: 'Students',
            icon: Graduation,
            color: '#F0F9FF',
            number: 243
        },
        {
            title: 'Course',
            icon: Bookmark,
            color: '#FEF6FB',
            number: 13
        },
        {
            title: 'Payments',
            icon: Usd,
            color: '#FEFBEC',
            number: '556,000₺'
        },
        {
            title: 'Users',
            icon: User,
            color: 'linear-gradient(134deg, #FEAF00 0%, #F8D442 100%)',
            number: 3
        }
    ]

    library.add(faGraduationCap)

    return (
        <div className='d-flex'>
            <SideBar />
            <div className='w-100'>
                <TopBar />
                <div className='d-flex padding-30'>
                    {
                        cards.map((item, index) => {
                            return (
                                <InfoCard info={item} key={index} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
