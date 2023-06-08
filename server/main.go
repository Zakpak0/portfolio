package main

import (
	"fmt"
	"net/http"

	"golang.org/x/net/websocket"
)

type Client struct {
	ws         *websocket.Conn
	identifier string
}

type Room struct {
	clients   map[string]*Client
	broadcast chan string
}

func main() {
	rooms := make(map[string]*Room)
	http.Handle("/websocket", websocket.Handler(func(ws *websocket.Conn) {
		fmt.Println("New WebSocket connection", ws)
		roomID := ws.Request().URL.Query().Get("room")
		clientID := ws.Request().URL.Query().Get("client")

		room := getOrCreateRoom(roomID, rooms)
		var client *Client
		if room.clients[clientID] != nil {
			room.clients[clientID].ws.Close()
			room.clients[clientID] = &Client{
				ws:         ws,
				identifier: clientID,
			}
			client = room.clients[clientID]
		} else {
			room.clients[clientID] = &Client{
				ws:         ws,
				identifier: clientID,
			}
			client = room.clients[clientID]
		}
		room.broadcast <- fmt.Sprintf("New user joined the room: %s", client.identifier)

		go handleWebSocketConnection(client, room)
	}))

	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		panic("ListenAndServe: " + err.Error())
	}
}

func getOrCreateRoom(roomID string, rooms map[string]*Room) *Room {
	if room, ok := rooms[roomID]; ok {
		return room
	}

	room := &Room{
		clients:   make(map[string]*Client),
		broadcast: make(chan string),
	}
	rooms[roomID] = room

	go func() {
		for {
			message := <-room.broadcast
			for _, client := range room.clients {
				err := websocket.Message.Send(client.ws, message)
				if err != nil {
					fmt.Println("Error sending message:", err)
				}
			}
		}
	}()

	return room
}

func handleWebSocketConnection(client *Client, room *Room) {
	// for {
	// 	var message string
	// 	err := websocket.Message.Receive(client.ws, &message)
	// 	if err != nil {
	// 		if err == io.EOF {
	// 			fmt.Printf("WebSocket connection closed by the client: %s\n", client.identifier)
	// 		} else {
	// 			fmt.Println("Error receiving message:", err)
	// 		}
	// 		break
	// 	}

	// 	room.broadcast <- fmt.Sprintf("[%s]: %s", client.identifier, message)
	// }
	fmt.Print("Closing WebSocket connection...")
	fmt.Print(client.ws.IsClientConn())
	// delete(room.clients, client)
	// client.ws.Close()
	// room.broadcast <- fmt.Sprintf("User left the room: %s", client.identifier)
}
