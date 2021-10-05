import axios from 'axios'
import { ApiURL } from '../../config'

export const getCategories = async () => {
  const response = await axios.get(`${ApiURL}/categories/`)
  return response.data
}

export const getAllMovements = async (userID) => {
  console.log(userID, 'USERID')
  const response = await axios.get(`${ApiURL}/movements/${userID}`)
  return response.data
}

export const getLastMovements = async (userID) => {
  const response = await axios.get(`${ApiURL}/movements/${userID}?type=last`)
  return response.data
}

export const getBalance = async (userID) => {
  const response = await axios.get(`${ApiURL}/movements/${userID}?type=balance`)
  return response.data
}

export const addNewMovement = (data) => {
  try {
    axios.post(`${ApiURL}/movements/`, data)
  } catch (error) { console.log(error) }
}
export const editMovement = async (movementID, data) => {
  try {
    await axios.patch(`${ApiURL}/movements/${movementID}`, data)
  } catch (error) { console.log(error) }
}

export const deleteMovement = (movementID) => {
  try {
    axios.delete(`${ApiURL}/movements/${movementID}`)
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
  try {
    const logged = await axios.post(`${ApiURL}/users/`, userData)
    return logged.data
  } catch ({ message: error }) {
    throw new Error(error)
  }
}
