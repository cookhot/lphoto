import axios from 'axios'

const ip = process.env.LOCAL_IP ? process.env.LOCAL_IP : '127.0.0.1'

const baseUrl = `http://${ip}:3000`

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
