import { Button, Modal } from 'react-bootstrap'
import { deleteMovement, getAllMovements, getBalance } from '../functions/Index'
import { toastCustom } from '../common/toastify'

const DeleteMovementModal = ({ addModalShow, handleClose, id, setList, setBalance }) => {
  const delMovement = async () => {
    deleteMovement(id)
    setTimeout(async () => {
      setList(await getAllMovements())
      setBalance(await getBalance())
    }, 500)
    toastCustom('Movement deleted', 'error', 2000, 'bottom-right')

    handleClose()
  }
  return (
    <Modal show={addModalShow} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Delete Movement {id} ??? </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Button variant='secondary' className='m-2' onClick={() => { handleClose() }}>Close</Button>
        <Button variant='danger' className='m-2' onClick={() => { delMovement(id) }}>Delete</Button>
      </Modal.Body>

    </Modal>

  )
}

export default DeleteMovementModal
