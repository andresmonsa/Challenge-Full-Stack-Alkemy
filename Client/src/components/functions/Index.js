import axios from 'axios'
import { ApiURL } from '../../config'

export const getCategories = async () => {
  const response = await axios.get(`${ApiURL}/categories/`)
  return response.data
}

export const getAllMovements = async (userID, token) => {
  const response = await axios.get(`${ApiURL}/movements/${userID}`, {
    headers: {
      token
    }
  })
  return response.data
}

export const getLastMovements = async (userID, token) => {
  const response = await axios.get(`${ApiURL}/movements/${userID}?type=last`, {
    headers: {
      token
    }
  })
  return response.data
}

export const getBalance = async (userID, token) => {
  const response = await axios.get(`${ApiURL}/movements/${userID}?type=balance`, {
    headers: {
      token
    }
  })
  return response.data
}

export const addNewMovement = (data, token) => {
  try {
    axios.post(`${ApiURL}/movements/`, data, {
      headers: {
        token
      }
    })
  } catch (error) { console.log(error) }
}

export const editMovement = async (movementID, data, token) => {
  try {
    await axios.patch(`${ApiURL}/movements/${movementID}`, data, {
      headers: {
        token
      }
    })
  } catch (error) { console.log(error) }
}

export const deleteMovement = (movementID, token) => {
  try {
    axios.delete(`${ApiURL}/movements/${movementID}`, {
      headers: {
        token
      }
    })
  } catch (error) { console.log(error) }
}

export const login = async (userData) => {
  try {
    const logged = await axios.post(`${ApiURL}/users/login`, userData)
    return logged.data
  } catch ({ message: error }) {
    throw new Error(error)
  }
}

export const signUp = async (userData) => {
  console.log(userData, 'data')
  try {
    const logged = await axios.post(`${ApiURL}/users/`, userData)
    return logged.data
  } catch ({ message: error }) {
    throw new Error(error)
  }
}
