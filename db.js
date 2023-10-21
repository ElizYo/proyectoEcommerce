const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://yohana:Selena123@cluster0.dz14hzm.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(db => console.log("DB is connected!"))
.catch(err => console.log(err));
