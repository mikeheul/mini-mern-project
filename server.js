const express = require("express");
const MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server; 
const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const app = express();

let animals = []

async function run() {
    try {
        await client.connect();
        const database = client.db("mernApp");
        const collectionAnimals = database.collection("animals");
        animals = await collectionAnimals.find().toArray();
        
    } finally {
        await client.close();
    }
}

run()

let http = require('http');
let handleRequest = async (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    await animals.forEach((animal) => {
        response.write(animal.name + "<br>");
    })    

    response.end();
    // 
};

http.createServer(handleRequest).listen(3000);


//1
// var http = require('http');

// //2 
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('<html><body><h1>Hello World</h1></body></html>');
// }).listen(3000);
 
// console.log('Server running on port 3000.');