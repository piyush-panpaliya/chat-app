require('dotenv').config({path:'../.env'});
import express from 'express'
import {json} from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import morgan from 'morgan' 
import helmet from 'helmet'
import { __prod__ } from './constants'
import chalk from 'chalk'
import {Server} from 'socket.io'
import http  from "http"
import SocketServer from './socketServer'
import router from './routes'
import { errorHandler,notFound } from './middlewares/errors';
import './config/db'
 
const app = express()
 
app.use(json())
app.use(helmet())
app.use(cors())

!__prod__ && app.use(morgan('dev')) 
app.use(express.static('public'))

app.use('/', router)

// 404 error 
app.use(notFound)

// Error handler
app.use(errorHandler)

const server = http.createServer(app);
const io = new Server(server);
io.on("connection", (socket:any) => {
  console.log(`new user connected ${socket.id}`)
  SocketServer(socket);
});

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(
      chalk.blue.bold.underline(
          `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
      )
  )
})