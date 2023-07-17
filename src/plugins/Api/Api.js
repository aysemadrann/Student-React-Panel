import { deleteConfig } from "../config/deleteRequest"
import { getConfig } from "../config/getRequest"
import { postConfig } from "../config/postRequest"
import { putConfig } from "../config/putRequest"

// Tüm öğrencileri listeleme
export const getStudents = (limit, skip) => {
    return getConfig(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
}

//Öğrenci ekleme
export const sendStudent = (form) => {
    let data = {
        'firstName': form.firstName,
        'lastName': form.lastName,
        'age': form.age,
        'phone': form.phone,
        'email': form.email,
        'domain': form.domain,
    }
    return postConfig(`https://dummyjson.com/users/add`, data)
}

//Öğrenci Silme
export const deleteStudent = (id) => {
    return deleteConfig(`https://dummyjson.com/users/${id}`)
}

//Öğrenci detayını getirme
export const getStudentDetail = (id) => {
    return getConfig(`https://dummyjson.com/users/${id}`)
}

//Öğrenci bilgilerini güncelleme
export const updateStudent = (form, id) => {
    let data = {
        'firstName': form.firstName,
        'lastName': form.lastName,
        'phone': form.phone,
        'email': form.email,
        'domain': form.domain
    }
    return putConfig(`https://dummyjson.com/users/${id}`, data)
}

//Öğrenciler arasında arama yapma
export const getSearchStudentList = (searchText) => {
    return getConfig(`https://dummyjson.com/users/search?q=${searchText}`)
}