const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)
const mongoose = require('mongoose')

mongoose.connect(DB).then(() => console.log('資料庫連接成功'))