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
<<<<<<< HEAD
        <HeaderT />
        
        <form onSubmit={handlesubmit} className={styles.form}>
            <label className={styles.label}>
                <h1>New Article</h1>
            </label>
            <label className={styles.label}>
                <input type="text" name="title" placeholder="Add Title" value={formData.title} onChange={handlechange}></input>
            </label>

            <label className={styles.label}>
    <textarea
    placeholder="Write Content.."
              style={{
                width: "100%",
                maxWidth: "380px",
                height: "150px",
                maxHeight: "200px",
                border: "0.5px solid black",
                borderRadius: "5px",
                resize: "none", 
            }}

        />

    
</label>
            <label className={styles.label}>
                <input type="text" name="tags" placeholder="#" onChange={handlechange}></input>
            </label>
            <label className={styles.label}>
                <input type="text" name="thumbnailURL" placeholder="Enter Thumbnail" value={formData.thumbnailURL} onChange={handlechange}></input>
            </label>
            <label className={styles.label}>
                <input type="text" name="mediaURL" placeholder="Enter Image URL" value={formData.mediaURL} onChange={handlechange}></input>
            </label>
            <label className={styles.label}>
        <input type="submit" className={styles.button} onClick={""} />
    </label>
        </form>
=======
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
>>>>>>> a72822b683b99b5d8b2c82c3ddad3f259e5cb43d
        </>
    )
}

export default AddArticleForm