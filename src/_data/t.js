var i18next = require('i18next')
var req = require('require-yml')

var resources = {
  'pt-BR': req('./src/_translations/pt-BR.yml'),
  'en-US': req('./src/_translations/en-US.yml')
}

module.exports = function () {
  return function (locale, keys, options) {
    var i18n = i18next.createInstance()

    i18n.init({
      lng: locale,
      resources
    })

    return i18n.t(keys, options)
  }
}
