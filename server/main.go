package main

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"net/http"
	"sync"

	"golang.org/x/net/websocket"
)

type Message struct {
	client  string
	message string
}

type Client struct {
	identifier string
	ws         *websocket.Conn
}

type Room struct {
	messages chan Message
	mu       *sync.Mutex
	clients  map[string]*Client
}
type Rooms struct {
	rooms map[string]*Room
	mu    *sync.Mutex
}

func main() {
	r := Rooms{
		rooms: make(map[string]*Room),
		mu:    &sync.Mutex{},
	}
	http.Handle("/websocket", websocket.Server{
		Handler: websocket.Handler(func(ws *websocket.Conn) {
			roomID := ws.Request().URL.Query().Get("room")
			clientID := ws.Request().URL.Query().Get("client")
			fmt.Printf("New client %s wants to join room %s\n", clientID, roomID)
			mu := sync.Mutex{}
			var wg sync.WaitGroup
			var room *Room
			r.mu.Lock()
			if _, ok := r.rooms[roomID]; ok {
				fmt.Printf("Room %s already exists, adding client to room \n", roomID)
				room = r.rooms[roomID]
			} else {
				fmt.Printf("Room %s does not exist, creating room \n", roomID)
				room = &Room{
					messages: make(chan Message),
					mu:       &mu,
					clients:  make(map[string]*Client),
				}
				r.rooms[roomID] = room
			}
			r.mu.Unlock()
			id, err := generateRandomString(16)
			if err != nil {
				fmt.Printf("Error generating random string: %s\n", err)
				error, err := json.Marshal(map[string]string{
					"error": "Error generating random string",
				})
				if err != nil {
					fmt.Printf("Error marshalling error message: %s\n", err)
				}
				websocket.Message.Send(ws, string(error))
			}
			fmt.Printf("Client %s does not exist in room %s\n", id, roomID)
			client := &Client{
				identifier: id,
				ws:         ws,
			}
			room.mu.Lock()
			room.clients[id] = client
			room.mu.Unlock()
			fmt.Printf("Creating new client list for room %s\n", roomID)
			wg.Add(1)
			go func() {
				defer wg.Done()
				for {
					if len(room.clients) == 0 {
						if r.rooms[roomID] != nil {
							r.mu.Lock()
							delete(r.rooms, roomID)
							fmt.Printf("Room %s has been deleted because it has %d clients\n", roomID, len(room.clients))
							r.mu.Unlock()
						}
						break
					}
					var msg string
					err := websocket.Message.Receive(client.ws, &msg)
					if msg == "" {
						continue
					}
					if err != nil {
						fmt.Printf("WebSocket connection closed by the client: %s\n", client.identifier)
						if room.clients[client.identifier] != nil {
							err := ws.Close()
							if err != nil {
								fmt.Printf("Error closing websocket connection: %s\n", err)
							}
							room.mu.Lock()
							delete(room.clients, client.identifier)
							room.mu.Unlock()
							fmt.Printf("Room %s has been deleted because it has %d clients\n", roomID, len(room.clients))
							if r.rooms[roomID] != nil {
								fmt.Printf("Client %s deleted from room %s\n", client.identifier, roomID)
								fmt.Printf("Room %s has %d clients\n", roomID, len(room.clients))
							}
						}
					}
					room.messages <- Message{
						client:  client.identifier,
						message: msg,
					}
				}
			}()
			for m := range room.messages {
				if len(room.clients) == 0 {
					if r.rooms[roomID] != nil {
						r.mu.Lock()
						delete(r.rooms, roomID)
						fmt.Printf("Room %s has been deleted because it has %d clients\n", roomID, len(room.clients))
						r.mu.Unlock()
					}
					break
				}
				if m.client == client.identifier {
					continue
				}
				err := websocket.Message.Send(client.ws, m.message)
				if err != nil {
					fmt.Printf("WebSocket connection closed by the client: %s\n", client.identifier)
					fmt.Println(err.Error())
					if room.clients[client.identifier] != nil {
						err := ws.Close()
						if err != nil {
							fmt.Printf("Error closing websocket connection: %s\n", err)
						}
						room.mu.Lock()
						delete(room.clients, client.identifier)
						room.mu.Unlock()
						if r.rooms[roomID] != nil {
							fmt.Printf("Client %s deleted from room %s\n", client.identifier, roomID)
							fmt.Printf("Room %s has %d clients\n", roomID, len(room.clients))
						}
					}

				}
			}
		}),
		Handshake: func(config *websocket.Config, req *http.Request) error {
			if req.URL.Query().Get("room") == "" {
				return fmt.Errorf("Room ID is required")
			}
			if req.URL.Query().Get("client") == "" {
				return fmt.Errorf("Client ID is required")
			}
			return nil
		},
	})

	err := http.ListenAndServe(":5000", nil)
	if err != nil {
		panic("ListenAndServe: " + err.Error())
	}
}
func generateRandomString(length int) (string, error) {
	// Calculate the number of bytes needed to generate the random string
	byteLength := (length * 6) / 8

	// Generate random bytes
	randomBytes := make([]byte, byteLength)
	_, err := rand.Read(randomBytes)
	if err != nil {
		return "", err
	}

	// Convert the random bytes to a base64 string
	randomString := base64.URLEncoding.EncodeToString(randomBytes)

	// Trim any excess characters to match the desired length
	randomString = randomString[:length]

	return randomString, nil
}
