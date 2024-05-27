import { useState } from 'react';
import { Button, Modal} from 'react-bootstrap';
import AddCategoryForm from './AddCategoryForm';

const AddCategoryModal = ({handleCreate}) => {
const [show, setShow] = useState(false);
const handleShow = () => setShow(true);
const handleClose = () => setShow(false);

return (
   <div>
      <Button className="button-create bg-warning mb-4" onClick={handleShow} data-toggle="modal"><span className="button-create mt-4">Add Category</span></Button> 
      <Modal show={show} onHide={handleClose}>
         <Modal.Header>
            <Modal.Title>
               Add Category
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <AddCategoryForm handleCreate = {handleCreate} handleClose = {handleClose}/>
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
export default AddCategoryModal;