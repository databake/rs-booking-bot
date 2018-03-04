module.exports.sendSMS = (toNumber, fromNumber, message) => {
  const body = {
    toPhoneNumber: toNumber,
    fromPhoneNumber: fromNumber,
    messageBody: message
  }
  fetch('https://y2mci8zlme.execute-api.eu-west-1.amazonaws.com/dev/sms/send', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'x-api-key': 'E8ZJ5gtRu259eqPyxZ4wj3FoguRX48NL1pYCvzWJ'
    })
  })
    .then(res => res.json())
    .then(response => console.log('Success:', response))
    .catch(error => console.error('Error:', error))
}

module.exports.setDay = dayOfWeek => {
  const moment = require('moment')
  // if we haven't yet passed the day of the week that I need:
  if (moment().isoWeekday() <= dayOfWeek) {
    // then just give me this week's instance of that day
    return moment().isoWeekday(dayOfWeek).format('ddd, MMM Do YYYY').toString()
  } else {
    // otherwise, give me next week's instance of that day
    return moment()
      .add(1, 'weeks')
      .isoWeekday(dayOfWeek)
      .format('ddd, MMM Do YYYY')
      .toString()
  }
}
