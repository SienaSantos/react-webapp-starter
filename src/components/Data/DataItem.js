import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {Item, Label, Divider, Header, Table} from 'semantic-ui-react'
import Utils from '../../../utils/format'

var moment = require('moment');

const styles={
  "dot" : {
    width : "20px"
  },
  "name":{
    "fontWeight":"700"
  },
  "item":{

  }
}

class DataItem extends PureComponent {

  selectedRow(row){
    console.log(row)
    // var { setSelectedLoan, updateLoanStatus, agentId, roleId, isOpen }= this.props
    //
    // if (row.status == "Pending" && roleId == "2"){
    //   var obj = {
    //     email : agentId,
    //     loanId : row.loanId,
    //     status: 'For Verification',
    //     date : moment(new Date).format('YYYY-MM-DD HH:mm:ss')
    //   }
    //   updateLoanStatus(obj, "Initial")
    // }
    // setSelectedLoan(row)
    // localStorage.setItem('bId',row.borrowerId)
    // localStorage.setItem('lId',row.loanId)
    // browserHistory.push('/applications/'+row.loanId)
    // console.log("row",row)
  }



  render () {
    var { items } = this.props
    return (
        <Table.Row className="inbox-item" textAlign={'center'} onClick={this.selectedRow.bind(this, items)} >
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
