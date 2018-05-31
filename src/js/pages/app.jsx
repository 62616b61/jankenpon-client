import React from 'react'
import { Flex, Box } from 'reflexbox'
import {
  emitReadiness,
  emitChoice,
  onStart,
  onGeneratedName,
  onOpponentFound,
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
      gameHasStarted: false,
      opponentName: '',
      opponentFound: false,
      opponentLeft: false,
      matchResult: null,
      score: [0, 0]
    }

    onGeneratedName((name) => this.setState({
      name: name
    }))

    onOpponentFound((name) => this.setState({
      opponentFound: true,
      opponentName: name
    }))

    onStart(() => this.setState({
      gameHasStarted: true
    }))

    onOpponentLeft(() => this.setState({
      opponentLeft: true
    }))

    onAnnouncement(result => {
      this.setState({
        didChoose: false,
        matchResult: result,
        score: [
          result === 'win' ? this.state.score[0] + 1 : this.state.score[0],
          result === 'lose' ? this.state.score[1] + 1 : this.state.score[1]
        ]
      })
    })
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
      didChoose: true,
      matchResult: null
    })
  }

  render () {
    const matchResult = !this.state.matchResult
      ? <h3>Your opponent is still thinking...</h3>
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
    const pvp = <div>
      <h1
        title={'Your name is ' + this.state.name}
        style={{color: 'green'}}
      >
        You
      </h1>
      <h3>vs</h3>
      <h1 style={{
        color: 'red'
      }}>{
        this.state.opponentFound
          ? this.state.opponentName
          : "Looking for opponent..."
      }</h1>
    </div>
    const score = <div>
      <h3>
        <span>Score: </span>
        <span style={{
          color: 'green'
        }}>
          {this.state.score[0]}
        </span>
        <span> : </span>
        <span style={{
          color: 'red'
        }}>
          {this.state.score[1]}
        </span>
      </h3>
    </div>

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
            this.state.isReady
            ? <div>
                {pvp}
                {score}
                {
                  this.state.opponentLeft
                    ? <h1>Your opponent left the game :(</h1>
                    : null
                }
                {
                  !this.state.opponentLeft && this.state.opponentFound && !this.state.didChoose
                    ? this.state.gameHasStarted
                    ? buttons
                    : <h2>Room is being prepared...</h2>
                    : null
                }
                {
                  !this.state.opponentLeft && this.state.didChoose
                    ? this.state.matchResult
                    ? matchResult
                    : <h2>Your opponent is still thinking</h2>
                    : null
                }
              </div>
            : ready
          }
      </Flex>
    )
  }
}

export default App
