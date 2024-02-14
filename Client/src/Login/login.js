import styles from './login.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login(){


    const [formData, setFormData] = useState({email : "", password:""})
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    function handlechange(e){
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
        
    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', formData)
            const { access_token, token_type } = response.data;

            localStorage.setItem('token', access_token);
            localStorage.setItem('token_type', token_type);

            console.log(localStorage.getItem("token"))

            // useNavigate('/')
            
        } catch (error) {
            var nope = error
        }
    }


    return(
        <section>
            <form onSubmit={handleLogin}>
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
                <button type='submit'>Login</button>
            </form>
        </section>
    )
}


export default Login