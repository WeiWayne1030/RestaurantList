//載入及設定模組路由
const express = require('express')
const restaurants = require('./restaurant.json')
const app = express()
const port = 3002
const exphbs = require('express-handlebars')
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
//餐廳詳細頁面
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurants.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id
  )  
  res.render('show', {restaurant: restaurant})
})

//搜尋功能
app.get('/search', (req, res) => {
  const keywords = req.query.keyword
  const keyword = keywords.trim().toLowerCase()
  const filteredRestaurant = restaurants.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) ||
    restaurant.category.includes(keyword)

  })
  res.render('index', { restaurants: filteredRestaurant, keyword: keyword })
})

//設置監聽器
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})
