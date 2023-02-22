# 我的餐廳清單

一個使用 Node.js + Express 打造的餐廳美食網站，可依照餐廳名稱與類別進行搜尋及預覽。

[Demo Website](http://localhost:3002/)

## 專案畫面

![image](https://github.com/WeiWayne1030/restaurantList/blob/main/public/index2.png)
![image](https://github.com/WeiWayne1030/restaurantList/blob/main/public/detailPage.png)
![image](https://github.com/WeiWayne1030/restaurantList/blob/main/public/editPage.png)
![image](https://github.com/WeiWayne1030/restaurantList/blob/main/public/createPage.png)

## Features - 產品功能

1. 使用者可以點擊 detail 查看任一餐廳，查看更多餐廳資訊，如地址、電話與簡介
2. 使用者可以依照中文名稱、英文名稱與餐廳類別進行搜尋
3. 使用者可以利用右上角的新增餐廳加入自己喜歡的餐廳
4. 使用者可以修改，刪除餐廳資訊打造自己喜歡的餐廳菜單

## Environment SetUp - 環境建置

1. [Node.js](https://nodejs.org/en/)
2. [MongoDB4.0 以上]（https://www.mongodb.com/try/download/community）

## Using tool - 使用工具

1. Node.js v12.22.12
2. Nodemon
3. Express v4.16.4
4. Express-Handlebars v3.0.0
5. Bootstrap v5.3.0
6. front-awesome v5.8.1
7. mongoose v6.9.2
8. dotenv v16.0.3

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/WeiWayne1030/restaurantList.git
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd restaurantList
```

3. 安裝 npm 套件

```
在 Terminal 輸入 npm install 指令
```

4.安裝 express 套件

```
在 Terminal 輸入 npm install express@4.16.4 指令
```

5. 安裝 nodemon 套件

```
在 Terminal 輸入 npm install -g nodemon
```

6. 匯入種子檔案
   在 Terminal 找到 Seeder.js 檔案

```
執行 node models/seeds/Seeder.js 匯入使用者與餐廳資料
當 terminal 出現以下字樣，即表示種子資料已新增至資料庫，按下 ctrl + c 結束執行
```

```
Mongodb is connected!

User and Restaurant data get done!
```

7. 啟動伺服器，輸入執行專案

```
使用 npm run dev 執行
```

8. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
Express is listening on http://localhost:3002
mongodb connected!
```

## Contributor - 專案開發人員

> [Wayne Sun]([https://github.com/WeiWayne1030])
