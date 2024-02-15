import React, { useState, useEffect } from "react";
import axios from "axios";
import Article from "../Article/article";

function ArticleAccount() {
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
    return (
        <div>
            <p>{articles.name}</p>
            <p>test</p>
            <h2>Your Articles</h2>
            {articles.articles?.map(x => <Article title={x.title} thumbnailURL={x.thumbnailURL} id={x.id} />)}
        </div>
    )
}

export default ArticleAccount