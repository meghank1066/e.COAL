import logo from './logo.svg';
import { Route, Link, Routes, Navigate, Outlet } from "react-router-dom"
import { useParams } from 'react-router-dom';
import Credits from './Credits/credits';
import Home from './Home/home';
import Login from './Login/login';
import Search from './Search/search';
import Articles from './Articles.js/articles';
import ThisArticle from './ThisArticle/thisarticle';
import AddArticleForm from './Form/form';
import ArticleAccount from './ArticleAccount/articleaccount';
import SearchPage from './SearchPage/searchpage';
import './App.css';
import { Nav } from './Nav/nav';
import Logout from './Logout/logout';
import { useState } from 'react';
import axios from 'axios';

function App() {

  const config = {
    headers : {"Authorization" : `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`}
  }

  const PrivateRoute = () => {
    const auth = isAuthenticated;
    return auth ? <Outlet /> : <Navigate to="/login"/>;
  };

  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  function handleLogout() {  // The function is asynchronous
    axios.get('http://localhost:8000/api/logout', config)
    .then(response => {
        console.log('Déconnexion réussie');
      })
      .catch(error => {
        console.error('Erreur lors de la déconnexion:', error);
      });
    localStorage.removeItem('token')
    setIsAuthenticated(false)

}
  
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/search">Search</Link>
        <Link to="/login">Account</Link>
        <Link to="/credits">Credits</Link>
        <Link to="/articles">Articles</Link>
        <Link to="/form">Form</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/searchpage">SearchPage</Link>
      </nav>

      <Routes>
        <Route exact={true} path="/" element={<Home/>} />
        <Route exact={true} path="/search" element={<Search/>} />
        <Route exact={true} path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
        <Route exact={true} path="/credits" element={<Credits/>} />
        <Route exact={true} path="/articles" element={<Articles/>} />
        <Route exact={true} path={"/articles/:id"} element={<ThisArticle/>} />
        <Route exact path="/form" element={<PrivateRoute/>}>
          <Route exact={true} path="/form" element={<AddArticleForm/>} />
        </Route>
        <Route exact path="/profile" element={<PrivateRoute/>}>
          <Route exact={true} path="/profile" element={<ArticleAccount/>} />
        </Route>
        <Route exact={true} path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated}/>}/>
      </Routes>
      <Route exact={true} path="/searchpage" element={<SearchPage/>} />

      <nav>
        <Link to="/search"><box-icon name='search'></box-icon></Link>
        <Link to="/"><box-icon name='home' type='solid' ></box-icon></Link>
        {!localStorage.getItem("token") && <Link to="/login"><box-icon name='user-circle' type='solid' ></box-icon></Link>}
        {localStorage.getItem("token") && <Link to="/form"><box-icon name='add-to-queue' ></box-icon></Link>}
        {localStorage.getItem("token") && <Link to="/" onClick={handleLogout}><box-icon name='exit' ></box-icon></Link>}
      </nav>
      {/* <Nav accessToken = accessToken/> */}
    </>
  );
}

export default App;
