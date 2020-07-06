const express = require('express')
const app = express()
const port = process.env.port || 3000

app.use(express.json())
let customerArray = [];

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
    let checker = 0;
    let currentCustomer = [];
    req.body.totalBalance = initialBalance;
    for (let i = 0; i < customerArray.length; i++) {
        if (customerId === customerArray[i].customerId) {
            checker = -1
            res.send("Account already exist");
            break;
        }
    }
    if (checker != -1) {
        currentCustomer.push(req.body)
        customerArray.push(req.body)
        res.send({
            output: currentCustomer
        })
    }
})

app.get("/checkbalance/:id", (req, res) => {
    let id = Number(req.params.id)
    let flag = true;
    for (let i = 0; i < customerArray.length; i++) {
        if (customerArray[i].customerId === id) {
            flag = !flag;
            return res.send({
                Available_Balance: customerArray[i].totalBalance
            })
        }
    }
    if (flag === true) {
        res.send("Account did not found")
    }
})

app.post("/deposit/", (req, res) => {
    let {
        customerId,
        depositAmount
    } = req.body
    for (let i = 0; i < customerArray.length; i++) {
        if (customerId == customerArray[i].customerId) {
            customerArray[i].totalBalance += depositAmount
            return res.send({
                Balance: customerArray[i].totalBalance
            })
        } else {
            res.send("Account did not found")
        }
    }
})

app.post("/withdraw", (req, res) => {
    let {
        customerId,
        withdrawalAmount,
    } = req.body
    for (let i = 0; i < customerArray.length; i++) {
        if (customerId === customerArray[i].customerId && withdrawalAmount <= customerArray[i].totalBalance) {
            customerArray[i].totalBalance -= withdrawalAmount
            return res.send({
                Remaining_Balance: customerArray[i].totalBalance
            })
        } else if (customerId === customerArray[i].customerId && withdrawalAmount > customerArray[i].totalBalance) {
            return res.send("No sufficient Balance")
        } else {
            res.send("Account did not found")
        }
    }
})

app.get("/getInfo/:id", (req, res) => {
    let id = Number(req.params.id)
    for (let i = 0; i < customerArray.length; i++) {
        if (id === customerArray[i].customerId) {
            return res.send({
                Data: customerArray[i]
            })
        } else {
            res.send("Account did not found")
        }
    }
})

app.get("/getAllInfo", (req, res) => {
    if (customerArray === undefined || customerArray.length === 0) {
        return res.send("No users found or data undefined")
    } else {
        res.send(customerArray)
    }
})

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))