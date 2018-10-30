import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'

var moment = require('moment');


class DataField extends PureComponent {

  render () {
    var { fieldName, value, handleChange } = this.props
    return (
      <Form.Input label={fieldName} placeholder={fieldName} name={fieldName} value={value} onChange={handleChange}/>
    )
  }
}

export default DataField
