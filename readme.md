# Devansh Rai

# Real-Time Chat Application

This project is a real-time chat application designed to allow multiple clients to communicate over a shared chatroom via a TCP server. The application implements the required features and constraints using Node.js and its built-in `net` module.

---

## Features
1. **Multi-Client Support**: Multiple clients can connect and chat simultaneously in real time.
2. **User Identification**: Each client is prompted for a name when they connect.
3. **Broadcast Messaging**: Messages from a client are broadcast to all other connected clients.
4. **Join/Leave Notifications**: Clients are notified when someone joins or leaves the chat.
5. **Concurrency Handling**: Multiple client connections are managed efficiently using asynchronous I/O.

---

## Prerequisites
- **Node.js**: Install [Node.js](https://nodejs.org/) (v14 or later).
- A terminal for running the server and client instances.

---

## Folder Structure
chat-app/ 
├── server/ 
│ └── server.js # Server code 
├── client/ 
│ └── client.js # Text-based client code 
└── README.md # Documentation

## Setup Instructions

### 1. Start the Server
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
2. Start the server:
    node server.js
3. The server will start listening for client connections on port 3000

### 2. Start the Client
1. Open another terminal and navigate to the client directory:
cd client
2. Start a client instance:
node client.js
3. When prompted, enter your name. You can now start chatting.

Repeat the steps in Start the Client using separate terminal windows for each client instance.
Each client will connect to the server and join the shared chatroom.

### Application Functionality
1. Client Connection
When a client connects to the server, they are asked to provide their name.
The server assigns the name to the client and notifies all other clients about the new connection.
2. Broadcasting Messages
Any message sent by a client is broadcast to all other clients in the chatroom, excluding the sender.
Messages are prefixed with the sender’s name for clarity.
3. Disconnect Handling
When a client disconnects, the server notifies all remaining clients with a "[Client Name] has left the chat." message.

### How Concurrency is Handled
The server handles multiple client connections using asynchronous I/O provided by Node.js's net module. Here’s how it works:

Non-Blocking I/O: The server uses asynchronous event-driven programming to handle multiple client sockets concurrently. Each incoming connection is processed without blocking other connections.

Client Tracking: The server maintains an array of connected clients (clients[]). Each client socket is stored in this array upon connection and removed upon disconnection.

Broadcast Logic:
Messages are sent to all clients in the array except the sender.
This ensures real-time communication among all active clients.
Error Handling: Events like 'error' and 'end' are handled for each client individually, ensuring one client’s issues don’t disrupt others.

Assumptions and Design Choices
1. Assumptions:
The server is hosted locally on 127.0.0.1.
The port number is fixed at 3000.
Clients communicate via a terminal-based text interface.
2. Design Choices:
Socket API: The Node.js net module was chosen to meet the constraints of using the standard socket library for network communication.
Client Name Handling: Names are prompted from users and broadcast along with messages to enhance the chat experience.
Notifications: Join/leave notifications improve usability and provide context to connected users.


### Running Example
Starting the Server:
$ cd server
$ node server.js
Server is running on port 3000

Starting a Client:
$ cd client
$ node client.js
Connected to the server.
Enter your name: Alice
Interaction:
Client A (Alice):

Enter your name: Alice
Bob: Hi Alice!
Alice: Hello, Bob!
Client B (Bob):

Enter your name: Bob
Alice has joined the chat.
Bob: Hi Alice!
Alice: Hello, Bob!
Disconnecting:
If a client disconnects (Ctrl+C):

Server Logs:
Alice disconnected.
Other Clients:
Alice has left the chat.