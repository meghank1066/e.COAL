import logo from './logo.svg';
import { Route, Link, Routes } from "react-router-dom"
import { useParams } from 'react-router-dom';
import Credits from './Credits/credits';
import Home from './Home/home';
import Login from './Login/login';
import Search from './Search/search';
import Articles from './Articles.js/articles';
import ThisArticle from './ThisArticle/thisarticle';
import AddArticleForm from './Form/form';
import ArticleAccount from './ArticleAccount/articleaccount';
import './App.css';
import { Nav } from './Nav/nav';
import { HeaderL } from './HeaderL/headerL';

function App() {
  
  return (
    <>
      <HeaderL/>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/login">Account</Link>
        <Link to="/credits">Credits</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/form">Form</Link>
        <Link to="/profile">Profile</Link>
      </nav>

      <Routes>
        <Route exact={true} path="/" element={<Home/>} />
        <Route exact={true} path="/search" element={<Search/>} />
        <Route exact={true} path="/login" element={<Login/>} />
        <Route exact={true} path="/credits" element={<Credits/>} />
        <Route exact={true} path="/articles" element={<Articles/>} />
        <Route exact={true} path={"/articles/:id"} element={<ThisArticle/>} />
        <Route exact={true} path="/form" element={<AddArticleForm/>} />
        <Route exact={true} path="/profile" element={<ArticleAccount/>} />
      </Routes>

      <Nav/>
    </>
  );
}

export default App;
