import React, { useState, useEffect } from "react";
import axios from "axios";
import Article from "../Article/article";

function ArticleAccount(){
    const [articles, setArticles] = useState([])

    useEffect(() => {
        async function fetchArticles(){
            try{
                const response = await axios.get("http://localhost:8000/api/articles")
                setArticles(response.data)
            } catch (error) {
                console.error("Error fetching articles", error)
            }
        }

    fetchArticles()
    }, [])

    return(
        <div>
            <h2>Your Articles</h2>
            {articles.map( x => <Article title={x.title} thumbnailURL={x.thumbnailURL} id={x.id}/>)}
        </div>
    )
}

export default ArticleAccount