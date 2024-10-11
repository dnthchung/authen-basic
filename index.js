const express = require('express')
const app = express()
const port = 3000

// Hàm xác thực Basic Authentication
function authenticate(req, res, next) {
    const authHeader = req.headers.authorization

    console.log(authHeader) // Basic dXNlcm5hbWU6cGFzc3dvcmQ=

    if (authHeader) {
        // Giải mã chuỗi base64
        const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':')
        const username = auth[0]
        const password = auth[1]

        if (username === 'admin' && password === 'meomeo') {
            return next()
        }
    }

    // WWW-Authenticate sẽ giúp trình duyệt hiển thị popup đăng nhập
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.status(401).send('Authentication required')
}

// Sử dụng hàm xác thực cho tất cả các route
app.use(authenticate)

// Route chào mừng
app.get('/', (req, res) => {
    res.send('Chào mừng bạn đến với ứng dụng Node.js sử dụng Basic Authentication!')
})

// Khởi chạy máy chủ
app.listen(port, () => {
    console.log(`Máy chủ đang chạy tại http://localhost:${port}`)
})
