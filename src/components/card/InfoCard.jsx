import React from 'react'
import '../../assets/scss/card.scss'

export default function InfoCard(props) {
    return (
        <div className='w-100 info-margin'>
            <div className='w-100 info-card col-lg-3 padding-20' style={{ background: props.info.color }}>
                <img src={props.info.icon} className='info-card-icon' alt='icon' />
                <p className='info-card-text'>{props.info.title}</p>
                <h2 className='d-flex justify-content-end info-card-number'>{props.info.number}</h2>
            </div>
        </div>
    )
}
