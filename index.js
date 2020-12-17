const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./models/dbSetup');

const userRouter = require("./routes/mainRoute");

const app = express();
const PORT = 8080;

//template engine setup
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//static file setup
app.use(express.static(path.join(__dirname,'public')));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//cretate table based on model if table already not exist in database
db.sequelize.sync()

app.use("/users",userRouter);

//addNewUser
app.get('/addNewUser',(req,res)=>{
    res.render('addUser',{title:"Add new user"});
});



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});