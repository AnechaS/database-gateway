# API Gateway Database

เป็นระบบช่วยแก้ปัญหาเมื่อคุณไม่สามารถเชื่อมต่อฐานข้อมูลภายนอกด้วย VPN หรือวิธีอื่นๆได้ (ฐานข้อมูลไม่ได้เปิดเป็น Public) โดยระบบนี้จะใช้ความสามารถของ [TCP protocal](https://en.wikipedia.org/wiki/Transmission_Control_Protocol) ในการเข้าถึงฐานข้อมูลที่เชื่อมต่อกับโปรแกรมฝั่งเซิร์ฟเวอร์ที่เราพัฒนา (โปรแกรมฝั่ง Client) ซึ่งหลักการทำงานคือ ผู้ใช้ส่ง Request คำสั่ง SQL ไปทาง API จากนั้น Server ก็จะไปควบคุมโปรแกรมผั่ง Client ที่เชื่อมต่ออยู่กับฐานข้อมูล ให้รันคำสั่ง SQL และนำผลลัพกลับไป

This system will help solve the problem. When you are unable to connect to an external server using VPN or other methods, using the [TCP protocol] capability to access the database connected to the client-side program.

## Command

### Install

```bash
git clone https://github.com/Anechasun/api-gateway-database.git
cd api-gateway-database

npm install
```

### Run API Server 

```bash
npm run start-server
```

### Start Client app for develop

```bash
npm start
```

### Build Client app to file install

```bash
npm run build
```


## To use

#### 1. Run API Server

#### 2. Open the Client app and Configure the database.

**`Driver`**: Database types (postgresql, mysql, microsoft-sql-server)

**`Host`**: Database server.

**`Port`**: Database port.

**`Username`**: Username used to establish the connection.

**`Password`**:  Password used to establish the connection.

**`Database`**: Database name.

**`Code`**: Client unique id.

<img src="resources/screen-connect.png" width="400" height="500" />

#### 3. Send request to server

this example api [see](https://github.com/Anechasun/gateway-database/blob/master/server/index.js#L21)

```bash
curl -X GET \
  'http://localhost:3000/query?sql=SELECT * FROM users'
```
<img src="resources/screen-data.jpg" width="400" height="500" />

