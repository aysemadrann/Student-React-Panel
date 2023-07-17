import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Header from '../shared/header/Header';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    // Login işlemi
    const signIn = (e) => {
        e.preventDefault()
        navigate('/dashboard')
    }

    return (
        <div className='login-page'>
            <div className="login-form">
                <Header />
                <div className="login-form-text">
                    <h3>SIGN IN</h3>
                    <p>Enter your credentials to access your account</p>
                </div>
                <Form onSubmit={signIn}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} value={password} />
                    </Form.Group>
                    <Button type="submit">
                        SIGN IN
                    </Button>
                </Form>
                <p className='login-form-forgot-text'>Forgot your password? <span className='reset-password'><Link to="/user">Reset Password</Link></span></p>
            </div>
        </div>
    )
}
