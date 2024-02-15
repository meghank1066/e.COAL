import styles from './home.module.css'
import React from "react";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { HeaderL } from '../HeaderL/headerL'
import ArticleTag from '../ArticleTag/articletag';

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
            <HeaderL />

            <div className={styles.values}>
                <h1>
                    Our Values
                </h1>
                <div className={styles.valIcon}>
                    <div>
                        <box-icon type='solid' name='heart' size='md'></box-icon>
                        <p>Healthy</p>
                    </div>
                    <div>
                        <box-icon name='dish' type='solid' size='md'></box-icon>
                        <p>Tasty</p>
                    </div>
                    <div>
                        <box-icon name='euro' size='md'></box-icon>
                        <p>Cheap</p>
                    </div>
                </div>
            </div>
            <ArticleTag tag="ecoal23" articles={articles} />
            <ArticleTag tag="voiture" articles={articles} />
        </section>
    )
}

export default Home