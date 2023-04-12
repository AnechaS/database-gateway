# Database Gateway

This system is designed to solve the problem of being unable to connect to an external database through VPN or other methods (where the database is not open to the public). It utilizes the TCP protocol to access the database connected to the client-side program that we have developed (the client program). The basic concept is that the user sends a SQL command request through the API, and then the server controls the client-side program connected to the database to execute the SQL command and return the results.

> *เป็นระบบช่วยแก้ปัญหาเมื่อคุณไม่สามารถเชื่อมต่อฐานข้อมูลภายนอกด้วย VPN หรือวิธีอื่นๆได้ (ฐานข้อมูลไม่ได้เปิดเป็น Public) โดยระบบนี้จะใช้ความสามารถของ TCP protocal ในการเข้าถึงฐานข้อมูลที่เชื่อมต่อกับโปรแกรมฝั่งเซิร์ฟเวอร์ที่เราพัฒนา (โปรแกรมฝั่ง Client) ซึ่งหลักการทำงานคือ ผู้ใช้ส่ง Request คำสั่ง SQL ไปทาง API จากนั้น Server ก็จะไปควบคุมโปรแกรมผั่ง Client ที่เชื่อมต่ออยู่กับฐานข้อมูล ให้รันคำสั่ง SQL และนำผลลัพกลับไป*

## Installation

```bash
git clone https://github.com/Anechasun/database-gateway.git
cd database-gateway

npm install
```

## Server

```bash
npm run start-server
```

## Client

```bash
npm start
```

### Create installable app file

```bash
npm run build
```

## Usage

#### 1. Start Server.

#### 2. Start Client app.

#### 3. Set up database in Client app.

**`Driver`**: Database types (postgresql, mysql, microsoft-sql-server)

**`Host`**: Database server.

**`Port`**: Database port.

**`Username`**: Username used to establish the connection.

**`Password`**: Password used to establish the connection.

**`Database`**: Database name.

**`Code`**: Client unique id.

<img src="resources/screen-connect.png" width="400" height="500" />

#### 4. Retrieve data in the database.

This is just a demo API. You can customize it as needed, as shown in this example code [server/index.js](https://github.com/Anechasun/database-gateway/blob/master/server/index.js#L21).

```bash
curl -X GET \
  'http://localhost:3000/query?sql=SELECT * FROM users'
```

<img src="resources/screen-data.jpg" width="400" height="500" />
