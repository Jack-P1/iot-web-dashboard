import axios from "axios";
import Chart from "./Chart";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./Auth";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";


function EditItemForm() {

    const location = useLocation(); 
    const {itemId} = useParams();

    const { item } = location.state || {}; 

    const [itemData, setItemData] = useState(item);
    const[name, setName] = useState(itemData.name ? itemData.name : '')
    const[description, setDescription] = useState(itemData.description ? itemData.description : '')
    
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        // fallback: fetch if item wasn't passed (e.g. user loaded /item/:id directly)
        if (!item) {
            
            axios.get(`http://127.0.0.1:3000/api/item/?itemId=${itemId}`, {
                headers: { Authorization: token },
            })
            .then((res) => {
                setItemData((prev) => (JSON.stringify(prev) === JSON.stringify(res.data) ? prev : res.data));
            })
            .catch((err) => {
                console.error(err);
            })
        }
      }, [item, itemId]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(name)
        console.log(description)

        try {
            const response = await axios.post('http://127.0.0.1:3000/api/item/edit/', {itemId, name, description}, 
                { headers: { Authorization: token } });
            
            if(response.status == 200){
                setItemData(prev => ({
                    ...prev,
                    name,
                    description
                }))
            }
            
        } catch(err) {
            console.log(err)
        }
    }


    if(!itemData) return <div> Loading... </div>

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="itemName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" defaultValue={itemData.name} onChange={event => setName(event.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} defaultValue={itemData.description} onChange={event => setDescription(event.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </form>

        </div>
    )
};

export default EditItemForm;