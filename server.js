const express = require("express");
const MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server; 

const uri = "mongodb://localhost:27017/";
const client = new MongoClient(uri);
const app = express();
let animals = []

run();

async function run() {
    try {
        await client.connect();
        const database = client.db("mernApp");
        const collectionAnimals = database.collection("animals");
        animals = await collectionAnimals.find().toArray();
        
    } finally { await client.close(); }
}


let http = require('http');
let handleRequest = async (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    animals.forEach((animal) => {
        response.write(animal.name + "<br>");
    })    

    response.end();
};

http.createServer(handleRequest).listen(3000);