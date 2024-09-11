import { useState, useEffect, useRef } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import Card from "../components/Card";
import LoadingIndicator from "../components/LoadingIndicator";
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

export default function Home (){
    const [cards, setCards] = useState([]);
    const productContainers = useRef([]);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCards();
    }, []);
    
    const ITEMWIDTH = 180;

    const handleScroll = (scrollAmount) => {
        const newScrollPosition = scrollPosition + scrollAmount;
        setScrollPosition(newScrollPosition);

        productContainers.current.scrollLeft = newScrollPosition;
    }

    const getCards= () => {
        api
        .get("/api/cards/")
        .then((res) => res.data)
        .then((data) => {
            setCards(data);
        })
        .catch((err) => alert(err))
        .finally(() => setLoading(false));
    };

    const deleteCard = (id) => {
        api
          .delete(`/api/cards/${id}/`)
          .then((res) => {
            if (res.status === 204) {
                Swal.fire({
                    title: "Card deleted successfully!", 
                    icon: "success", 
                    toast: true, 
                    timer: 2500, 
                    position: 'top-right', 
                    showConfirmButton: false,
                })
            }
            else {
                Swal.fire({
                    title: "Failed to delete card.", 
                    icon: "error", 
                    toast: true, 
                    timer: 2500, 
                    position: 'top-right', 
                    showConfirmButton: false,
                })
            }
            getCards();
          })
          .catch((error) => {
            Swal.fire({
                title: "Failed to delete card.", 
                icon: "error", 
                toast: true, 
                timer: 2500, 
                position: 'top-right', 
                showConfirmButton: false,
            })
          });
      };

    return (
        <>
        <div className="logout-wrap">
        
        <Link className="btn inverse logout" to="/logout"><FontAwesomeIcon icon={faRightFromBracket} />Sign out </Link>
        </div>
        
        
        <h1 className="title orange">  MemoCards </h1>
        <main>
            <section>     
            <div className = "content">
            {loading && <LoadingIndicator />}
            {cards.length < 1 && !loading
                ? <h4> There are no cards, create one below! </h4>
                : 
                <div className="card-container">
                    <div className="carousel-view">
                        <button id="prev-btn" className="prev-btn" onClick={() => handleScroll(-ITEMWIDTH)}>
                            <svg viewBox="0 0 512 512" width="20" title="chevron-circle-left">
                                <path d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z" />
                            </svg>
                        </button>
                        <div id="item-list" className="item-list"   ref={productContainers}>
                        {cards.map((card) => (
                            <Card card={card} onDelete={deleteCard} key={card.id} />
                            ))
                        }  
                        </div>   
                        <button id="next-btn" className="next-btn" onClick={() => handleScroll(ITEMWIDTH)}>
                            <svg viewBox="0 0 512 512" width="20" title="chevron-circle-right">
                                <path d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z" />
                            </svg>
                        </button>
                    </div>
                </div>
            }
            <Link className="new-card" to= "/newcard">New Card</Link> <br/>

            </div>
            </section>
        </main>
        </>
    )
}