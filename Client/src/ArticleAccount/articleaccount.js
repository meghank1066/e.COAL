import React, { useState, useEffect } from "react";
import axios from "axios";
import Article from "../Article/article";
import ArticleDelete from "../ArticleDelete/articledelete";
import styles from "./articleaccount.module.css"
import { HeaderT } from "../HeaderT/headerT";
import { Link } from "react-router-dom"

function ArticleAccount(props) {
    const [articles, setArticles] = useState({})

    const config = {
        headers: { "Authorization": `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}` }
    }

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/user", config)
                setArticles(response.data)
            } catch (error) {
                console.error("Error fetching articles", error)
            }
            console.log(articles.articles)
        }

        fetchArticles()
    }, [])
    console.log("name", articles.name)

    function handleLogout() {  // The function is asynchronous
        axios.get('http://localhost:8000/api/logout', config)
            .then(response => {
                console.log('Déconnexion réussie');
            })
            .catch(error => {
                console.error('Erreur lors de la déconnexion:', error);
            });
        localStorage.removeItem('token')
        props.setIsAuthenticated(false)
    }



    return (
        <>
            <HeaderT />
            <div className={styles.user}>
                <div className={styles.pers}>
                    <Link to="/" onClick={handleLogout} id={styles.deco}><box-icon size="md" name='exit' ></box-icon></Link>
                    <img src="/img/User.png"></img>
                    <p>{articles.name}</p>
                    <p>{articles.email}</p>
                </div>
                <h2 className={styles.title}>Your Articles</h2>
                <div className={styles.res}>
                    {articles.articles?.map(x => <ArticleDelete title={x.title} content={x.content} tags={x.tags} thumbnailURL={x.thumbnailURL} mediaURL={x.mediaURL} id={x.id} setArticles={setArticles} />)}
                </div>
            </div>
        </>
    )
}

export default ArticleAccount