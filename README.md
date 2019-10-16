# Gateway Database

ระบบดึงข้อมูล Database ภายนอก ระบบนี้จะช่วยแก้ปัญหา เมือคุณไม่สามารถเชื่อมต่อกับ server ภายนอกได้ด้วยวิธี VPN และวิธีอืนๆ หลักการทำงานของโปรแกรมนี้ จะให้ server TCP ควบคุมตัวโปรแกรม Electron ที่ได้เชื่อมต่อกับ database ให้ทำการดึงข้อมูลตามที่ server ได้ส่ง Sql ไป

## การติดตั้ง

```bash
git clone https://github.com/Anechasun/gateway-database.git
cd gateway-database

npm install
```

## Structure

```bash
├── database                #
├── renderer                # renderer
│   ├── components          # react component
│   ├── styles              #
│   ├── index.html          #
│   └── index.jsx           #
├── resources               # asset Media, etc
├── tests                   # Testing
├── server                  # mock server
├── utils                   # utility (formats, validation, etc)
├── Memory.js               # class sqlite
└── main.js                 # app
└── webpack.config.js       # webpack setting
```

## เซิร์ฟเวอร์

อันที่จริง server ควรไปติดตั้งอยู่ที่ server ที่คุณต้องการ แต่ผมให้มันอยู่ใน project นี้เพราะผมไม่ต้องแยก Repo ออกจากกันและทำให้การทำสอบแอพงานขึ้น

```bash
npm run start-server
```

## client

client ก็คือตัวโปรแกรม ที่เชื่มต่ออยู่กับ database

```bash
# production
npm start

# development
npm run start-dev

# build .EXE
npm run build
```

## ตัวอย่างการเรียกใช้งาน

โค้ดส่งคำสั่งให้ Client ดึงข้อมูล จาก Database [ดูตัวอย่าง](https://github.com/Anechasun/gateway-database/blob/master/server/index.js#L36)

```bash
curl -X GET \
  'http://localhost:3000/query?sql=SELECT * FROM users'
```

### Screen Connect Database

<img src="resources/screen-connect.png" width="400" height="500" />

### Server Server Query

<img src="resources/screen-data.jpg" width="400" height="500" />

