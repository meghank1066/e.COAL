import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Articles from '../Articles.js/articles';
import Search from '../Search/search';
import { HeaderT } from '../HeaderT/headerT';

function SearchPage() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const response = await axios.get('http://localhost:8000/api/articles');
                setArticles(response.data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        }

        fetchArticles();
    }, []);
    console.log("salut", articles)
    return (
        <>
            <HeaderT />
            <div>
                <Search articles={articles} />
            </div>
        </>
    )
}

export default SearchPage