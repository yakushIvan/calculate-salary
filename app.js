const express = require('express')
const app = express()

const calculateGross = (net, tax, extraTax) => {
    const gross = Math.ceil((Number(net) + Number(extraTax)) / (1 - (tax / 100)))
    return {
        net,
        tax: `${tax}%`,
        extraTax,
        gross
    }
}

const calculateNet = (gross, tax, extraTax) => {
    const net = Math.ceil((1 - (Number(tax) / 100)) * Number(gross) - Number(extraTax))
    return {
        gross,
        tax: `${tax}%`,
        extraTax,
        net
    }
}

app.get('/', (req, res) => {
    res.send('This is Pure Endpoint')
})

app.get('/gross/:net/:tax/:extraTax', (req, res) => {
    const { net, tax, extraTax } = req.params
    const gross = calculateGross(net, tax, extraTax)
    res.send(gross)
})

app.get('/net/:gross/:tax/:extraTax', (req, res) => {
    const { gross, tax, extraTax } = req.params
    const net = calculateNet(gross, tax, extraTax)
    res.send(net)
})


app.listen(3000, () => console.log('Server has been started on port 3000...'))