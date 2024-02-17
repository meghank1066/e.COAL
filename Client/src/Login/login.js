import styles from './login.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { HeaderL } from '../HeaderL/headerL';


function Login(props) {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" })
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    function handlechange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', formData)
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


    return (
        <>
            <HeaderL />
            <h1 id={styles.title}>Login</h1>
            <section>
                <form onSubmit={handleLogin} className={styles.log}>
                    Email
                    <input
                        type='text'
                        name="email"
                        onChange={handlechange}
                    />
                    <br />
                    Password
                    <input
                        type='password'
                        name="password"
                        onChange={handlechange}
                    />
                    <br />
                    <p>Any account ? <Link to="/register">Register</Link></p>

                    <br />
                    <button type='submit'>Login</button>
                </form>
            </section>
        </>

    )
}


export default Login