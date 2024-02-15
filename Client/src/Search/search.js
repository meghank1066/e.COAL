import styles from './search.module.css'
import React, { useState } from "react";
import Article from '../Article/article';

function Search({ articles }) {
    const [searchTerm, setSearchTerm] = useState("");

    function handleSearchChange(e) {
        setSearchTerm(e.target.value)
    }

    const filteredArticles = articles.filter((article) => {

        console.log(articles)
        return (
            article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.tags?.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <section className={styles.bar}>
            <div>
                <input type='text' placeholder='Search by title or tag' value={searchTerm} onChange={handleSearchChange} />
                <box-icon name='search'></box-icon>
            </div>
            {filteredArticles.map(x => <Article key={x.id} title={x.title} thumbnailURL={x.thumbnailURL} id={x.id} />)}
        </section>
    )
}

export default Search