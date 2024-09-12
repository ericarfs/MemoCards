import { Link } from "react-router-dom";

export default function NotFound() {
    return (
      <section>
        <div className="not-found-main">

          

          <div className="not-found">
            <h1 className="title">404 Not found</h1>
            <p>The page you're looking for doesn't exist!</p>
          </div>
          <img src={"/box.svg"} height="384px"/>
                  
          
          <div className="footer">       
          <div className="home-redirect"><Link to="/" >Home</Link></div>
            <a href="https://www.flaticon.com/free-icons/found" 
              title="found icons">Found icons created by Roundicons Premium - Flaticon
            </a>
          </div>
          
        </div>
          
      </section>
    );
  }
  