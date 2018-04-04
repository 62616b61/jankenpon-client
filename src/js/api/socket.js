import io from 'socket.io-client'

const ip = process.env.RUNTIME === 'raspi'
  ? '192.168.1.101:30303'
  : '35.198.154.33'
const socket = io(ip)

export function onStart (callback) {
  socket.on('start', () => callback())
}

export function onOpponentLeft (callback) {
  socket.on('opponent-left', () => callback())
}

export function onAnnouncement (callback) {
  socket.on('announcement', result => callback(result))
}

export function onOpponentFound (callback) {
  socket.on('opponent-found', result => callback(result))
}

export function onGeneratedName (callback) {
  socket.on('generated-name', result => callback(result))
}

export function emitReadiness () {
  socket.emit('ready')
}

export function emitChoice (shape) {
  socket.emit('choice', shape)
}
