import React, { Component } from "react";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
require('react-bootstrap-table/css/react-bootstrap-table.css')
import BootstrapSortFunction from '../../../utils/bootstrapSort'
import { Icon, Label, Segment, Header, Item, Grid, Table } from 'semantic-ui-react'
import Pagination from '../Shared/Pagination'
import NoData from '../Shared/NoData'
import DataItem from './DataItem'
import sortUtils from '../../../utils/sortUtils'

class DataTable extends Component {

  state = {
    pageOfItems: [],
    column : null,
    direction: 'descending',
  }

  onChangePage(pageOfItems) {
    this.setState({ pageOfItems })
  }

  handleSort(clickedColumn, customSort){
    const { pageOfItems, direction } = this.state
    var x = customSort(direction, clickedColumn)
      this.setState({
        pageOfItems: pageOfItems.sort(x()),
        direction: direction === 'ascending' ? 'descending' : 'ascending',
        column: clickedColumn
      })
  }

  valueChecker(value){
    console.log(value);
    var type = typeof value

    var obj = {
      'number' : sortUtils.defaultSort,
      'string' : sortUtils.stringSort,
      'object' : sortUtils.dateSort
    }
    console.log(type)
    return obj[type]
  }

  render() {
    console.log('data table props ',this.props)

    var { data, match } = this.props
    var { pageOfItems, column, direction } = this.state
    return (
    <div>
        <Header style={{'marginLeft': '11px'}}>Items : {data.length}</Header>
        <Grid stackable>
        <Grid.Column width={16} className="inboxv2" style={{"padding":"10px 0px"}}>
              {
                !data[0] ?
                <NoData icon='book' size="huge" color="grey" header={"Nothing to Display"} content={"No Loans"}/> :
                <Item.Group divided>
                  <Table sortable fixed basic className="inbox-table">
                    <Table.Header className="inbox-head">
                      <Table.Row textAlign={'center'}>
                         {
                           Object.keys(data[0]).map((key) =>{
                             return <Table.HeaderCell  sorted={column === {key} ? direction : 'descending'} onClick={() => {this.handleSort(key, this.valueChecker(data[0][key]))}}>{key}</Table.HeaderCell>
                           })
                         }

                      </Table.Row>
                    </Table.Header>

                    <Table.Body>
                      {
                        pageOfItems.map((obj, i) => {
                          return <DataItem key={i} items={obj} {...this.props}/>
                          })
                        }
                    </Table.Body>
                  </Table>
                  <Item.Group divided>
                    <Pagination items={data} onChangePage={this.onChangePage.bind(this)} />
                  </Item.Group>
                </Item.Group>
              }
          </Grid.Column>
          </Grid>

    </div>
  )
  }
}

export default DataTable;
