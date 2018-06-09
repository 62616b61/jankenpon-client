import io from 'socket.io-client'

const socket = io('localhost:3030')

//export function onGeneratedName (callback) {
  //socket.on('generated-name', result => callback(result))
//}

export function onOpponentFound (callback) {
  socket.on('opponent-found', result => callback(result))
}

export function onRoomIsReady (callback) {
  socket.on('room-is-ready', result => callback(result))
}

export function disconnect (callback) {
  socket.disconnect()
}
