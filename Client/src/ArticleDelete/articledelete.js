import styles from '../Article/article.module.css'
import ThisArticle from '../ThisArticle/thisarticle'
import { Route, Link, Routes } from "react-router-dom"
import React from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function ArticleDelete(props) {
    //<ThisArticle id={props.id}/>

    const navigate = useNavigate();

    const config = {
        headers: { "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}` }
    }
    async function handleDelete() {
        await axios.delete(`http://localhost:8000/api/articles/${props.id}`, config)
        const response = await axios.get("http://127.0.0.1:8000/api/user", config)
        props.setArticles(response.data)
    }

    const thumbnailURL = "http://localhost:8000/" + props.thumbnailURL

    const destinationProps = {
        title: props.title,
        content: props.content,
        tags: props.tags,
        thumbnailURL: props.thumbnailURL,
        mediaURL: props.mediaURL,
        id: props.id
    };
    console.log(destinationProps)

    function updatePage() {
        navigate(`/update/${props.id}`, { state: props.destinationProps })
    }

    return (
        <>
            <div className={styles.aze}>
                <button onClick={handleDelete} id={styles.button}><box-icon size="md" name='x'></box-icon></button>
                <button onClick={updatePage} id={styles.button}><box-icon size="md" name='edit-alt' ></box-icon></button>

                <Link to={`/articles/${props.id}`}>
                    <div className={styles.box}>
                        <img src={props.thumbnailURL}></img>
                        {props.title}
                    </div>
                </Link>
            </div>
        </>
    )
}

export default ArticleDelete

