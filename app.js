const express = require('express')
const { handleJsonBodyParseFailures } = require('./response/bodyParser')
const { routeNotFoundHandler, uncaughtExceptionHandler, unhandledRejectionHandler, internalServerErrorHandler } = require('./response/errorHandlers')

const routes = require('./routes')

const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(logger('dev'))

app.use(express.json())
app.use(handleJsonBodyParseFailures)

app.use('/',routes)

app.use('*', routeNotFoundHandler)
app.use(internalServerErrorHandler)

process.on('unhandledRejection', unhandledRejectionHandler)
process.on('uncaughtException', uncaughtExceptionHandler)

app.listen(4000, () => {
    console.log(`Example app listening on port ${4000}`)
})
