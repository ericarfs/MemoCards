import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import Swal from 'sweetalert2'
import { jwtDecode } from "jwt-decode";
import "../styles/styles.css"

export default function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

      try {
        const res = await api.post(route, { username, password });
        if (method === "login") {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
          localStorage.setItem("USER_ID", jwtDecode(res.data.access).user_id);
          localStorage.setItem("USERNAME", username);
          navigate("/home");
          
        } else {
          Swal.fire({
            title: "Account created successfully!", 
            icon: "success", 
            toast: true, 
            timer: 2000, 
            position: 'top', 
            showConfirmButton: false,
          })
          navigate("/login");
        }
      } catch (error) {
        if (method === "login") {
          Swal.fire({
            title: "Username or Password incorrect!", 
            icon: "error", 
            toast: true, 
            timer: 2000, 
            position: 'top', 
            width: '420px',
            showConfirmButton: false,
          })
        }
        else{
          Swal.fire({
            title: "Username not available!", 
            icon: "error", 
            toast: true, 
            timer: 2000, 
            position: 'top', 
            showConfirmButton: false,
          })
        }
        console.log(error)
      } finally {
        setLoading(false);
      }
    
  };

  return (
    <section>
        <div  className="forms-main">
            <div className="home-redirect"><Link to="/" >MemoCards</Link></div>
            <div className="form-container">
                <div className="form-title">
                    <span>{name}</span>
                    {method === "login" 
                    ? <span className="form-redirect"> Not a member? <Link to='/register'>Create an account!</Link></span>
                    : <span className="form-redirect"> Already has an account? <Link to='/login'>Login!</Link></span>
                    }      
                </div>
                    
                <div className="form-main">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                        <input
                        value={username}
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                        />
                        </div>
                        <div className="form-group">
                        <input
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        />
                        </div>
                        {loading && <LoadingIndicator />}
                        <div className="form-buttons">
                            <button className="btn btn-auth" type="submit">
                            {name}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
  );
}