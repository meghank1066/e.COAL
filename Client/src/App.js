import logo from './logo.svg';
import { Route, Link, Routes } from "react-router-dom"
import { useParams } from 'react-router-dom';
import Credits from './Credits/credits';
import Home from './Home/home';
import Login from './Login/login';
import Search from './Search/search';
import Articles from './Articles.js/articles';
import ThisArticle from './ThisArticle/thisarticle';
import './App.css';

function App() {
  
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/login">Account</Link>
        <Link to="/credits">Credits</Link>
        <Link to="/articles">Articles</Link>
      </nav>

      <Routes>
        <Route exact={true} path="/" element={<Home/>} />
        <Route exact={true} path="/search" element={<Search/>} />
        <Route exact={true} path="/login" element={<Login/>} />
        <Route exact={true} path="/credits" element={<Credits/>} />
        <Route exact={true} path="/articles" element={<Articles/>} />
        <Route exact={true} path={"/articles/:id"} element={<ThisArticle/>} />
      </Routes>
    </>
  );
}

export default App;
