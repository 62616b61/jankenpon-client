import React from 'react'
import { Flex, Box } from 'reflexbox'

import {
  onOpponentFound,
  onRoomIsReady,
  disconnect
} from '../api/gatewayApi'

class Gateway extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      opponentFound: false
    }

    onOpponentFound((name) => this.setState({
      opponentFound: true
    }))

    onRoomIsReady((port) => {
      props.onRoomIsReady(port)
    })
  }

  render () {
    return (
      <div>
        {
          this.state.opponentFound &&
          !this.state.didChoose
            ? <h2>Port: {this.state.port}</h2>
            : <h2>Looking for opponent...</h2>
        }
      </div>
    )
  }
}

export default Gateway
