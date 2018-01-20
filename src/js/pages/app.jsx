import React from 'react'
import { Flex, Box } from 'reflexbox'
import {
  emitReadiness,
  emitChoice,
  onStart,
  onOpponentLeft,
  onAnnouncement
} from '../api/socket'

import '../../style/index.global.css'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isReady: false,
      didChoose: false,
      opponentFound: false,
      opponentLeft: false,
      matchResult: null
    }

    onStart(() => this.setState({
      opponentFound: true
    }))

    onOpponentLeft(() => this.setState({
      opponentLeft: true
    }))

    onAnnouncement(result => this.setState({
      matchResult: result
    }))
  }

  ready () {
    emitReadiness()
    this.setState({
      isReady: true
    })
  }

  choice (shape) {
    emitChoice(shape)
    this.setState({
      didChoose: true
    })
  }

  render () {
    return (
      <Flex
        w={1}
        align='center'
        justify='center'
        style={{
          position: 'absolute',
          height: '100%'
        }}>
          {
            !this.state.isReady ? (
              <button onClick={() => this.ready()}>I am ready!</button>
            ) : (
              this.state.opponentFound ? (
                !this.state.opponentLeft : (
                  this.state.didChoose ? (
                    this.state.matchResult ? (
                      this.state.matchResult === 'win' ? (
                        <h1>You win!</h1>
                      )
                      :
                      this.state.matchResult === 'lose' ? (
                        <h1>You lose!</h1>
                      )
                      :
                      (
                        <h1>Tie!</h1>
                      )
                    ) : (
                      <h1>Your opponent is still thinking...</h1>
                    )
                  ) : (
                    <Box>
                      <button onClick={() => this.choice(0)}>Rock!</button>
                      <button onClick={() => this.choice(1)}>Paper!</button>
                      <button onClick={() => this.choice(2)}>Scissors!</button>
                    </Box>
                  )
                ) : (
                  <h1>Your opponent left the game :(</h1>
                )
              ) : (
                <h1>Finding your opponent...</h1>
              )
            )
          }
      </Flex>
    )
  }
}

export default App
