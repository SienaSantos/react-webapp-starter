module.exports = [
  {
    namespace: "users",
    routes: [
      {
        type: "index",
        desc: "index",
        route: "/users",
        server: "users",
        source: "http://localhost:4000/users"
      },
      {
        type: "get",
        desc: "get 1",
        route: "/users/:id",
        server: "users",
        source: "http://localhost:4000/users"
      },
      {
        type: "post",
        desc: "create",
        route: "/users",
        server: "users",
        source: "http://localhost:4000/users"
      },
      {
        type: "patch",
        desc: "edit",
        route: "/users/:id",
        server: "users",
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
        server: "loans",
        source: "http://localhost:4000/loans"
      },
      {
        type: "get",
        desc: "get 1",
        route: "/loans/:id",
        server: "loans",
        source: "http://localhost:4000/loans"
      },
      {
        type: "post",
        desc: "create",
        route: "/loans",
        server: "loans",
        source: "http://localhost:4000/loans"
      },
      {
        type: "patch",
        desc: "edit",
        route: "/loans/:id",
        server: "loans",
        source: "http://localhost:4000/loans"
      }
    ]
  }
];
