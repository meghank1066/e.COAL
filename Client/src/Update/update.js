import styles from './update.module.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

function Update() {
    
    let params = useParams()
    const [article, setArticle] = useState({})
    
    async function getArticle() {  // The function is asynchronous
        const data = (await axios.get(`http://localhost:8000/api/articles/${params.id}`)).data
        setArticle(data)
    }
    
    useEffect(() => { // this is a hook called everytime the function is rendered again
        // Don't forget to import useEffect
        getArticle()
    }, []);
    
    const taglist = article.tags?.map(tag => tag.name).join(' ');



    
    const [formData, setFormData] = useState({title: article.title, content: article.content, tags : taglist, thumbnailURL: article.thumbnailURL, mediaURL: article.mediaURL});

    const config = {
        headers : {"Authorization" : `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`}
    }

    function handlechange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(formData)
    }

    async function handlesubmit(e) {
        e.preventDefault()
        try {
            const response = await axios.patch(`http://127.0.0.1:8000/api/articles/${params.id}`, formData, config);
            console.log("Article updated:", response.data);
        } catch (error) {
            console.error("Error updating article:", error);
            console.log(formData)
        }
        

    }
    return (
        <form onSubmit={handlesubmit}>
            <label>
                Title :
                <input type="text" defaultValue={article.title ? article.title : ''} name="title" onChange={handlechange}></input>
            </label>
            <label>
                Content :
                <input type="text" defaultValue={article.content ? article.content : ''} name="content" onChange={handlechange}></input>
            </label>
            <label>
                Tag :
                <input type="text" defaultValue={article.tags ? taglist : ''} name="tags" onChange={handlechange}></input>
            </label>
            <label>
                ThumbnailURL :
                <input type="text" defaultValue={article.thumbnailURL ? article.thumbnailURL : ''} name="thumbnailURL" onChange={handlechange}></input>
            </label>
            <label>
                mediaURL :
                <input type="text" defaultValue={article.mediaURL ? article.mediaURL : ''} name="mediaURL" onChange={handlechange}></input>
            </label>
            <label>
                Submit :
                <input type="submit"></input>
            </label>
        </form>
    )
}

export default Update