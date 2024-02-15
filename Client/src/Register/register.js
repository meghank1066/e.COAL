import styles from './register.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register(props){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({name : "", email : "", password:""})
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    function handlechange(e){
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
        
    async function handleRegister(e) {
        e.preventDefault()

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', formData)
            const { access_token, token_type } = response.data;

            localStorage.setItem('token', access_token);
            localStorage.setItem('token_type', token_type);
            props.setIsAuthenticated(true)
            navigate("/")


            // useNavigate('/')
            
        } catch (error) {
            var nope = error
        }
    }
    return(
        <section>
            <form onSubmit={handleRegister}>
                <label>
                    Name
                    <input
                        type='text'
                        name="name"
                        onChange={handlechange}
                    />
                </label>
                <label>
                    Email
                    <input
                        type='text'
                        name="email"
                        onChange={handlechange}
                    />
                </label>
                <br/>
                <label>
                    Password 
                    <input
                        type='password'
                        name="password"
                        onChange={handlechange}
                    />
                </label>
                <br/>
                <button type='submit'>Register</button>
            </form>
        </section>
    )
}

export default Register