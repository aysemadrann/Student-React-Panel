import React from 'react'
import { Form, Button } from 'react-bootstrap'
import '../../assets/scss/searchbar.scss'
import SearchIcon from '../../assets/images/search.png'

export default function SearchBar({ changeShow, searchText }) {
    const changeText = (e) => {
        let searchTimeout = -1;
        if (searchTimeout !== -1) clearTimeout(searchTimeout);

        searchTimeout = setTimeout(async () => {
            searchText(e.target.value)
        }, 1000);
    }
    return (
        <div className='search-bar padding-30 d-flex justify-content-between align-items-center'>
            <h3>Students List</h3>
            <div className='d-flex align-items-center'>
                <Form.Group className='search-bar-input'>
                    <img src={SearchIcon} alt="search" className='search-bar-icon' />
                    <Form.Control type="text" placeholder="Search.." onChange={changeText} />
                </Form.Group>
                <Button onClick={changeShow}>Add New Student</Button>
            </div>
        </div>
    )
}
