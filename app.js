const express = require("express");//Import express module
// const fs = require("fs");
const path = require("path");
const app = express();//app is initialized by express
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}
const port = 8000;

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

//Express Specific Stuff
app.use('/static', express.static('static'))//For serving static files
app.use(express.urlencoded())

//Pug Specific Stuff
app.set('view engine', 'pug')//set the template engine as pug
app.set('views', path.join(__dirname, 'views'))//Set the views directory

//Endpoints
app.get('/', (req, res) => {
    const para = {}
    res.status(200).render('home.pug', para)
})

app.get('/contact', (req, res) => {
    const para = {}
    res.status(200).render('contact.pug', para)
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})