import io from 'socket.io-client'
const socket = io('http://35.198.152.240/')

export function onStart (callback) {
  socket.on('start', () => callback())
}

export function onOpponentLeft (callback) {
  socket.on('opponent-left', () => callback())
}

export function onAnnouncement (callback) {
  socket.on('announcement', result => callback(result))
}

export function onRoomIsBeingPrepared (callback) {
  socket.on('room-is-being-prepared', result => callback(result))
}

export function emitReadiness () {
  socket.emit('ready')
}

export function emitChoice (shape) {
  socket.emit('choice', shape)
}
