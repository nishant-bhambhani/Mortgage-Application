var winston = require('winston');
var Logger=winston.createLogger({
  transports:[
    new winston.transports.File
    ({ filename: 'views/pages/broker_logs.ejs', level:'info'})
  ]
})

module.exports.log = {
  custom: Logger,
  level: 'info',
};
