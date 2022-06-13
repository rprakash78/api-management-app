const { createLogger, transports, format } = require('winston')
const config = require('./config/properties.json')

const date = (new Date()).toISOString().split('T')[0]
let filename = config.logger.fileName
filename = filename.concat(date, '.log')

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: `./logs/${filename}`,
      json: false,
      maxsize: config.logger.maxSize,
      maxFiles: config.logger.maxFiles
    }),
    new transports.Console()
  ]
})

module.exports = logger
