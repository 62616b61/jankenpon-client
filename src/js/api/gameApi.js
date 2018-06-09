import io from 'socket.io-client'

const socket = io('localhost:3001')

export function onGeneratedName (callback) {
  socket.on('generated-name', result => callback(result))
}

export function onOpponentConnected (callback) {
  socket.on('opponent-connected', result => callback(result))
}

export function onOpponentLeft (callback) {
  socket.on('opponent-left', result => callback(result))
}

export function onAnnouncement (callback) {
  socket.on('announcement', result => callback(result))
}

export function emitChoice (shape) {
  socket.emit('choice', shape)
}
