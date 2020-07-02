import express = require('express')
import wrap = require('express-async-error-wrapper')
import Sql = require('../../infra/sql')
import Conta = require('../../models/conta')

const router = express.Router()

router.get('/getAll', wrap(async (req, res) => {
    
    let transactions = await Conta.getAll()

    res.json(transactions)
}))

router.get('/delete/:id', wrap(async (req, res) => {

    const id = parseInt(req.params['id'])

    if (isNaN(id)) { 
        res.status(400).json('Id inválido')
        return
    }

    let err = await Conta.delete(id)

    if (err) {
        res.status(400).json(err)
        return
    }

    res.sendStatus(204)
}))

router.post('/create', wrap(async (req, res) => {

    let transaction = req.body as Conta

    let err = await Conta.create(transaction)

    if(err) {
        res.status(400).json(err)
        return
    }

    res.json(transaction.id)
}))

export = router