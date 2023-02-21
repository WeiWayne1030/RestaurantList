//載入及設定模組路由
const express = require('express')
const mongoose = require('mongoose')
const restaurants = require('./restaurant.json')
const app = express()
const port = 3002
const exphbs = require('express-handlebars')

mongoose.set('strictQuery', false) 

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: './.env' })
}

//設定模板引擎
app.engine('handlebars', exphbs({defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//設定靜態資料
app.use(express.static('public'))
//處理路由
//首頁
app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurants.results })
})

//設定連線到mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//餐廳詳細頁面
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurants.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )  
  res.render('show', {restaurant: restaurant})
})

//搜尋功能
app.get('/search', (req, res) => {
  const keywords = req.query.keywords
  const keyword = req.query.keyword.trim().toLowerCase()
  const filteredRestaurant = restaurants.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) ||
    restaurant.category.includes(keyword)

  })
  res.render('index', { restaurants: filteredRestaurant, keyword: keywords })
})

//設置監聽器
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})