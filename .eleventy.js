var moment = require('moment')
var pluginSass = require("eleventy-plugin-sass")

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSass, {
    watch: ['src/**/*.{scss,sass}']
  })

  eleventyConfig.addPassthroughCopy("src/assets/**/!(*.scss)")
  eleventyConfig.addPassthroughCopy("api/**/*")

  // date filter (localized)
  eleventyConfig.addFilter("date", function(date, format, locale) {
    locale = locale ? locale : "pt-BR"
    moment.locale(locale)
    return moment(date).format(format)
  });
};
