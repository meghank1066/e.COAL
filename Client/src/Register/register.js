import styles from '../Login/login.module.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { HeaderL } from '../HeaderL/headerL';


function Register(props) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" })
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")

    function handlechange(e) {
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
    return (
        <>
            <HeaderL />
            <section>
                <h1 id={styles.title}>Register</h1>
                <form onSubmit={handleRegister} className={styles.log}>
                    <label>
                        Name
                    </label>
                    <input
                        type='text'
                        name="name"
                        onChange={handlechange}
                    />
                    <br />

                    <label>
                        Email
                    </label>
                    <input
                        type='text'
                        name="email"
                        onChange={handlechange}
                    />

                    <br />
                    <label>
                        Password
                    </label>
                    <input
                        type='password'
                        name="password"
                        onChange={handlechange}
                    />
                    <br />
                    <button type='submit'>Register</button>
                </form>
            </section>
        </>
    )
}

export default Register