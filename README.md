# Gateway Database

The system connects to an external database. This system will help solve problems. When you are not able to connect to an external server using a VPN method or another method. The working principle of this program is websocket  server emit event  send to The client (Electron) that is connected to the database. You should have to separate the server folder outside of this app. But which I included because I didn't want to separate positions

## Install

```bash
git clone https://github.com/Anechasun/gateway-database.git
cd gateway-database

npm install
```

## Command

#### Start server

```bash
npm run start-server
```

#### Start app

```bash
npm start
```
#### Start app develop
```bash
npm run start-dev
npm run webpack-w
```

#### Eslints

```bash
npm run lint
```

#### Test
```bash
npm test
```

#### Build App

```bash
npm run build
```

## To use

#### Screen Connect Database

**`Driver`**: Driver database (postgresql, mysql, microsoft-sql-server)

**`Host`**: Server database to connect to

**`Port`**: Port database to connect

**`Username`**: User database to use for authentication

**`Password`**:  Password database to use for authentication

**`Database`**: Database name to connect to (default: dependent on server configuration).

**`Code`**: client code

<img src="resources/screen-connect.png" width="400" height="500" />

#### Server connect to getway
code example [see](https://github.com/Anechasun/gateway-database/blob/master/server/index.js#L21) line 21:30

```bash
curl -X GET \
  'http://localhost:3000/query?sql=SELECT * FROM users'
```
<img src="resources/screen-data.jpg" width="400" height="500" />

