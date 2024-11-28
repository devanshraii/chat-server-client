const net = require('net');

const PORT = 3000;
const clients = [];

const server = net.createServer((socket) => {
    console.log('Client connected');
    socket.write('Welcome! Please enter your name: ');

    // Initialize client info
    socket.clientName = null;

    // Handle incoming data
    socket.on('data', (data) => {
        const message = data.toString().trim();

        // If client hasn't set a name, treat the first message as their name
        if (!socket.clientName) {
            socket.clientName = message;
            console.log(`${socket.clientName} has joined the chat.`);
            broadcast(`${socket.clientName} has joined the chat.`, socket);
        } else {
            console.log(`${socket.clientName}: ${message}`);
            broadcast(`${socket.clientName}: ${message}`, socket);
        }
    });

    // Handle client disconnect
    socket.on('end', () => {
        console.log(`${socket.clientName || 'A client'} disconnected.`);
        broadcast(`${socket.clientName || 'A client'} has left the chat.`, socket);
        clients.splice(clients.indexOf(socket), 1);
    });

    // Handle errors
    socket.on('error', (err) => {
        console.error(`Error: ${err.message}`);
    });

    // Add the client to the list
    clients.push(socket);
});

// Broadcast a message to all clients except the sender
function broadcast(message, sender) {
    clients.forEach((client) => {
        if (client !== sender) {
            client.write(message);
        }
    });
}

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
