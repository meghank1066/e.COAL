import styles from './home.module.css'
import React from "react";
import ArticleTag from '../ArticleTag/articletag';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function Home(){
    const [articles, setArticles] = useState([])

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/articles")
                setArticles(response.data)
            } catch (error) {
                console.error("Error fetching articles", error)
            }
            console.log(articles.articles)
        }

        fetchArticles()
    }, [])
    return(
        <section>
            <ArticleTag tag="ecoal23" articles={articles} />
            <ArticleTag tag="avion" articles={articles} />
        </section>
    )
}

export default Home