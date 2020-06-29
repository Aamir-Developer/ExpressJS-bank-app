const express = require('express')
const app = express()
const port = process.env.port || 3000

app.use(express.json())
let customerArray = [];
let checker = 0;
let flag = true;

app.get("/home", (req, res) => {
    res.send("Welcome to the Online Banking")
})

app.post("/newaccount", (req, res) => {
    let {
        customerName,
        customerId,
        customerAge,
        initialBalance
    } = req.body

    for (i = 0; i < customerArray.length; i++) {
        if (customerId === customerArray[i].customerId) {
            checker = -1
            res.send("Account already exist");
            break;
        }
    }
    if (checker != -1) {
        customerArray.push(req.body)
        res.send(customerArray)
    }
})

app.get("/checkbalance/:id", (req, res) => {
    let id = Number(req.params.id)
    for (i = 0; i < customerArray.length; i++) {
        if (customerArray[i].customerId === id) {
            flag != true;
            res.send(customerArray[i].initialBalance)
            break;
        }
    }
    if (flag = true) {
        res.send("Account doesnot exist")
    }
})

app.post("/deposit/", (req, res) => {
    let {
        customerId,
        depositAmount
    } = req.body

    let totalBalance = 0
    if (customerId == customerArray.customerId) {
        totalBalance += depositAmount
    } else {
        res.send("Account did not found")
    }


    res.send(totalBalance)
})

app.get("/withdraw", (req, res) => {
    res.send("withdrawal")
})

app.get("/getInfo/:id", (req, res) => {
    let id = Number(req.params.id)
    const result = customerArray.find(element => element.customerId === id)
    res.send(result)
})

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))