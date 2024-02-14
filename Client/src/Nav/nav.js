import styles from './nav.module.css'
import 'boxicons'
import { Route, Link, Routes } from "react-router-dom"

export function Nav (props) {
    return (
        <>
            <nav className={styles.nav}>
                <Link to="/search"><box-icon name='search-alt' ></box-icon></Link>
                <Link to="/"><box-icon type='solid' name='home'></box-icon></Link>
                <Link to="/"><box-icon name='list-plus' ></box-icon></Link>
                <Link to="/login"><box-icon name='user-circle' type='solid' ></box-icon></Link>
                {/* Si connecté */}
                <Link to="/profile"><box-icon name='user-circle' type='solid' ></box-icon></Link>
            </nav>
        </>
    )
}