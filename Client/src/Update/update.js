import styles from './update.module.css';
import React, { useState } from "react";
import axios from "axios";

function Update(props) {
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
            const response = await axios.put(`http://127.0.0.1:8000/api/articles/${props.id}`, formData, config);
            console.log("Article updated:", response.data);
        } catch (error) {
            console.error("Error updating article:", error);
            console.log(config)
        }

    }
    return (
        <form onSubmit={handlesubmit}>
            <label>
                Title :
                <input type="text" value={props.title ? props.title : ''} name="title" onChange={handlechange}></input>
            </label>
            <label>
                Content :
                <input type="text" value={props.content ? props.content : ''} name="content" onChange={handlechange}></input>
            </label>
            <label>
                Tag :
                <input type="text" value={props.tags ? props.tags : ''} name="tags" onChange={handlechange}></input>
            </label>
            <label>
                ThumbnailURL :
                <input type="text" value={props.thumbnailURL ? props.thumbnailURL : ''} name="thumbnailURL" onChange={handlechange}></input>
            </label>
            <label>
                mediaURL :
                <input type="text" value={props.mediaURL ? props.mediaURL : ''} name="mediaURL" onChange={handlechange}></input>
            </label>
            <label>
                Submit :
                <input type="submit"></input>
            </label>
        </form>
    )
}

export default Update