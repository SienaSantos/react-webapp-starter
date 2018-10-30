import React from "react";
import axios from "axios";
import routeConfig from "../api/config";

export function urlFinder(match, verb) {
  return routeConfig
    .find(({ namespace }) => namespace === match.params.namespace)
    .routes.find(({ type }) => type === verb);
}

export function withCreateNew(Component) {
  return class PostWrapper extends React.Component {
    handleClick() {
      console.log(urlFinder(this.props.match, "post"));
    }
    render() {
      return (
        <Component handleClick={this.handleClick.bind(this)} {...this.props} />
      );
    }
  };
}

export function withIndex(Component) {
  return class IndexWrapper extends React.Component {
    state = {
      data: []
    };
    componentDidMount() {
      const topic = routeConfig
        .find(
          ({ namespace }) => namespace === this.props.match.params.namespace
        )
        .routes.find(({ type }) => type === "index");
      axios.get(topic.source).then(res => this.setState({ data: res.data }));
    }
    render() {
      return <Component {...this.props} data={this.state.data} />;
    }
  };
}

export function withGetOne(Component) {
  return class IndexWrapper extends React.Component {
    state = {
      data: []
    };

    componentDidMount() {
      console.log('with get one', this.props)
      var { id, namespace } = this.props.match.params
      const topic = routeConfig.find(
        ({ namespace }) => namespace === this.props.match.params.namespace
      );
      const indexUrl = topic.routes.find(({ type }) => type === "get");
      axios.get(`${indexUrl.source}/${id}`).then(res => this.setState({ data: res.data }));
    }
    render() {
      return <Component {...this.props} data={this.state.data} />;
    }
  };
}

export function withUpdateOne(Component) {
  return class IndexWrapper extends React.Component {

    handleClick() {
      console.log('with get one', this.props)
      var { id, namespace } = this.props.match.params
      const topic = routeConfig.find(
        ({ namespace }) => namespace === this.props.match.params.namespace
      );
      const indexUrl = topic.routes.find(({ type }) => type === "put");
      axios.get(`${indexUrl.source}/${id}`).then(res => this.setState({ data: res.data }));
    }
    render() {
      return <Component {...this.props} data={this.state.data} />;
    }
  };
}
