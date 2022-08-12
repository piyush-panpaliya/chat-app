import  mongoose, {ConnectOptions} from'mongoose'
import chalk from 'chalk'
const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }as ConnectOptions )
    .then(conn=>
      console.log(
        chalk.green.bold.underline(
        `Database connected: ${conn.connection.host}`
        )
    ))
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

connect()
