var moment = require('moment')

module.exports = function () {
  return function (locale, date, format) {
    locale = locale ? locale : "pt-BR";

    moment.locale(locale);

    return moment(date).format(format);
  }
}
