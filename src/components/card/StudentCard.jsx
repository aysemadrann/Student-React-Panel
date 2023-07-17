import React from 'react'
import Trash from '../../assets/images/trash.png'
import Pen from '../../assets/images/pen.png'

export default function StudentCard({ student, deleteFunc, detailStudent }) {
  return (
    <div className='d-flex student-card'>
      <div className="col-lg-1 student-card-avatar">
        <img src={student.image} alt="avatar" />
      </div>
      <div className="col-lg-2">
        {`${student.firstName} ${student.lastName}`}
      </div>
      <div className="col-lg-2">
        {student.email}
      </div>
      <div className="col-lg-2">
        {student.phone}
      </div>
      <div className="col-lg-2">
        {student.domain}
      </div>
      <div className="col-lg-2">
        {student.company.name}
      </div>
      <div className="col-lg-1 edit">
        <img src={Pen} alt="pen" onClick={() => detailStudent(student.id)} />
        <img src={Trash} alt="trash" onClick={() => deleteFunc(student.id)} />
      </div>
    </div>
  )
}
