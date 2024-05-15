import { useState } from 'react';
import { Button, Modal} from 'react-bootstrap';
import AddForm from './AddForm';

function AddModal({handleCreate}){
const [show, setShow] = useState(false);
const handleShow = () => setShow(true);
const handleClose = () => setShow(false);

return (
   <div>
      <Button className="button-create" onClick={handleShow} data-toggle="modal"><span className="button-create">Add Product</span></Button> 
      <Modal show={show} onHide={handleClose}>
         <Modal.Header>
            <Modal.Title>
               Add Product
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <AddForm handleCreate = {handleCreate} handleClose = {handleClose}/>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cancel
            </Button>
         </Modal.Footer>
      </Modal>
   </div>
   )
}
export default AddModal;