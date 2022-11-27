const { req, res } = require('express');
const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

app.use(cors());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ire9p3f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const categoriesCollectio = client.db('mobileWorkshop').collection('categories');
        const productsCollection = client.db('mobileWorkshop').collection('products');
        app.get('/categories', async (req, res) => {
            const query = {};
            const categories = await categoriesCollectio.find(query).toArray();
            res.send(categories);
        })
        app.post('/products', async (req, res) => {
            const query = {};
            const products = await categoriesCollectio.find(query).toArray();
            res.send(products);
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
