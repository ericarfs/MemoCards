import { Link } from "react-router-dom";
import "../styles/styles.css"


export default function Index (){

    return (
        <section>
        <div className="index-info">
            <div className="logo">
                <img src={"/flash-card.png"} height="120px"/>
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
    )
}