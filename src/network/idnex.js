import axios from 'axios'

export function request(options){
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL:'http://152.136.185.210:7878/api/m5',
      timeout:50000
    })
    
    instance.interceptors.response.use(res=>{
      return res
    })
    
    instance(options)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })
}