import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Sidebar, Menu, Icon, Label, Sticky, Segment, Header } from 'semantic-ui-react'
import routeConfig from "../../api/config";
import axios from "axios";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
require('react-bootstrap-table/css/react-bootstrap-table.css')
import BootstrapSortFunction from '../../utils/bootstrapSort'
// import logo from "./logo.svg";
// import "./App.css";
import { urlFinder, withCreateNew, withIndex } from "../../utils/utils";

import DataTable from './Data/DataTable'



function DataTable1({ match, data }) {
  console.log('props ',match)
  console.log('data ',data)
  return data[0] ? (
    <div className="container">
      <table>
        <tr>
          {Object.keys(data[0]).map(head => (
            <th> {head} </th>
          ))}
        </tr>
        <tbody>
          {data.map((single, i) => {
            return (
              <tr key={i}>
                {Object.keys(single).map(foo => (
                  <td> {single[foo]} </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <hr />

    </div>
  ) : null;
}


function Page({ match, handleClick }) {
  console.log(match)
  return (
    <div>
      <h1>{match.params.namespace}</h1>
      <button onClick={handleClick}>Add New</button>
      <hr/><br/>
      <Route path={`${match.path}`} component={withIndex(DataTable)} />
      <hr/>
    </div>
  );
}

class Data extends Component {
  render() {
    return (
      <div className="">
        <Router>
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='push' icon='labeled' inverted vertical visible width='thin'>
              { routeConfig.map(route => (
                  <Link className='item' to={`/data/${route.namespace}`}>{route.namespace}</Link>
                ))
              }
            </Sidebar>

            <Sidebar.Pusher>
              <Segment basic>
                <Route path="/data/:namespace" component={withCreateNew(Page)} />
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>

          </Router>
        </div>
    );
  }
}



export default Data;
