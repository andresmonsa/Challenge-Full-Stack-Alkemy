import { Button, Col, Row, Form } from 'react-bootstrap'
import { useState } from 'react'
import moment from 'moment'
import { toastCustom } from '../common/toastify'
import { VscEdit, VscTrash } from 'react-icons/vsc'
import { useSelector } from 'react-redux'
import { getAllMovements, editMovement, getBalance } from '../functions/Index'
import DeleteMovementModal from './DeleteMovementModal'

const Movement = ({ mov, setList, categories, setBalance }) => {
  const token = useSelector(state => state.logged.token)
  const userID = useSelector(state => state.logged.id)
  const [form, setForm] = useState({
    concept: mov.concept,
    date: mov.date,
    category: mov.category,
    amount: mov.amount,
    type: mov.type
  })
  const [edit, setEdit] = useState(false)
  const [addModalShow, setAddmodalShow] = useState(false)
  const editMode = () => {
    edit === false ? setEdit(true) : setEdit(false)
  }

  const submit = async () => {
    await editMovement(mov.id, form, token)
    setTimeout(async () => {
      setList(await getAllMovements(userID, token))
      setBalance(await getBalance(userID, token))
    }, 500)
    setEdit(false)
    toastCustom('Movement edited', 'success', 2000, 'bottom-right')
  }
  const handleChange = (name, value, id) => {
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleClose = () => setAddmodalShow(false)

  const delMovement = async (id) => {
    setAddmodalShow(true)
  }
  return (
    <>
      {edit === false
        ? (
          <>
            <Col>{mov.concept}</Col>
            <Col>{mov.amount}</Col>
            <Col>{mov.type}</Col>
            <Col>{moment(mov.date).format('YYYY-MM-DD HH:mm')}</Col>
            <Col>{mov.category}</Col>
            <Col>
              <Row>
                <Col>
                  <VscTrash onClick={(e) => delMovement(mov.id)} />
                  <DeleteMovementModal addModalShow={addModalShow} handleClose={handleClose} id={mov.id} setList={setList} setBalance={setBalance} />
                </Col>
                <Col onClick={(e) => editMode(e, mov.id)}>
                  <VscEdit />
                </Col>

              </Row>
            </Col>

          </>
          )
        : (
          <>
            <Col>
              <Form.Control
                name='concept' placeholder='Concept' defaultValue={mov.concept} onChange={(e) => { handleChange(e.target.name, e.target.value, mov.id) }}
                as='textarea' rows={3}
              />
            </Col>
            <Col>
              <Form.Control
                name='amount' placeholder='Amount' defaultValue={mov.amount} onChange={(e) => { handleChange(e.target.name, e.target.value, mov.id) }}
              />
            </Col>

            <Col>{mov.type}</Col>

            <Col>
              <Form.Control
                type='date'
                name='date'
                placeholder='Date'
                onChange={(event) => handleChange(event.target.name, moment(event.target.value).format('YYYY-MM-DD HH:mm'), mov.id)}
                defaultValue={moment(mov.date).format('YYYY-MM-DD')}
              />
            </Col>

            <Col>
              <Form.Control
                as='select' name='category' placeholder='category'
                defaultValue={mov.category} onChange={(e) => { handleChange(e.target.name, e.target.value, mov.id) }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}

              </Form.Control>
            </Col>
            <Col>
              <Row>
                <Col>
                  {form.amount === 0 || form.concept === ''
                    ? (
                      <Button variant='success' onClick={submit} disabled size='sm'>
                        Save
                      </Button>
                      )
                    : (
                      <Button variant='success' onClick={submit} size='sm'>
                        Save
                      </Button>
                      )}
                  <Button variant='secondary' size='sm' onClick={(e) => editMode(e, mov.id)}> Close</Button>
                  {/* <Button variant='success' size='sm' onClick={(e) => editMode(e, mov.id)}> Save</Button> */}
                </Col>
              </Row>

            </Col>

          </>
          )}

    </>
  )
}

export default Movement
