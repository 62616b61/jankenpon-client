import React from 'react'
import { Flex, Box } from 'reflexbox'

import {
  emitChoice,
  onGeneratedName,
  onOpponentConnected,
  onOpponentLeft,
  onAnnouncement
} from '../api/gameApi'

class Game extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      name: '',
      opponentName: '',
      opponendConnected: false,
      opponentLeft: false,
      didChoose: false,
      matchResult: null,
      score: [0, 0]
    }

    onGeneratedName((name) => this.setState({
      name: name
    }))

    onOpponentConnected((name) => this.setState({
      opponentConnected: true,
      opponentName: name
    }))

    onOpponentLeft(() => {
      this.setState({
        opponentLeft: true
      })
    })

    onAnnouncement(result => this.setState({
      didChoose: false,
      matchResult: result,
      score: [
        result === 'win' ? this.state.score[0] + 1 : this.state.score[0],
        result === 'lose' ? this.state.score[1] + 1 : this.state.score[1]
      ]
    }))
  }

  choice (shape) {
    emitChoice(shape)
    this.setState({
      didChoose: true,
      matchResult: null
    })
  }

  newGame () {
    this.props.onGameEnded()
  }

  render () {
    const pvp = <Box>
      <h1 title={'Your name is ' + this.state.name} style={{ color: 'green' }}>
        You
      </h1>
      <h3>vs</h3>
      <h1 style={{ color: 'red' }}>{
        this.state.opponentConnected
          ? this.state.opponentName
          : "Looking for opponent..."
      }</h1>
    </Box>
    const buttons = <Box>
      <button onClick={() => this.choice(0)}>Rock!</button>
      <button onClick={() => this.choice(1)}>Paper!</button>
      <button onClick={() => this.choice(2)}>Scissors!</button>
    </Box>
    const score = <Box>
      <h3>
        <span>Score: </span>
        <span style={{ color: 'green' }}>
          {this.state.score[0]}
        </span>
        <span> : </span>
        <span style={{ color: 'red' }}>
          {this.state.score[1]}
        </span>
      </h3>
    </Box>

    return (
      <div>
        {pvp}
        {score}
        {
          this.state.opponentLeft
            ? (
              <Box>
                <h1>Your opponent left the game :(</h1>
                <button onClick={() => this.newGame()}>Find new player?</button>
              </Box>
            )
            : null
        }
        {
          !this.state.opponentLeft &&
          this.state.opponentConnected &&
          !this.state.didChoose
            ? buttons
            : <h2>Room is being prepared...</h2>
        }
        {
          !this.state.opponentLeft && this.state.didChoose
            ? this.state.matchResult
            ? matchResult
            : <h2>Your opponent is still thinking</h2>
            : null
        }
      </div>
    )
  }
}

export default Game
