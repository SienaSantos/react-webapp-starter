module.exports = {

  defaultSort: function(dir, col) {
    return function(){
      return function(a,b){
        return dir === 'descending' ?
             a[col] - b[col] :
             b[col] - a[col]
      }
    }
  },

  dateSort: function(dir, col) {
    return function(){
      return function(a,b){
        return dir === 'descending' ?
            new Date(a[col]).getTime() - new Date(b[col]).getTime() :
            new Date(b[col]).getTime() - new Date(a[col]).getTime()
      }
    }
  },

  stringSort: function(dir, col) {
    return function(){
      return function(a,b){
        return dir === 'descending' ?
            (a[col]|| "").toString().localeCompare((b[col] || "").toString()) :
            (b[col]|| "").toString().localeCompare((a[col] || "").toString())
      }
    }
  }

}
