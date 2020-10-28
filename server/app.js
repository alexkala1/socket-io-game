const express = require("express")
const http = require("http").Server(express)
const socketio = require("socket.io")(http)
const initializeDeck = require("./deck")

const position = {
	x: 200,
	y: 200
}

const deck = initializeDeck();

socketio.on("connection", socket => {
	socket.emit("position", position)
	socket.emit("game_start", deck)

	socket.on("move", data => {
		switch(data) {
			case "left":
				position.x -= 5
				socketio.emit("position", position)
				break
			case "right":
				position.x += 5
				socketio.emit("position", position)
				break
			case "up":
				position.y -= 5
				socketio.emit("position", position)
				break
			case "down":
				position.y += 5
				socketio.emit("position", position)
				break
		}
	})
})

http.listen(3000, () => {
	console.log("Server started at 3000.")
})
