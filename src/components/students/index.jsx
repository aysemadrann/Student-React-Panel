import React, { useEffect, useState } from 'react'
import SideBar from '../shared/sideBar/SideBar'
import TopBar from '../shared/topBar/TopBar'
import SearchBar from './SearchBar'
import StudentTable from './StudentTable'
import { deleteStudent, getSearchStudentList, getStudentDetail, getStudents, sendStudent, updateStudent } from '../../plugins/Api/Api'
import ArrowLeft from '../../assets/images/arrow-left.png'
import ArrowRight from '../../assets/images/arrow-right.png'
import { Form, Modal, Button, Alert } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router'

export default function Students() {
    const [students, setStudents] = useState([]);
    const [count, setCount] = useState([])
    const [limit, setLimit] = useState(6)
    const [skip, setSkip] = useState(0)
    const [show, setShow] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [addSuccess, setAddSuccess] = useState(false)
    const [success, setSuccess] = useState(false)
    const [variant, setVariant] = useState('')
    const [student, setStudent] = useState({
        firstName: '',
        lastName: '',
        age: null,
        phone: null,
        email: '',
        domain: '',
    })

    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation()

    // Statelerin change işlemi
    const handleChange = (name, value) => {
        setStudent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Modalı kapama fonksiyonu
    const handleClose = () => {
        setShow(false)
        navigate('/students')
        setStudent({})
    }

    // Öğrenci ekleme işlemi
    const addStudent = async (e) => {
        e.preventDefault();
        const response = await sendStudent(student);

        if (response) {
            console.log('responsee', response);
            setAddSuccess(true)
            setVariant('success')
        } else {
            setVariant('danger')
        }

        setTimeout(() => {
            setAddSuccess(false)
        }, 2000);

    }

    // Öğrenci silme işlemi
    const deleteStudentFunc = async (id) => {
        const response = await deleteStudent(id)

        const index = students.findIndex((item) => item.id === id)

        if (response) {
            const newStudent = students.splice(index, 1);
            setStudent(newStudent)
            setSuccess(true)
            setVariant('success')

            setTimeout(() => {
                studentsList(limit, skip)
                setSuccess(false)
            }, 2000);
        } else {
            setVariant('danger')
        }
    }

    // Öğrenci bilgileri güncelleme işlemi
    const updateStudentDetail = async (e) => {
        e.preventDefault();

        const response = await updateStudent(student, params.id);

        if (response) {
            setAddSuccess(true)
            setVariant('success')

            // const index = students.findIndex((item) => item.id === params.id)
            // students[index] = response

            setTimeout(() => {
                setAddSuccess(false)
            }, 2000);
        }
    }

    // Öğrenci detayını getirme işlemi
    const detailStudent = async (id) => {
        const response = await getStudentDetail(id)

        navigate(`/student/${id}`)
        setStudent(response)
        setShow(true)
    }

    // Öğrenci listesinde search yapma işlemi
    const changeSearch = async () => {
        const response = await getSearchStudentList(searchText);
        routeQuery()

        if (response) {
            setStudents(response.users)
            setCount(response.total)
        }
    }

    // Tüm öğrencileri listeleme
    const studentsList = async (lim, page) => {
        const response = await getStudents(lim, page)

        setStudents(response.users)
        setCount(response.total)
        setSkip(response.skip)
        console.log('user', response);
        console.log('skip', skip);
    }

    // Page arttırma işlemi
    const increasePage = () => {
        studentsList(limit, (skip + limit))
        // navigate(`?page=${(Math.round(skip / limit)) + 1}`)
    }

    // Page azaltma işlemi
    const decreasePage = () => {
        studentsList(limit, (skip - limit))
    }

    // Limit değişikliği işlemi
    const changeLimit = (value) => {
        studentsList(value, skip)
        setLimit(value)
    }

    // Modal görünürlük değiştirme işlemi
    const changeShow = () => {
        setShow(true)
    }

    // Route işlemleri
    const routeQuery = () => {
        navigate(`?search=${searchText}&page=${Math.round((skip / limit) + 1)}`)
    }

    // page ve search ataması
    const initial = () => {
        let searchQuery = new URLSearchParams(location.search).get("search")
        let pageQuery = new URLSearchParams(location.search).get("page")
    }

    useEffect(() => {
        studentsList(limit, skip)
        routeQuery()
    }, [skip])

    useEffect(() => {
        if (searchText.length === 0) {
            studentsList(limit, skip)
        } else {
            changeSearch()
        }
    }, [searchText])

    useEffect(() => {
        initial()
    }, [])



    return (
        <div className='students'>
            <div className='d-flex w-100'>
                <SideBar />
                <div className='w-100'>
                    <TopBar />
                    <div className='student-content'>
                        <SearchBar changeShow={changeShow} searchText={setSearchText} />
                        <div className='border-gray'></div>
                        {
                            success ? <div className='padding-30'>
                                <Alert variant={variant}>
                                    Öğrenci başarılı bir şekilde silindi.
                                </Alert>
                            </div>
                                : ''
                        }
                        {
                            count > 0 ? <div>
                                <StudentTable students={students} deleteStudentFunc={deleteStudentFunc} detailStudent={detailStudent} />
                                <div className='d-flex justify-content-end align-items-center page-information'>
                                    <div className='d-flex page-rows align-items-center'>
                                        <p>Rows per page : </p>
                                        <Form.Select aria-label="Default select example" value={limit} onChange={(e) => changeLimit(e.target.value)}>
                                            <option>Limit Seçiniz</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </Form.Select>
                                    </div>
                                    <div>
                                        {Math.round((skip / limit) + 1)} - {count / limit < 1 ? 1 : Math.round(count / limit)} of {count}
                                    </div>
                                    <div className='arrows'>
                                        {
                                            skip / limit + 1 === 1 ? '' : <img src={ArrowLeft} alt="arrow-left" onClick={decreasePage} />
                                        }
                                        {
                                            Math.round(count / limit) <= skip / limit + 1 ? '' : <img src={ArrowRight} alt="arrow-right" onClick={increasePage} />
                                        }
                                    </div>
                                </div>
                            </div>
                                :
                                <h4 className='student-none'><span className='student-name'>{searchText}</span> ile ilgili öğrenci bulunmamaktadır.</h4>
                        }
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Öğrenci Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        addSuccess ? <Alert variant={variant}>
                            {
                                params.id ? 'Öğrenci başarılı bir şekilde güncellenmiştir.' : 'Öğrenci başarı ile eklendi.'
                            }
                        </Alert>
                            : ''
                    }
                    <Form onSubmit={params.id ? updateStudentDetail : addStudent}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ad</Form.Label>
                            <Form.Control type="text" placeholder="Adınızı giriniz" onChange={(e) => handleChange('firstName', e.target.value)} value={student.firstName} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Soyad</Form.Label>
                            <Form.Control type="text" placeholder="Soyadınızı giriniz" onChange={(e) => handleChange('lastName', e.target.value)} value={student.lastName} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Yaş</Form.Label>
                            <Form.Control type="number" placeholder="Yaşınızı giriniz" onChange={(e) => handleChange('age', e.target.value)} value={student.age} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Telefon</Form.Label>
                            <Form.Control type="text" placeholder="Telefonunuzu giriniz" onChange={(e) => handleChange('phone', e.target.value)} value={student.phone} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Emailinizi giriniz" onChange={(e) => handleChange('email', e.target.value)} value={student.email} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Domain</Form.Label>
                            <Form.Control type="text" placeholder="Domain giriniz" onChange={(e) => handleChange('domain', e.target.value)} value={student.domain} />
                        </Form.Group>
                        <Button type="submit">
                            {
                                params.id ? 'DÜZENLE' : 'EKLE'
                            }
                        </Button>
                    </Form>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </div>
    )
}
