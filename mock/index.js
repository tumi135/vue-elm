/**
 * Created by ASUS on 2018/6/10.
 */
import Mock from 'mockjs'
import data from '../data.json'

Mock.mock('/good/seller',{
  code:0,
  codeMsg:'成功',
  data:data.seller
})
Mock.mock('/good/goods',{
  code:0,
  codeMsg:'成功',
  data:data.goods
})
Mock.mock('/good/ratings',{
  code:0,
  codeMsg:'成功',
  data:data.ratings
})
