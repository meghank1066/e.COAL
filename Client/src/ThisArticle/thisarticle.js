import styles from './thisarticle.module.css'
import {useParams} from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';


function ThisArticle(props) {
    let params = useParams()
    const [article, setArticle] = useState({id:-1,title:"",thumbnailURL:"",content:""})

    async function getArticle() {  // The function is asynchronous
        const data = (await axios.get(`http://localhost:8000/api/articles/${params.id}`)).data
        setArticle(data)
    }

    useEffect(() => { // this is a hook called everytime the function is rendered again
        // Don't forget to import useEffect
        getArticle()
    }, []);

    const thumbnailURL = "http://localhost:8000/" + article.thumbnailURL
    
    if (props.auth==false){
        article.content = article.content.substring(0, 100)
    }

    return (
        <div className={styles.articlePage} >
        <h1 className={styles.articleTitle}>{article.title}</h1>
        {article.mediaType == "image" &&
        <img src={article.mediaURL} className={styles.articleImage} />
        }
        {article.mediaType == "video" &&
        <video width="100%" controls>
            <source src={article.mediaURL} type="video/ogg" className={styles.articleImage}/>
        </video>
        }
        {article.mediaType == "audio" &&
        <audio controls src={article.mediaURL}></audio>
        }
        
        <div className={styles.articleContent} dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
    )
}

export default ThisArticle

