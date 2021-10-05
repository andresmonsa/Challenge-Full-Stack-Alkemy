import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { signUp } from '../functions/Index'

const SignUp = ({ modalShow, handleClose }) => {
  return (
    <Modal show={modalShow} onHide={handleClose} className='mt-5'>
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
            <Form.Control placeholder='Name' name='name' className='mb-3' />
            <Form.Control placeholder='Last Name' name='lastName' className='mb-3' />
            <Form.Control placeholder='Email' name='mail' className='mb-3' />
            <Form.Control placeholder='Pasword' name='password' className='mb-3' />
            <Form.Control placeholder='Confirm Password' name='confirmPassword' className='mb-3' />
          </Form>
          <Button variant='success'> Create Account </Button>
        </Modal.Body>
        <Modal.Footer>
          Thanks for join us!
        </Modal.Footer>
      </Container>
    </Modal>

  )
}

export default SignUp
