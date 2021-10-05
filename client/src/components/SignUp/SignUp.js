import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { signUp } from '../functions/Index'
import { validate } from '../functions/formValidate'
import { setLogged } from '../../redux/actions/userActions'

const SignUp = ({ modalShow, handleClose }) => {
  const [form, setForm] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const dispatch = useDispatch()

  useEffect(() => {
    paswordValidate(form)
    if (form.name === '' || form.lastName === '' || form.email === '' || form.password === '' || form.password === '') {
      setError((prev) => ({ ...prev, complete: true }))
    } else setError((prev) => ({ ...prev, complete: null }))
    console.log(error.matchPassword)
  }, [form.password, form.confirmPassword])
  const [error, setError] = useState({})

  const paswordValidate = (form) => {
    if (form.password !== form.confirmPassword) setError((prev) => ({ ...prev, matchPassword: true }))
    else setError((prev) => ({ ...prev, matchPassword: null }))
  }

  const handleChange = (e) => {
    validate(e.target.value, e.target.name, setError)
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const onSubmit = async (e) => {
    paswordValidate(form)
    console.log(form)
    console.log(error)
    try {
      const userData = await signUp(form)
      dispatch(setLogged(userData))
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <Modal show={modalShow} onHide={handleClose} className='mt-1'>
      <Container className='mb-3 mt-1'>
        <Modal.Header className='mb-3'>
          <Container>
            <Row>
              <Col xs={10}>
                <h2>Sign UP! </h2>
              </Col>
              <Col>
                <button
                  type='button' className='btn-close' aria-label='Close'
                  onClick={handleClose}
                />
              </Col>
            </Row>
            <Row>
              <p> Is easy and free! </p>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control placeholder='Name' name='name' className='mb-3' onChange={(e) => handleChange(e)} />
            {error.name && error.name ? <p>{error.name} </p> : null}
            <Form.Control placeholder='Last Name' name='lastName' className='mb-3' onChange={(e) => handleChange(e)} />
            {error.lastName && error.lastName ? <p>{error.lastName} </p> : null}
            <Form.Control placeholder='Email' name='email' className='mb-3' onChange={(e) => handleChange(e)} />
            {error.email && error.email ? <p>{error.email} </p> : null}
            <Form.Control placeholder='Pasword' type='password' name='password' className='mb-3' onChange={(e) => handleChange(e)} />
            <Form.Control placeholder='Confirm Password' type='password' name='confirmPassword' className='mb-3' onChange={(e) => handleChange(e)} />
            {error.matchPassword && error.matchPassword ? <p> Passwords doesn´s match! 👀 </p> : null}
          </Form>
          {error && (error.name || error.lastName || error.email || error.matchPassword || error.complete)
            ? (
              <Button variant='success' disabled onClick={onSubmit}> Create Account </Button>

              )
            : (
              <Button variant='success' onClick={onSubmit}> Create Account </Button>

              )}
        </Modal.Body>
        <Modal.Footer>
          Thanks for join us!
        </Modal.Footer>
      </Container>
    </Modal>

  )
}

export default SignUp
