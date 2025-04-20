const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


//Inicializamos
dotenv.config();

const app = express();

app.use(express.json());

//Endpoints
