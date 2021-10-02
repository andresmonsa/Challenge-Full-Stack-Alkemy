import axios from 'axios'
import { ApiURL } from '../../config'

export const getCategories = async () => {
  const response = await axios.get(`${ApiURL}/categories`)
  return response.data
}

export const getAllMovements = async () => {
  const response = await axios.get(`${ApiURL}/movements/`)
  return response.data
}

export const getLastMovements = async () => {
  const response = await axios.get(`${ApiURL}/movements?type=last`)
  return response.data
}

export const getBalance = async () => {
  const response = await axios.get(`${ApiURL}/movements?type=balance`)
  return response.data
}

export const addMovement = (data) => {
  try {
    axios.post(`${ApiURL}/movements/`, data)
  } catch (error) { console.log(error) }
}
export const editMovement = (movementID, data) => {
  try {
    axios.patch(`${ApiURL}/movements/${movementID}`, data)
  } catch (error) { console.log(error) }
}

export const deleteMovement = (movementID) => {
  try {
    axios.delete(`${ApiURL}/movements/${movementID}`)
  } catch (error) { console.log(error) }
}
