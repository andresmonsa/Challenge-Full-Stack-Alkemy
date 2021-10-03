
import { useState, useEffect } from 'react'
import {
  getCategories,
  getAllMovements,
  getLastMovements,
  getBalance
} from '../functions/Index'

import { toastCustom } from '../common/toastify'
import HomeView from './HomeView'

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
  const [addModalShow, setAddModalShow] = useState(false)

  useEffect(() => {
    const getData = async () => {
      setList(await getAllMovements())
      setBalance(await getBalance())
      setCategories(await getCategories())
    }
    getData()
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
    try {
      setList(await getLastMovements())
      toastCustom('Showing last 10 movemets', 'success', 2000, 'bottom-right')
    } catch (e) {
      toastCustom('Opps, somethings happens!😮', 'error', 2000, 'bottom-right')
    }
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

  const handleClose = () => setAddModalShow(false)

  return (
    <>
      <HomeView
        getAll={getAll}
        getLast={getLast}
        setAddModalShow={setAddModalShow}
        addModalShow={addModalShow}
        handleClose={handleClose}
        filters={filters}
        balance={balance}
        setBalance={setBalance}
        setList={setList}
        handleFilterChange={handleFilterChange}
        categories={categories}
        filtredList={filtredList}
        subTotal={subTotal}

      />

    </>
  )
}

export default Home
