import { Button, Modal, InputGroup, Row, Col, Form } from 'react-bootstrap'
import { useState } from 'react'
import { toastCustom } from '../common/toastify'
import moment from 'moment'
import { addNewMovement, getAllMovements, getBalance } from '../functions/Index'
import { useSelector } from 'react-redux'

const AddMovement = ({ categories, addModalShow, handleClose, setList, setBalance }) => {
  const userID = useSelector(state => state.logged.id)
  const token = useSelector(state => state.logged.token)
  const [form, setForm] = useState({
    concept: '',
    date: moment(new Date()).format('YYYY-MM-DD HH:mm'),
    category: '',
    amount: 0,
    type: '',
    userID
  })
  const handleChange = (eventName, eventValue) => {
    setForm(prev => ({ ...prev, [eventName]: eventValue }))
  }

  const submit = async () => {
    await addNewMovement(form, token)
    setTimeout(async () => {
      setList(await getAllMovements(userID, token))
      setBalance(await getBalance(userID, token))
    }, 2000)
    handleClose()
    toastCustom('Movement added', 'success', 4000, 'bottom-right')
  }

  return (
    <>
      <Modal show={addModalShow} onHide={handleClose}>

        <Modal.Header>
          <Modal.Title>Add a new movement</Modal.Title>
          <button
            type='button' className='btn-close' aria-label='Close'
            onClick={handleClose}
          />
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              <Col>
                {/* DATE */}
                <Form.Control
                  type='date'
                  name='date'
                  placeholder='Date'
                  defaultValue={moment(new Date()).format('YYYY-MM-DD')}
                  onChange={(event) => handleChange(event.target.name, moment(event.target.value).format('YYYY-MM-DD HH:mm'))}
                />
              </Col>
              <Col>

                <InputGroup className='mb-3'>
                  <InputGroup.Text>$</InputGroup.Text>
                  {/* AMOUNT */}
                  <Form.Control
                    name='amount' placeholder='Amount'
                    onChange={(event) => handleChange(event.target.name, event.target.value)}
                  />
                </InputGroup>
              </Col>
            </Row>
            <Row style={{ marginBottom: '1rem' }}>
              <Col>
                {/* CONCEPT */}
                <Form.Control
                  name='concept' placeholder='Concept'
                  onChange={(event) => handleChange(event.target.name, event.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {/* TYPE */}
                <Form.Control
                  as='select' name='type' placeholder='Type'
                  onChange={(event) => handleChange(event.target.name, event.target.value)}

                >
                  <option value=''>Select a Type... </option>
                  <option value='Outcome'>Outcome</option>
                  <option value='Income'>Income</option>
                </Form.Control>
              </Col>
              <Col>
                {/* CATEGORY */}
                <Form.Control
                  name='category' as='select' placeholder='Date'
                  onChange={(event) => handleChange(event.target.name, event.target.value)}
                >
                  <option value=''>Select a Category... </option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          {form.amount === 0 || form.category === '' || form.type === '' || form.concept === ''
            ? (
              <Button variant='success' onClick={submit} disabled>
                Save Changes
              </Button>
              )
            : (
              <Button variant='success' onClick={submit}>
                Save Changes
              </Button>
              )}

        </Modal.Footer>
      </Modal>
    </>

  )
}
export default AddMovement
