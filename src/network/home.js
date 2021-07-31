import {request} from './idnex'

export function getMultidata(){
  return request({
    url:'/home/multidata'
  })
}


export function getHomeGoods(type , page){
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}