import React from 'react'
import { Flex, Box } from 'reflexbox'
import {
  emitReadiness,
  emitChoice,
  onStart,
  onGeneratedName,
  onRoomIsBeingPrepared,
  onOpponentLeft,
  onAnnouncement
} from '../api/socket'

import '../../style/index.global.css'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      isReady: false,
      didChoose: false,
      roomIsBeingPrepared: false,
      opponentFound: false,
      opponentLeft: false,
      matchResult: null
    }

    onGeneratedName((name) => this.setState({
      name: name
    }))

    onRoomIsBeingPrepared(() => this.setState({
      roomIsBeingPrepared: true
    }))

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

    const matchResult = !this.state.matchResult
      ? <h1>Your opponent is still thinking...</h1>
      : this.state.matchResult === 'win'
      ? <h1>You win!</h1>
      : this.state.matchResult === 'lose'
      ? <h1>You lose!</h1>
      : <h1>Tie!</h1>
    const buttons = <Box>
      <button onClick={() => this.choice(0)}>Rock!</button>
      <button onClick={() => this.choice(1)}>Paper!</button>
      <button onClick={() => this.choice(2)}>Scissors!</button>
    </Box>
    const ready = <button onClick={() => this.ready()}>I am ready!</button>

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
            !this.state.opponentLeft
              ? !this.state.isReady
                ? ready
                : this.state.opponentFound
                  ? this.state.didChoose
                    ? this.state.matchResult
                      ? matchResult
                      : <h1>Your opponent is still thinking...</h1>
                    : buttons
                : <div>
                    <h1>{this.state.name}</h1>
                    <h3>vs</h3>
                    <h1>Looking for opponent...</h1>
                  </div>
              : <h1>Your opponent left the game :(</h1>
          }
      </Flex>
    )
  }
}

export default App
