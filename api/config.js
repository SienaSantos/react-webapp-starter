module.exports = [
  {
    namespace : 'users',
    routes : [
      {type : 'index', route: '/users'},
      {type : 'get', route: '/users:id'},
      {type : 'post', route: '/users'},
    ]
  },
  {
    namespace : 'loans',
    routes : [
      {type : 'index', route: '/loans'},
      {type : 'get', route: '/loans:id'},
      {type : 'post', route: '/loans'},
    ]
  }
]
