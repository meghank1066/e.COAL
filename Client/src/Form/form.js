import React, { useState } from "react";
import axios from "axios";
import styles from './form.module.css'

function AddArticleForm() {
    const [formData, setFormData] = useState({ title: "", content: "", tag: "", thumbnailURL: "", mediaURL: "" });

    const config = {
        headers : {"Authorization" : `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`}
    }
    

    function handlechange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handlesubmit(e) {
        e.preventDefault()
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/articles", formData, config);
            console.log("Article created:", response.data);
        } catch (error) {
            console.error("Error creating article:", error);
            console.log(config)
        }

    }
    return (
        <form onSubmit={handlesubmit} className={styles.form}>
            <label className={styles.label}>
                <h1>New Article</h1>
            </label>
            <label className={styles.label}>
                <input type="text" name="title" placeholder="Add Title" value={formData.title} onChange={handlechange}></input>
            </label>

            <label className={styles.label}>
    <textarea
        style={{
            width: "380px",
            height: "150px",
            maxWidth: "380px",
            minWidth: "380px",
            minHeight: "100px",
            maxHeight: "200px",
            border: "0.5px solid black",
            borderRadius: "5px 5px 5px 5px"
        }}
        className={`${styles.commentBox} ${styles.label} ${styles.draggable}`}
        name="content"
        value={formData.content}
        placeholder="Add Content.."
        onChange={handlechange}
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
    )
}

export default AddArticleForm