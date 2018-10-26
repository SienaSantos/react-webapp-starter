import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
require('react-bootstrap-table/css/react-bootstrap-table.css')
import BootstrapSortFunction from '../../../utils/bootstrapSort'

class DataTable extends Component {
  render() {
    console.log('data table props ',this.props)
    return (
    <div> data table</div>
  )
  }
}

export default DataTable;
