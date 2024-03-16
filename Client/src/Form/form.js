import styles from './form.module.css'
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HeaderT } from "../HeaderT/headerT";

function AddArticleForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    const config = {
        headers: { "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}` }
    }
    

    function handlechange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handlesubmit(e) {
        e.preventDefault()
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/articles", formData, config);
            console.log("Article created:", response.data);
            navigate(`/articles/${response.data.id}`)
        } catch (error) {
            console.error("Error creating article:", error);
            console.log(config)
        }

    }
    return (
        <>
            <HeaderT />
            <h1 id={styles.title}>Create your article</h1>
            <form onSubmit={handlesubmit} className={styles.form}>
                <input type="text" name="title" onChange={handlechange} placeholder="Title"></input>
                <input type="text" name="tags" onChange={handlechange} placeholder="Tags (seperater by a space)"></input>
                <input type="text" name="thumbnailURL" onChange={handlechange} placeholder="Link of the image in preview"></input>
                <input type="text" name="mediaURL" onChange={handlechange} placeholder="Link of the article image"></input>
                <textarea name="content" onChange={handlechange} placeholder="Write your article here ..." className={styles.special} rows="10"></textarea>
                <input type="submit" value="Send"></input>
            </form>
        </>
    )
}

export default AddArticleForm