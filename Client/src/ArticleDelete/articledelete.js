import styles from '../Article/article.module.css'
import ThisArticle from '../ThisArticle/thisarticle'
import { Route, Link, Routes } from "react-router-dom"
import React from "react";
import axios from "axios";

function ArticleDelete(props) {
    //<ThisArticle id={props.id}/>

    const config = {
        headers : {"Authorization" : `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`}
    }
    async function handleDelete(){
        await axios.delete(`http://localhost:8000/api/articles/${props.id}`, config)
        const response = await axios.get("http://127.0.0.1:8000/api/user", config)
        props.setArticles(response.data)
    }

    const thumbnailURL = "http://localhost:8000/" + props.thumbnailURL
    return (
        <>
            <button onClick={handleDelete}>X</button>
            <Link to={`/articles/${props.id}`}>
                <div className={styles.box}>
                    <img src={props.thumbnailURL}></img>
                    {props.title}
                </div>
            </Link>

        </>
    )
}

export default ArticleDelete

