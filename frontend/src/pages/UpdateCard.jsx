import { useParams } from "react-router-dom";
import api from "../api";
import CardForm from "../components/CardForm";
import Swal from 'sweetalert2'

export default function UpdateCard(){
    const {id} = useParams();

    const updateCard = async (expression, meaning, example) => {
        api
        .put(`/api/cards/${id}/`, { expression, meaning, example })
        .then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    title: "Card updated successfully!", 
                    icon: "success", 
                    toast: true, 
                    timer: 2000, 
                    position: 'top', 
                    showConfirmButton: false,
                })
            }
            else {
                Swal.fire({
                    title: "Failed to update card.", 
                    icon: "error", 
                    toast: true, 
                    timer: 2000, 
                    position: 'top', 
                    showConfirmButton: false,
                })
            }
        })
        .catch((err) => Swal.fire({
            title: "Failed to update card.", 
            icon: "error", 
            toast: true, 
            timer: 2000, 
            position: 'top', 
            showConfirmButton: false,
          }))
    };

    return <CardForm func={updateCard} method="Update" />;
}