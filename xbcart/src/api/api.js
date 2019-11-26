import Vue from 'vue'

/*
  Get Data from data.json
  @return JSON
 */
const getData = () => Vue.http.get('data').then((res) => res.json())

/*
  Get Names from names.json
  @return JSON
 */
const getNames = () => Vue.http.get('names').then((res) => res.json())

/*
  Emulate async get currency rate
  @return number
 */
const getUSDRUBRate = () => new Promise(resolve => setTimeout(() => {
  let min = 20
  let max = 80
  return resolve(Number((Math.random() * (max - min) + min).toFixed(2)))
}, 10))

export {
  getData,
  getNames,
  getUSDRUBRate
}
