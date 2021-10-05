import { Form, Button, Container } from 'react-bootstrap'
import { useState } from 'react'
import { createSelectorHook, useDispatch, useSelector } from 'react-redux'
import { setLogged } from '../../redux/actions/userActions'
import { login } from '../functions/Index'
const Login = () => {
  const dispatch = useDispatch()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

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

  return (
    <Container className='mt-5'>
      <Form onChange={(e) => { onChange(e) }}>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' name='email' />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Password' name='password' />
        </Form.Group>
        <Button variant='primary' type='submit' onClick={(e) => onSubmit(e)}>
          Submit
        </Button>
      </Form>
    </Container>
  )
}
export default Login
