const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/jokes-api',{useNewUrlParser: true, 
useUnifiedTopology: true,

})
.then(()=>{
    console.log('connected to database...');
})
.catch((err)=>{
    console.log(`Error received : ${err}`);
}) 

