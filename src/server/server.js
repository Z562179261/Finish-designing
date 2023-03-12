const express = require("express")
const mysql = require("mysql")
const cors = require("cors")
const os = require("os")
//连接数据库
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin123',
    database: 'data'
})

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

// 查找 IPv4 地址
let ip = "localhost";
const networkInterfaces = os.networkInterfaces()
if (networkInterfaces.WLAN) {
    for (const item of networkInterfaces.WLAN) {
        if (item.family === 'IPv4') {
            console.log(item.address)
            ip = item.address
            break
        }
    }
}

//验证登录
app.get("/", (req, res) => {
    const { name, password } = req.query
    const queryStr = `select * from users where username = '${name}' and password = '${password}'`
    db.query(queryStr, function (err, result) {
        if (err) return console.log(err)
        if (result[0]) {
            res.send(result[0])
        } else {
            res.send(false)
        }
    })
})

//注册用户
app.post("/", (req, res) => {
    const { name, phone, email, password } = req.body
    const queryStr = `insert into users (username,phone,email,password) values ('${name}','${phone}','${email}','${password}')`
    db.query(queryStr, function (err) {
        if (err) res.send(err)
        else {
            res.send(true)
        }
    })

})

//Index页面展示信息
app.get("/regionarticle", (req, res) => {
    const queryStr = `select * from  regionarticle `
    db.query(queryStr, (err, result1) => {
        if (err) return console.log(err)
        db.query("select * from  vendor", (err, result2) => {
            if (err) return console.log(err)
            res.send([result1, result2])
        })
    })
})

//获取个人基本信息
app.get("/getUser", (req, res) => {
    let id = req.query.id
    const queryStr = `SELECT * FROM data.users where id = '${id}'`
    db.query(queryStr, (err, result) => {
        if (err) return console.log(err);
        res.send(result)
    })
})

//获取所有个人基本信息
app.get("/getAlluser", (req, res) => {
    let id = req.query.id
    const queryStr = `SELECT * FROM data.users`
    db.query(queryStr, (err, result) => {
        if (err) return console.log(err);
        res.send(result)
    })
})

//更新用户的个人信息
app.post("/updateUser", (req, res) => {
    const { id, username, phone, email, password } = req.body.userdata
    const queryStr = `update users set username='${username}',password='${password}',phone='${phone}',email='${email}'  where id='${id}'`
    db.query(queryStr, (err, result) => {
        if (err) res.send(err)
        else res.send("更新成功")
    })
})
//更新用户的状态信息
app.post("/updateUserStatus", (req, res) => {
    const { id, status } = req.body
    const queryStr = `update users set status='${status}' where id='${id}'`
    db.query(queryStr, (err, result) => {
        if (err) res.send(err)
        else res.send("更新成功")
    })
})



//删除用户的个人账号
app.post("/deleteUser", (req, res) => {
    const { id } = req.body
    const queryStr = ` delete from users where id=${id}`
    db.query(queryStr, (err, result) => {
        if (err) return console.log(err);
        res.send("删除成功")
    })
})

//获取类型和公司和地区
// app.get("/getClass", (req, res) => {
//     db.query("SELECT * FROM regionclass", (err, d1) => {
//         if (err) return console.log(err);
//         db.query("SELECT * FROM province", (err, d2) => {
//             if (err) return console.log(err);
//             db.query("SELECT * FROM vendor", (err, d3) => {
//                 if (err) return console.log(err);
//                 res.send([d1, d2, d3])
//             })
//         })
//     })
// })

app.get("/getClass", async (req, res) => {
    // db.query("SELECT * FROM regionclass", (err, d1) => {
    //     if (err) return console.log(err);
    //     db.query("SELECT * FROM province", (err, d2) => {
    //         if (err) return console.log(err);
    //         db.query("SELECT * FROM vendor", (err, d3) => {
    //             if (err) return console.log(err);
    //             res.send([d1, d2, d3])
    //         })
    //     })
    // })
    const test = (str) => {
        return new Promise((resolve, reject) => {
            db.query(str, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    let data1 = await test("SELECT * FROM regionclass")
    let data2 = await test("SELECT * FROM province")
    let data3 = await test("SELECT * FROM vendor")
    res.send([data1, data2, data3])
})


//增加表数据
app.post("/add", (req, res) => {
    const { name, number, price, region, vendor } = req.body.newData
    const queryStr = `insert into regionarticle (class,name,number,price,region,vendor)  values ('${req.body.newData.class}','${name}','${number}','${price}','${region}','${vendor}')`
    db.query(queryStr, (err, result) => {
        if (err) return console.log(err);
        res.send('添加完成')
    })

})
//查询数据 
app.post("/queryData", (req, res) => {
    const { method, queryParams } = req.body
    let query = ""
    if (method === "物资类型") {
        query = "class"
    } else if (method === "地区") {
        query = "region"
    } else {
        query = "vendor"
    }
    const queryStr = `select * from regionarticle where ${query} like '%${queryParams}%'`
    db.query(queryStr, (err, result) => {
        if (err) return console.log(err)
        res.send(result)
    })
})
//修改表数据
app.post("/updataData", (req, res) => {
    const { noid, name, number, price, region, vendor } = req.body
    const queryStr = `update regionarticle set class='${req.body.class}',name='${name}',number='${number}',price='${price}',region='${region}',vendor='${vendor}'  where id='${id}'`
    db.query(queryStr, (err) => {
        if (err) return console.log(err)
        res.send("更新成功")
    })
})

app.get("/removeData", (req, res) => {
    const { id } = req.query
    console.log(id);
    const queryStr = ` delete from regionarticle where id=${id}`
    db.query(queryStr, (err) => {
        if (err) return console.log(err)
        res.send("删除成功")
    })
})
//添加留言
app.post("/msg", (req, res) => {
    const { id, name, msg, date } = req.body
    const queryStr = `insert into message (id,name,msg,date)  values ('${id}','${name}','${msg}','${date}')`
    db.query(queryStr, (err, result) => {
        if (err) return console.log(err)
        res.send(true)
    })
})

//获取留言
app.get("/getmsg", (req, res) => {
    const queryStr = 'select * from  message order by date desc'
    db.query(queryStr, (err, result) => {
        if (err) return console.log(err)
        res.send(result)
    })
})
//
app.post("/deleteMsg", (req, res) => {
    const date = req.body.date
    const queryStr = `delete from message where date="${date}"`
    db.query(queryStr, (err, result) => {
        if (err) return console.log(err)
        res.send(true)
    })
})


//开启服务
let server = app.listen(80, function () {
    let host = server.address().address
    let port = server.address().port
    console.log("应用实例,访问地址为http://%s:%s", ip, port)
})