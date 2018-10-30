
import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Item, Label, Divider, Header, Table} from 'semantic-ui-react'
import Utils from '../../../utils/format'
import ids from '../../../api/id'

var moment = require('moment');

class DataItem extends PureComponent {

  onRowSelect(row){
    var { history, match } = this.props
    var id = ids[match.params.namespace]
    // console.log(id)
    history.push(`${match.url}/${row[id]}`)
  }

  render () {
    var { items, match } = this.props
    return (
      <Table.Row className="inbox-item" textAlign={'center'} onClick={this.onRowSelect.bind(this, items)} >
        {
          Object.keys(items).map((key)=>{
            return <Table.Cell textAlign="center"><div className="alignMiddle">{items[key]}</div></Table.Cell>
          })
        }
      </Table.Row>
    )
  }
}




export default DataItem
