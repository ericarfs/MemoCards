import api from "../api";
import CardForm from "../components/CardForm";
import Swal from 'sweetalert2'


export default function NewCard(){
    const addCard = async (expression, meaning, example) => {
            api
            .post("/api/flashcards", { expression, meaning, example })
            .then((res) => {
                if (res.status === 201) {
                    Swal.fire({
                        title: "Card created successfully!", 
                        icon: "success", 
                        toast: true, 
                        timer: 2500, 
                        position: 'top', 
                        showConfirmButton: false,
                    })
                }
                else {
                    Swal.fire({
                        title: "Failed to make card.", 
                        icon: "error", 
                        toast: true, 
                        timer: 2500, 
                        position: 'top', 
                        showConfirmButton: false,
                    })
                }
            })
            .catch(() => Swal.fire({
                title: "Failed to make card.", 
                icon: "error", 
                toast: true, 
                timer: 2500, 
                position: 'top', 
                showConfirmButton: false,
              }))
    };

    return <CardForm func={addCard} method="Add" />;
}