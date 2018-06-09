import React from 'react'
import { Flex, Box } from 'reflexbox'

import Gateway from '../components/gateway'
import Game from '../components/game'

import '../../style/index.global.css'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      roomIsReady: false,
      port: null
    }
  }

  roomIsReady (port) {
    this.setState({
      roomIsReady: true,
      port: port
    })
  }

  gameHasEnded () {
    this.setState({
      roomIsReady: false,
      port: null
    })
  }

  render () {
    return (
      <Flex
        w={1}
        align='center'
        justify='center'
        style={{
          textAlign: 'center',
          position: 'absolute',
          height: '100%'
        }}>
        {
          this.state.roomIsReady ? (
            <Game onGameEnded = {this.gameHasEnded.bind(this)} />
          ) : (
            <Gateway onRoomIsReady = {this.roomIsReady.bind(this)} />
          )
        }
      </Flex>
    )
  }
}

export default App
