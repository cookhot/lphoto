import axios from 'axios'

const HOST = process.env.HOST ? process.env.HOST : '0.0.0.0'

const baseUrl = `http://${HOST}:3000`

const getImgs = (params) => {
  return axios(`${baseUrl}/img`, { params })
}

const guessWord = (val) => {
  return axios(`${baseUrl}/associate`, {params: { key: val }})
}

const submitComment = (comment) => {
  return axios.post(`${baseUrl}/comment`, comment)
}

const submitAvatar = (avatar) => {
  return axios.post(`${baseUrl}/avatar`, avatar)
}

// TODO 待优化
const getAllComment = () => {
  return axios(`${baseUrl}/getComment`)
}

export {
  baseUrl,
  getImgs,
  submitComment,
  submitAvatar,
  getAllComment,
  guessWord
}
