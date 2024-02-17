import styles from '../Form/form.module.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { HeaderT } from "../HeaderT/headerT"



function Update(props) {
    
    let params = useParams()

    const navigate = useNavigate();
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




    const [formData, setFormData] = useState({ title: article.title, content: article.content, tags: taglist, thumbnailURL: article.thumbnailURL, mediaURL: article.mediaURL });

    const config = {
        headers: { "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}` }
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
            navigate(`/articles/${params.id}`)
        } catch (error) {
            console.error("Error updating article:", error);
            console.log(formData)
        }


    }

    if(props.user_id != article.user_id){
        navigate(`/`)
    }
    return (
        <>
            <HeaderT />
            <h1 id={styles.title}>Modify your article</h1>
            <form onSubmit={handlesubmit} className={styles.form}>
                <input type="text" placeholder="Title" defaultValue={article.title ? article.title : ''} name="title" onChange={handlechange}></input>
                <input type="text" placeholder="Tags (seperater by a space)" defaultValue={article.tags ? taglist : ''} name="tags" onChange={handlechange}></input>
                <input type="text" placeholder="Link of the image in preview" defaultValue={article.thumbnailURL ? article.thumbnailURL : ''} name="thumbnailURL" onChange={handlechange}></input>
                <input type="text" placeholder="Link of the article image" defaultValue={article.mediaURL ? article.mediaURL : ''} name="mediaURL" onChange={handlechange}></input>
                <textarea placeholder="Write your article here ..." className={styles.special} rows="10" defaultValue={article.content ? article.content : ''} name="content" onChange={handlechange}></textarea>
                <input type="submit" value="Send"></input>
            </form>
        </>

    )
}

export default Update