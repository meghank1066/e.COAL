import styles from './login.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login(){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
        
    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await axios.post('https://localhost:8000/api/login', {
                email : email,
                password : password,
            })

            var connect = response.data
            console.log(response.data)

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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Password 
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br/>
                <button type='submit'>Login</button>
            </form>
        </section>
    )
}


export default Login