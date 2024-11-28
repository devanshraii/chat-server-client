const net = require('net');
const readline = require('readline');

const HOST = '127.0.0.1';
const PORT = 3000;

const client = net.createConnection(PORT, HOST, () => {
    console.log('Connected to the server.');

    // Prompt the user for a name
    rl.question('Enter your name: ', (name) => {
        client.write(name); // Send the name to the server
    });
});

// Set up readline for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '',
});

// Display messages from the server
client.on('data', (data) => {
    console.log(`\n${data}`);
    rl.prompt();
});

// Handle client disconnection
client.on('end', () => {
    console.log('Disconnected from the server.');
    process.exit(0);
});

// Handle errors
client.on('error', (err) => {
    console.error(`Error: ${err.message}`);
    process.exit(1);
});

// Handle user input
rl.on('line', (line) => {
    client.write(line);
});
