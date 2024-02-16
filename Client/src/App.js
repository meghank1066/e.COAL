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
import { useState } from 'react';
import axios from 'axios';
import { HeaderL } from './HeaderL/headerL';
import Register from './Register/register'
import { useEffect } from 'react';
import Update from './Update/update';

function App() {

  const config = {
    headers : {"Authorization" : `${localStorage.getItem("token_type")} ${localStorage.getItem("token")}`}
  }

  const PrivateRoute = () => {
    const auth = isAuthenticated;
    return auth ? <Outlet /> : <Navigate to="/login"/>;
  };

  const PublicRoute = () => {
    const auth = isAuthenticated;
    return auth ? <Navigate to="/"/> : <Outlet />;
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

  const [user, setUser] = useState({})

  useEffect(() => {
    if(isAuthenticated){
      async function fetchUser() {
          try {
              const response = await axios.get("http://127.0.0.1:8000/api/user", config)
              setUser(response.data)
          } catch (error) {
              console.error("Error fetching user", error)
          }
      }
    

      fetchUser()
    }
  }, [])
  const user_id = user.id
  
  return (
    <>
      <Routes>
        <Route exact={true} path="/" element={<Home/>} />
        <Route exact={true} path="/search" element={<Search/>} />
        <Route exact path="/login" element={<PublicRoute/>}>
            <Route exact={true} path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>}/>
        </Route>
        <Route exact={true} path="/credits" element={<Credits/>} />
        <Route exact={true} path="/articles" element={<Articles/>} />
        <Route exact path="/register" element={<PublicRoute/>}>
          <Route exact={true} path="/register" element={<Register setIsAuthenticated={setIsAuthenticated}/>} />
        </Route>
        <Route exact={true} path={"/articles/:id"} element={<ThisArticle auth={isAuthenticated}/>} />
        <Route exact path="/form" element={<PrivateRoute/>}>
          <Route exact={true} path="/form" element={<AddArticleForm/>} />
        </Route>
        <Route exact path={"/update/:id"} element={<PrivateRoute/>}>
          <Route exact={true} path={"/update/:id"} element={<Update user_id={user_id}/>} />
        </Route>
        <Route exact path="/profile" element={<PrivateRoute/>}>
          <Route exact={true} path="/profile" element={<ArticleAccount setIsAuthenticated={setIsAuthenticated}/>} />
        </Route>
        <Route exact={true} path="/searchpage" element={<SearchPage/>} />
      </Routes>

      <Nav/>
    </>
  );
}

export default App;
