const mongoose = require('mongoose');
const app = require('./index')


const PORT = process.env.PORT || 5000

// const URL = 'mongodb://mymongo:27017/test'
const URL = null;
mongoose.connect( URL || process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`server is running on ${PORT}`)))
    // .catch((error)=>console.log('connection error'));
    .catch((error)=>console.log(error.message))
mongoose.set('useFindAndModify',false);

module.exports = app;

// /test 