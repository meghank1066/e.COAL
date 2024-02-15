import styles from './search.module.css'
import React, { useState } from "react";
import Article from '../Article/article';

function Search({ articles }){
    const [searchTerm, setSearchTerm] = useState("");

    function handleSearchChange(e){
        setSearchTerm(e.target.value)
    }

    const filteredArticles = articles.filter((article) => {
        return (
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });
    
    return(
        <section>
            <input type='text' placeholder='Search by title or tag' value={searchTerm} onChange={handleSearchChange} />
            {filteredArticles.map(x => <Article key={x.id} title={x.title} thumbnailURL={x.thumbnailURL} id={x.id} />)}
        </section>
    )
}

export default Search