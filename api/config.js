module.exports = [
  {
    namespace: "users",
    routes: [
      {
        type: "index",
        desc: "index",
        route: "/users",
        source: "http://localhost:4000/users"
      },
      {
        type: "get",
        desc: "get 1",
        route: "/users/:id",
        source: "http://localhost:4000/users"
      },
      {
        type: "post",
        desc: "create",
        route: "/users",
        source: "http://localhost:4000/users"
      }
    ]
  },
  {
    namespace: "loans",
    routes: [
      {
        type: "index",
        desc: "index",
        route: "/loans",
        source: "http://localhost:4000/loans"
      },
      {
        type: "get",
        desc: "get 1",
        route: "/loans/:id",
        source: "http://localhost:4000/loans"
      },
      {
        type: "post",
        desc: "create",
        route: "/loans",
        source: "http://localhost:4000/loans"
      }
    ]
  }
];
