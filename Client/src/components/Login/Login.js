import { Form, Button, Container } from 'react-bootstrap'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { createSelectorHook, useDispatch, useSelector } from 'react-redux'
import { setLogged } from '../../redux/actions/userActions'
import { login } from '../functions/Index'
import SignUp from '../SignUp/SignUp'
const Login = () => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [modalShow, setModalShow] = useState(false)

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    // console.log(form)
  }

  const onSubmit = async (e) => {
    // console.log(form)
    e.preventDefault()
    login(form)
      .then(res => {
        // console.log(res)
        dispatch(setLogged(res))
      })
      .catch(e => console.log('Algo salió mal'))
  }
  const handleClose = () => setModalShow(false)

  const addModalShow = () => setModalShow(true)

  return (
    <>
      <Container className='mt-5'>
        <Form onChange={(e) => { onChange(e) }}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Control type='email' placeholder='Email...' name='email' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Control type='password' placeholder='Password' name='password' />
          </Form.Group>
          {form.email === '' || form.password === ''
            ? (
              <Button variant='primary' type='submit' disabled onClick={(e) => onSubmit(e)}>
                Login
              </Button>
              )
            : (
              <Button variant='primary' type='submit' onClick={(e) => onSubmit(e)}>
                Login
              </Button>
              )}

          <hr />
          <Form.Label>For got your password?</Form.Label>
        </Form>
      </Container>
      <Container className='text-center'>
        <Button variant='success' onClick={() => { addModalShow() }}>
          Sign Up
        </Button>
        <SignUp handleClose={handleClose} modalShow={modalShow} />
      </Container>
    </>
  )
}
export default Login
