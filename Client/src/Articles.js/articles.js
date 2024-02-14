import styles from './articles.module.css'
import Article from '../Article/article';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

function Articles() {
    const [articles, setArticles] = useState([])

    async function getArticles() {  // The function is asynchronous
        const articles = (await axios.get('http://localhost:8000/api/articles')).data
        setArticles(articles)
    }

    useEffect(() => { // this is a hook called everytime the function is rendered again
        // Don't forget to import useEffect
        getArticles()
    }, []);

    return (
        <section>
            <h1>All the articles :</h1>
            {articles.map( x => <Article title={x.title} thumbnailURL={x.thumbnailURL} id={x.id}/>)}
        </section>
    )
}

export default Articles

