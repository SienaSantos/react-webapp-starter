var moment = require('moment')
var _ = require('lodash')

var toCamelCase = function(input) {
  return input.toLowerCase().replace(/ (.)/g, function(match, group1) {
      return group1.toUpperCase();
  });
}

var dateFormat = function(v){
  return v == "" ? "-" : moment(v).format("MM/DD/YYYY")
}

var pesoFormat = function (v) {
    typeof v === "string" ? v = parseFloat(v) : v
    return '₱ ' + numFormat(v);
  }

var pesoFormatNoDecimal = function (v) {
    typeof v === "string" ? v = parseFloat(v) : v
    return '₱ ' + v.toLocaleString('en-US');
  }

var pesoFormatWithoutDecimal = function (v) {
    typeof v === "string" ? v = parseFloat(v) : v
    return '₱ ' + formatWithoutDecimal(v);
  }

var percentFormat = function (v) {
    return parseFloat(v) + '%';
  }

var numFormat = function(v){
	  return v? v.toLocaleString('en-US', { style: 'decimal', maximumFractionDigits : 2, minimumFractionDigits : 2 }) : 0.00;
  }

var format = function (v){
    return v;
  }

var formatWithoutDecimal = function (v){
  return v.toLocaleString('en-US');
}

var pesoTableFormat = function (v) {
  var amount = parseInt(v);
  return '₱ ' + numFormat(amount);
}

var toProperCase = function (v) {
  return v.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var customSubstring = function (count , v){
  return v.substr(v.length - count)
}

var isWhole = function(amount){
  var x = amount === (parseInt(amount/1000)*1000);
  // console.log('func isWhole', x)
}

var loanIdFormatter = function(loanId) {
  return parseInt(loanId.split('LOAN-')[1])
}

var capitalizeFirstLetter = function (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var getStreamElapsedDay = function(date){
  return moment.utc(date).fromNow();
}

var getAge = function(birthday) {
  // var today = new Date();
  // var birthdate = new Date(bday)
  // var age = today.getFullYear() - birthdate.getFullYear(); //old code - computing age by year. na didisregard yung days
  var ageDifMs = Date.now() - new Date(birthday).getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  var age = Math.abs(ageDate.getUTCFullYear() - 1970);

  return age;
}

const replaceLink = function(link){
  var cloudfront = 'https://d3ceeezrvudt15.cloudfront.net/'
  // console.log('replaced ', _.replace(link, 'https://rfc360-test.s3.amazonaws.com/', cloudfront))
  return _.replace(link, 'https://rfc360-test.s3.amazonaws.com/', cloudfront)
}

const documentVersion = function(documents,newValue,indicator){
  var doctype = indicator == 'personal' ? "docType" : "description"
  return documents.filter((item) =>{
    return item[doctype].split(".")[0].includes(newValue)
    }
  )
}

module.exports = {
  pesoFormat: pesoFormat,
  pesoFormatNoDecimal : pesoFormatNoDecimal,
  pesoFormatWithoutDecimal: pesoFormatWithoutDecimal,
  percentFormat: percentFormat,
  numFormat: numFormat,
  toProperCase: toProperCase,
  format : format,
  pesoTableFormat : pesoTableFormat,
  formatWithoutDecimal : formatWithoutDecimal,
  customSubstring : customSubstring,
  isWhole : isWhole,
  loanIdFormatter : loanIdFormatter,
  toCamelCase: toCamelCase,
  capitalizeFirstLetter: capitalizeFirstLetter,
  getStreamElapsedDay: getStreamElapsedDay,
  dateFormat:dateFormat,
  getAge: getAge,
  replaceLink: replaceLink,
  documentVersion: documentVersion
}
