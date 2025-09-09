import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import api from "../api";
import Swal from 'sweetalert2'

export default function CardForm({func, method }){
    const [expression, setExpression] = useState("");
    const [meaning, setMeaning] = useState("");
    const [example, setExample] = useState("");
    const [expressionError, setExpressionError] = useState("");
    const [meaningError, setMeaningError] = useState("");
    const [exampleError, setExampleError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const name = method === "Add" ? "Adding new Card" : "Updating your Card";
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) getCard();
    }, []);

    const getCard = () => {
        setLoading(true);
        api
        .get(`/api/flashcards/${id}`)
        .then((res) => res.data)
        .then((data) => {
            setExpression(data.expression);
            setMeaning(data.meaning);
            setExample(data.example); 
        })
        .catch(() => {
            Swal.fire({
                title: "Card does not exists.", 
                icon: "error", 
                toast: true, 
                timer: 2500, 
                position: 'top-right', 
                showConfirmButton: false,
            })
            navigate("/home");
        })
        .finally(() => {
            setLoading(false);
        });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        
        if (expression.length > 200) setExpressionError("Expression should be up to 200 characters!");
        if (meaning.length > 200) setMeaningError("Expression meaning should be up to 200 characters!");
        if (example.length > 200) setExampleError("Expression example should be up to 200 characters!");

        if (expression.length <= 200 && meaning.length <= 200  && example.length <= 200){
            setIsDisabled(true);
             await func(expression, meaning, example)
            .then(() => {
                if (method === "Add") {
                    setExpression("");
                    setMeaning("");
                    setExample("");
                    setIsDisabled(false);
                }
                else setTimeout(() => {
                    navigate("/home")
                    setIsDisabled(false);
                }, 2000);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
            
        }
    };
    
    return (
        
        <section>
        <div  className="forms-main">
            <div className="home-redirect"><Link to="/home" >MemoCards</Link></div>
            <div className="form-container">
                <div className="form-title">
                    <span>{name}</span>   
                </div>
                <div className="form-main">
                    <form onSubmit={handleSubmit} >
                        <div className="form-group">
                        <input
                        value={expression}
                        type="text"
                        onChange={(e) => setExpression(e.target.value)}
                        onClick={() => {
                            setLoading(false); 
                            setExpressionError("");
                            setMeaningError("");
                            setExampleError("");
                        }}
                        placeholder="Expression"
                        required
                        />
                        <span className="error">{expressionError}</span>
                        </div>
                        
                        <div className="form-group">
                        <input
                        value={meaning}
                        type="text"
                        onChange={(e) => setMeaning(e.target.value)}
                        onClick={() => {
                            setLoading(false); 
                            setExpressionError("");
                            setMeaningError("");
                            setExampleError("");
                        }}
                        placeholder="Meaning"
                        required
                        />
                        <span className="error">{meaningError}</span>
                        </div>
                        
                        <div className="form-group">
                        <input
                        value={example}
                        type="text"
                        onChange={(e) => setExample(e.target.value)}
                        onClick={() => {
                            setLoading(false); 
                            setExpressionError("");
                            setMeaningError("");
                            setExampleError("");
                        }}
                        placeholder="Example"
                        />
                        <span className="error">{exampleError}</span>
                        </div>
                        {loading && <LoadingIndicator />}
                        <div className="form-buttons">
                            <button className="btn btn-auth" 
                            type="submit" 
                            disabled={isDisabled}
                            >
                            {method} Card
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </section>
        
    )

}