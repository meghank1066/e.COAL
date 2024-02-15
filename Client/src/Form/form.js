import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddArticleForm() {
    const navigate = useNavigate();
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
            navigate(`/articles/${response.data.id}`)
        } catch (error) {
            console.error("Error creating article:", error);
            console.log(config)
        }

    }
    return (
        <form onSubmit={handlesubmit}>
            <label>
                Title :
                <input type="text" name="title" onChange={handlechange}></input>
            </label>
            <label>
                Content :
                <input type="text" name="content" onChange={handlechange}></input>
            </label>
            <label>
                Tag :
                <input type="text" name="tags" onChange={handlechange}></input>
            </label>
            <label>
                ThumbnailURL :
                <input type="text" name="thumbnailURL" onChange={handlechange}></input>
            </label>
            <label>
                mediaURL :
                <input type="text" name="mediaURL" onChange={handlechange}></input>
            </label>
            <label>
                Submit :
                <input type="submit"></input>
            </label>
        </form>
    )
}

export default AddArticleForm