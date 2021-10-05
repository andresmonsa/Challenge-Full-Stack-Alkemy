import { Row, Col, InputGroup, Form, Container, Button } from 'react-bootstrap'
import AddMovement from '../AddMovement/AddMovement'
import Movement from '../Movement/Movement'
import style from './HomeView.module.css'

const HomeView = ({ getLast, getAll, setAddModalShow, addModalShow, handleFilterChange, categories, setBalance, balance, filtredList, filters, setList, handleClose, subTotal, closeSesion }) => {
  return (
    <Container>
      <Row style={{ Minheight: '3rem', marginTop: '0.8rem', marginBottom: '0.8rem' }}>
        <Col> <Button variant='primary' onClick={() => getLast()}>Last movements</Button>  </Col>
        <Col>  <Button variant='primary' onClick={() => getAll()}>All movements</Button></Col>
        <Col>  <Button variant='primary' onClick={() => setAddModalShow(true)}>Add a new movement</Button></Col>
        <Col>   <Button className='ml-5' variant='danger' onClick={() => closeSesion()}>Close Sesion</Button></Col>
      </Row>

      <Row>
        <Col>
          {/* TYPE */}
          <InputGroup className='mb-3'>
            <InputGroup.Text>Type:</InputGroup.Text>
            <Form.Control as='select' name='type' placeholder='Filter by' onChange={(event) => handleFilterChange(event.target.name, event.target.value)}>
              <option value='all'>All</option>
              <option value='Outcome'>Outcome</option>
              <option value='Income'>Income</option>
            </Form.Control>
          </InputGroup>
        </Col>
        <Col>
          {/* CATEGORY */}
          <InputGroup className='mb-3'>
            <InputGroup.Text>Category:</InputGroup.Text>
            <Form.Control as='select' name='category' placeholder='Filter by' onChange={(event) => handleFilterChange(event.target.name, event.target.value)}>
              <option value='all' key='all'>All</option>
              {categories?.map((cat, index) => {
                return (
                  <option value={cat} key={index}>{cat}</option>
                )
              })}
            </Form.Control>
          </InputGroup>
        </Col>
      </Row>

      <Row style={{ Minheight: '3rem', marginTop: '0.8rem', marginBottom: '0.8rem' }} className={style.itemBox}>
        <Col><h5>Concept</h5></Col>
        <Col><h5>Amount</h5></Col>
        <Col><h5>Type</h5></Col>
        <Col><h5>Date</h5></Col>
        <Col><h5>Category</h5></Col>
        <Col><h5>Tools</h5></Col>
      </Row>

      {filtredList?.map((mov, index) => {
        return (
          <Row style={{ Minheight: '3rem', marginTop: '0.8rem', marginBottom: '0.8rem' }} key={index} className={style.itemBox}>
            <Movement mov={mov} index={index} setList={setList} categories={categories} setBalance={setBalance} />
          </Row>
        )
      })}

      <Row style={{ Minheight: '3rem', marginTop: '1rem', marginBottom: '0.8rem', marginRight: '2.5rem', textAlign: 'right' }}>
        {filters.type !== 'all' || filters.category !== 'all' ? <Col>SubTotal: ${subTotal}</Col> : null}
        <Col>Total: ${balance}</Col>
      </Row>
      <AddMovement categories={categories} addModalShow={addModalShow} handleClose={handleClose} setList={setList} setBalance={setBalance} />

    </Container>
  )
}

export default HomeView
