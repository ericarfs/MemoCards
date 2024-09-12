import { Link } from "react-router-dom";
import "../styles/styles.css"


export default function Index (){

    return (
        <>
        <section>
        <div className="index-info">
            <div className="logo">
                <img src={"/cards.svg"} title="Flash card icons created by manshagraphics - Flaticon"/>
                <h1 className="title">MemoCards</h1>
                <span>Learning languages in a Flash!<br/></span> 
                <br/>
            </div>
            <div className="buttons-index">
                <Link className="btn btn-auth inverse" to="/login">Login</Link>
                <Link className="btn btn-auth" to="/register">Register</Link>
            </div> 
        </div>
        
        </section>
        <div className="footer">
            <a href="https://www.flaticon.com/free-icons/flash-card" title="flash card icons">Flash card icons created by manshagraphics - Flaticon</a>
        </div>
        
        </>
    )
}