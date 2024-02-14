import styles from './login.module.css'
import { useState } from 'react'
import axios from 'axios'

function Login(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
        
    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await axios.post('https://')
        } catch (error) {
            
        }
    }


    return(
        <section>
            Welcome to YumYum Login
        </section>
    )
}

export default Login