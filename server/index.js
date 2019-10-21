const http = require('http');
const express = require('express');
const sockets = require('socket.io')();
const clients = {};

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Wellcome Gateway database');
});

app.get('/available/:key', (req, res) => {
    const { key } = req.params;

    return res.json({
        isAvailable: typeof clients[key] !== 'undefined',
    });
});

app.get('/query', (req, res) => {
    const keys = Object.keys(clients);
    const client = clients[keys[0]];
    if (typeof client !== 'undefined') {
        const { sql } = req.query;
        return o.connected[client].emit('query', sql, results => {
            return res.json(results);
        });
    }
});

app.get('/request', (req, res) => {
    const keys = Object.keys(clients);
    const client = clients[keys[0]];
    if (typeof client !== 'undefined') {
        const url = 'https://api.github.com/users/whatever?client_id=xxxx&client_secret=yyyy';
        return o.connected[client].emit(
            'request',
            {
                url,
                method: 'GET',
                json: true,
            },
            (error, body) => {
                if (error) {
                    res.json({ error: new Error(error) });
                }

                return res.json(body);
            }
        );
    }
    res.json({ error: 'not available' });
});

const server = http.createServer(app);

server.listen(3000, () => {
    console.log('listening on *:3000');
});

const o = sockets.of('/');
o.on('connect', socket => {
    socket.on('new partner', async (id, callback) => {
        let err = true;
        const isExist = true;

        if (isExist) {
            err = false;
            clients[id] = socket.id;

            console.log(`connect partner ${id}`);
        }

        if (callback) {
            callback(err);
        }
    });

    socket.on('disconnect', () => {
        let i;
        for (const key in clients) {
            if (clients.hasOwnProperty(key)) {
                const client = clients[key];
                if (client === socket.id) {
                    i = key;
                }
            }
        }

        console.log(`disconnect client ${clients[i]}`);

        if (typeof i !== 'undefined') {
            delete clients[i];
        }
    });
});

sockets.listen(server);
