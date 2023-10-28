const {v4 : uuidv4} = require('uuid')
const express = require("express");
const router = express.Router();
router.use(express.json());

const stripe=require("stripe")("sk_test_51O6DtGABEMRaYOZGjp4uov4debp9o5CpAX0BUOjeg4WxOsHGJlVhaAhIULMOEJ8Mi8hHYwR4uibcnP1fkVYatxfL00zOKTzLQr")

router.post("/placeorder", async(req, res) => {

    const {token , articles , currentUser , total} = req.body

    if(!token && !articles && !total) {
        return res.status(500).json({message : 'NO DATA'});
    }
    
    const customer = await stripe.customers.create({
        email : token.email , 
        source : token.id
    })

    const payment = await stripe.charges.create({
          amount : total*100 , 
          currency : 'eur' , 
          customer : customer.id , 
          receipt_email : token.email
    } 
    , {
        idempotencyKey: uuidv4()
    })

    if(payment){
        res.send('Payment Successfull')
    }else{
        return res.status(400).json({message : 'Payment Failed'});
    }
});


module.exports = router