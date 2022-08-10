const http = require('http');
const app = require('./app');
const server = http.createServer(app);
const { loadPlanetsData, } = require('./models/planets.models')

const { mongoConnecnt } = require('./services/mongo')

const PORT = process.env.PORT || 8000;

const mongoose=require('mongoose')

let MONGO_URL="mongodb+srv://admin:ZCsuaTRe4CUKWhoM@cluster0.l9bne.mongodb.net/?retryWrites=true&w=majority"




async function startServer(){

    await mongoConnecnt();    
    await mongoose.connect(MONGO_URL)
    await loadPlanetsData();
    server.listen(PORT , () => {
        console.log(` Listening on port ${PORT}...`)
})
}



startServer();


mongoose.connection.once("open" , () => {
    console.log('MongoDB connection ready!')
})

mongoose.connection.on('error' , (err) => {
    console.error(err);
})
