import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { Form , Grid } from 'semantic-ui-react'

var moment = require('moment');
import DataField from './DataField'
import { urlFinder, withUpdateOne } from "../../../utils/utils";


class SingleDataPage extends PureComponent {
  state = {
    data : this.props.data
  }

  componentWillReceiveProps(nextProps){
    console.log('cwrp')
    if(this.props.data !== nextProps.data){
      this.setState({
        data : nextProps.data
      })
    }
  }

  handleChange = (e, { name, value }) =>{
    this.setState(prevState => ({
      data: {
          ...prevState.data,
          [name]: value
      }
    }))
  }

  handleSubmit = () => {
    var { data } = this.state
    console.log('submit ', data)

    this.props.handleClick(data)

  }

  render () {
    var { data } = this.state
    console.log('single page props ', this.props)

    var fields = Object.keys(data).map((key)=>{
      return (
        <DataField fieldName={key} value={data[key]} handleChange={this.handleChange}/>
      )
    })

    return (

      <Grid celled='internally'>
        <Grid.Row>
          <Grid.Column width={2}>
            Insert side bar
          </Grid.Column>

          <Grid.Column width={5}>
            <Form>
              {fields}
              <Form.Button color='green' onClick={this.handleSubmit}>Apply Changes</Form.Button>
            </Form>
          </Grid.Column>
        </Grid.Row>


      </Grid>

    )
  }
}




export default SingleDataPage
