import React from "react";
import Article from "../Article/article";

function ArticleTag(props){
    console.log(props.articles)
    const filteredArticles = props.articles.filter(  (article) => article.tags.some( x => x.name == props.tag))
    return(
        <div>
            {/* <h2>{props.tag} :</h2> */}
            {filteredArticles.map( x => <Article title={x.title} thumbnailURL={x.thumbnailURL} id={x.id}/>)}
        </div>
    )
}

export default ArticleTag