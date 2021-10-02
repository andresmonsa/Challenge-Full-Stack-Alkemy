const { NODE_ENV } = process.env

export const ApiURL = NODE_ENV === 'development' ? 'http://localhost:3002' : ''
