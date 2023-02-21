//載入及設定模組路由
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3002
const exphbs = require('express-handlebars')
const Restaurant = require('./models/restaurant')
// 引用 body-parser
const bodyParser = require('body-parser')

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

// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))

//預覽全部餐廳資料
app.get('/', (req, res) =>{
  return Restaurant.find({})
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

//新增餐廳
app.get('/restaurants/new', (req, res) =>{
  return res.render('new')
})

app.post('/restaurants', (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//餐廳詳細頁面
app.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  Restaurant
    .findById(id)
    .lean()
    .then( restaurant => res.render("show", { restaurant }))
    .catch((error) => console.log(error));
});


//修改餐廳
app.get('/restaurants/:id/edit', (req, res) =>{
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render("edit", { restaurant }))
    .catch(err => console.log(err))
})



//搜尋功能
app.get('/search', (req, res) => {
  if(!req.query.keywords) {
    res.redirect('/')
  }

  const keywords = req.query.keywords
  const keyword = req.query.keyword.trim().toLowerCase()
  Restaurant.find({})
    .lean()
    .then(restaurantsData => {
      const filterRestaurantsData = restaurantsData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { restaurantsData: filterRestaurantsData, keywords })
    })
    .catch(err => console.log(err))
})

//設置監聽器
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})