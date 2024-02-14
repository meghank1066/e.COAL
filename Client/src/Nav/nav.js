import 'boxicons'
import { Route, Link, Routes } from "react-router-dom"

export function Nav (props) {
    return (
        <>
            <nav className='nav'>
                <Link to="/search"><box-icon name='search-alt' ></box-icon></Link>
                <Link to="/"><box-icon type='solid' name='home'></box-icon></Link>
                <Link to="/"><box-icon name='list-plus' ></box-icon></Link>
                <Link to="/login"><box-icon name='user-circle' type='solid' ></box-icon></Link>
            </nav>
        </>
    )
}



{/* <nav>
<Link to="/">Home</Link>


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
</Routes> */}