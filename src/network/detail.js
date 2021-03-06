import {request} from './idnex'

export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}


export class Goods{
  constructor(columns , itemInfo , services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.newPrice
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}