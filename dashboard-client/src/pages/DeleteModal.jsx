import axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useContext, useState} from "react";
import { AuthContext } from "./Auth";
import { Link } from "react-router-dom";


function DeleteModal({item, handleDelete}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const {token} = useContext(AuthContext);

    // const handleDelete = async (itemId) => {
    //     console.log(itemId)
    //     const response = await axios.post('http://127.0.0.1:3000/api/item/delete/', {itemId},
    //       { headers: { Authorization: token } });
  
    //     if (response.status == 200) {
    //       setItems((prev) => prev.filter(item => item.id != itemId))
    //     }
    //   }

    return (
        <>
            <Link onClick={handleShow}> Delete </Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Item </Modal.Title>
                </Modal.Header>
                <Modal.Body> Do you want to delete this item? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {handleDelete(item.id); handleClose();}}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}  
  
  export default DeleteModal;