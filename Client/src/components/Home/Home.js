import { Row, Col, InputGroup, Form, Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import {
  getCategories,
  getAllMovements,
  getLastMovements,
  getBalance,
  addMovement,
  editMovement,
  deleteMovement
} from '../functions/Index'
import style from './Home.module.css'
import { toastCustom } from '../common/toastify'

const Home = () => {
  const [list, setList] = useState()
  const [categories, setCategories] = useState([])
  const [balance, setBalance] = useState(0)
  const [filters, setFilters] = useState({
    type: 'all',
    category: 'all'
  })
  const [filtredList, setFiltredList] = useState(list)
  const [subTotal, setSubTotal] = useState(balance)

  useEffect(() => {
    const getData = async () => {
      setList(await getAllMovements())
      setBalance(await getBalance())
      setCategories(await getCategories())
    }
    getData()
    // console.log(list)
  }, [])

  useEffect(() => {
    let filtredByType = []
    let filtredByCat = []

    if (filters.type === 'all') {
      filtredByType = list
    } else {
      filtredByType = list.filter(movement => movement.type === filters.type)
    }

    if (filters.category === 'all') {
      filtredByCat = filtredByType
    } else {
      filtredByCat = filtredByType.filter(movement => movement.category === filters.category)
    }
    setFiltredList(filtredByCat)
    if (filtredByCat) getSubtotal(filtredByCat)
  }, [filters.type, filters.category, list])

  const getLast = async () => {
    setList(await getLastMovements())
    toastCustom('Showing last 10 movemets', 'success', 1500, 'bottom-right')
  }

  const getAll = async () => {
    setList(await getAllMovements())
    toastCustom('Showing all movemets', 'success', 1500, 'bottom-right')
  }

  const handleFilterChange = (eventName, eventValue) => {
    setFilters(prev => ({ ...prev, [eventName]: eventValue }))
  }

  const getSubtotal = (movements) => {
    let balance = 0
    movements.forEach(movement => {
      if (movement.type === 'Income') balance = balance + movement.amount
      else balance = balance - movement.amount
    })
    return setSubTotal(balance)
  }

  return (
    <>
      <Container>
        <Row style={{ Minheight: '3rem', marginTop: '0.8rem', marginBottom: '0.8rem' }}>
          <Col onClick={() => getLast()}>Last movements</Col>
          <Col onClick={() => getAll()}>All movements</Col>
          <Col>Add movement</Col>
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

        {/* {console.log(filtredList)} */}
        <Row style={{ Minheight: '3rem', marginTop: '0.8rem', marginBottom: '0.8rem' }} className={style.itemBox}>
          <Col><h5>Concept</h5></Col>
          <Col><h5>Amount</h5></Col>
          <Col><h5>Type</h5></Col>
          <Col><h5>Date</h5></Col>
          <Col><h5>Category</h5></Col>
        </Row>

        {filtredList?.map((mov, index) => {
          return (
            <Row style={{ Minheight: '3rem', marginTop: '0.8rem', marginBottom: '0.8rem' }} key={index} className={style.itemBox}>
              <Col>{mov.concept}</Col>
              <Col>{mov.amount}</Col>
              <Col>{mov.type}</Col>
              <Col>{mov.date}</Col>
              <Col>{mov.category}</Col>

            </Row>
          )
        })}

        <Row style={{ Minheight: '3rem', marginTop: '1rem', marginBottom: '0.8rem', marginRight: '2.5rem', textAlign: 'right' }}>
          {/* {console.log(filters)} */}
          {filters.type !== 'all' || filters.category !== 'all' ? <Col>SubTotal: ${subTotal}</Col> : null}

          <Col>Total: ${balance}</Col>

        </Row>

      </Container>
    </>
  )
}

export default Home
