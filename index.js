const { req, res, query } = require('express');
const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ire9p3f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const categoriesCollection = client.db('mobileWorkshop').collection('categories');
        const productsCollection = client.db('mobileWorkshop').collection('products');
        const usersCollection = client.db('mobileWorkshop').collection('users');
        const bookingCollection = client.db('mobileWorkshop').collection('booking');
        app.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollection.find(query).toArray();
            res.send(categories);
        })
        app.get('/products', async (req, res) => {
            const query = {};
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        })
        app.get('/products/:company', async (req, res) => {
            const company = req.params.company;
            const query = { company: company };
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        })
        app.get('/products/:email', async (req, res) => {
            const email = req.params.email;
            let query = { email: email };
            const products = await productsCollection.find(query).toArray();
            res.send(products);
        })
        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await productsCollection.deleteOne(filter);
            res.send(result);
        })


    }
    finally { }
}
run().catch(console.log());;

app.get('/', async (req, res) => {
    res.send('Mobile Workshop is Running')
})

app.listen(port, () => {
    console.log('Mobile Workshop runnig ', port)
});
