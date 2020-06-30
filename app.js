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
    req.body.totalBalance = initialBalance;

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
    let flag = true;
    for (i = 0; i < customerArray.length; i++) {
        if (customerArray[i].customerId === id) {
            flag = !flag;
            return res.send({
                Balance: customerArray[i].totalBalance
            })
        }
    }

    if (flag === true) {
        res.send("Account doesnot exist")
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


    res.send(totalBalance)
})

app.get("/withdraw", (req, res) => {
    let {
        customerId,
        withdrawalAmount,
    } = req.body

    for (let i = 0; i < customerArray.length; i++) {
        if (customerId === customerArray[i].customerId) {
            customerArray[i].totalBalance -= withdrawalAmount
            return res.send({
                RemainingBalance: customerArray[i].totalBalance
            })
        } else {
            res.send("Account did not found")
        }
    }
    res.send()
})

app.get("/getInfo/:id", (req, res) => {
    let id = Number(req.params.id)
    const result = customerArray.find(element => element.customerId === id)
    res.send(result)
})

app.get("/getAllInfo", (req, res) => {
    res.send(customerArray)
})

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))