import React from 'react'
import StudentCard from '../card/StudentCard'

export default function StudentTable(props) {
  return (
    <div className='student-table'>
      <div className='table-thead d-flex'>
        <div className="col-lg-1"></div>
        <div className="col-lg-2">
          Name
        </div>
        <div className="col-lg-2">
          Email
        </div>
        <div className="col-lg-2">
          Phone
        </div>
        <div className="col-lg-2">
          Website
        </div>
        <div className="col-lg-2">
          Company
        </div>
        <div className="col-lg-1"></div>
      </div>
      {
        props.students.map((item) => {
          return (
            <StudentCard student={item} key={item.id} students={props.students} deleteFunc={props.deleteStudentFunc} detailStudent={props.detailStudent} />
          )
        })
      }
    </div>
  )
}
