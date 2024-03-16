import React, { useState, useEffect } from "react";
import axios from "axios";
import Article from "../Article/article";
import ArticleDelete from "../ArticleDelete/articledelete";
import styles from "./articleaccount.module.css"
import { HeaderT } from "../HeaderT/headerT";
import { Link } from "react-router-dom"
import { CgProfile } from "react-icons/cg";
import Footer from '../Footer/footer';


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
                    {/* <img src="/img/User.png"></img> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" fill="black"  class="bi bi-person-circle" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
</svg>
         <p>{articles.name}</p>
                    <p>{articles.email}</p>
                </div>
                <h2 className={styles.title}>Your Articles</h2>
                <div className={styles.res}>
                    {articles.articles?.map(x => <ArticleDelete title={x.title} content={x.content} tags={x.tags} thumbnailURL={x.thumbnailURL} mediaURL={x.mediaURL} id={x.id} setArticles={setArticles} />)}
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default ArticleAccount