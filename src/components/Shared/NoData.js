import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react'

const NoData = (props) => {
  var { icon, size, color, header, content } = props
   return (
     <div className="text-center" style={{margin: '7% 0'}}>
       <Icon name={icon} size={size} color={color}/>
       <h3>{header}</h3>
       <p>{content}</p>
     </div>
  )
}

export default NoData
