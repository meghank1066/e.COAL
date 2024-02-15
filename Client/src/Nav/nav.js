import styles from './nav.module.css'
import 'boxicons'
import { Route, Link, Routes } from "react-router-dom"

export function Nav () {
    return (
        <>
            <nav className={styles.nav}>
                <Link to="/searchpage"><box-icon name='search-alt' ></box-icon></Link>
                <Link to="/"><box-icon type='solid' name='home'></box-icon></Link>
                {localStorage.getItem("token") && <Link to="/form"><box-icon name='list-plus' ></box-icon></Link>}
                {!localStorage.getItem("token") && <Link to="/login"><box-icon name='user-circle' type='solid' ></box-icon></Link>}
                {localStorage.getItem("token") && <Link to="/profile"><box-icon name='user-circle' ></box-icon></Link>}
            </nav>
        </>
    )
}