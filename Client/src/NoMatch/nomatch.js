import { Link } from "react-router-dom";
import styles from "./nomatch.module.css";

function NoMatch(){
    return(
        <div>
            <p>404 Error</p>
            <Link to="/">Return to home</Link>
        </div>
    )
}


export default NoMatch;