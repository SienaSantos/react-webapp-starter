module.exports = {

  numberSortFunc: function(a, b, order, sortField) {
    if (order === 'desc') {
      return a[sortField] - b[sortField];
    } else {
      return b[sortField] - a[sortField];
    }
  },

  dateSortFunc: function(a, b, order, sortField) {
    function check(date){
      return date == '' ? 0 : date
    }
    if (order === 'desc') {
      return (new Date(check(a[sortField])).getTime() - new Date(check(b[sortField])).getTime());
    } else {
      return (new Date(check(b[sortField])).getTime() - new Date(check(a[sortField])).getTime());
    }
  }
}
