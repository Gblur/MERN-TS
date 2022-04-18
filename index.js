import express from 'express'
import bodyparser from "body-parser"
import cors from "cors"
import db from "./db/index.js"
import router from './routes/post-router.js'

const app = express()
const apiPort = 3000

app.use(cors())
app.use(bodyparser.json({limit: '50mb'}))
app.use(bodyparser.urlencoded({extended: true, limit: '50mb',
parameterLimit: 100000,}))

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once("open", () => {
  console.log("Connected with Mongo")
})
db.set('useFindAndModify', false);

app.use('/api', router)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))