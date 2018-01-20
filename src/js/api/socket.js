import io from 'socket.io-client'
const socket = io('http://localhost:3030')

export function onStart (callback) {
  socket.on('start', () => callback())
}

export function onOpponentLeft (callback) {
  socket.on('opponent-left', () => callback())
}

export function onAnnouncement (callback) {
  socket.on('announce', result => callback(result))
}

export function emitReadiness () {
  socket.emit('ready')
}

export function emitChoice (shape) {
  socket.emit('choice', shape)
}
