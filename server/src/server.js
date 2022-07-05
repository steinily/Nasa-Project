const http = require('http');
const app = require('./app');
const { loadPlanetsData, } = require('./models/planets.models')
<<<<<<< Updated upstream
const { mongoConnecnt } = require('./services/mongo')

const PORT = process.env.PORT || 8000;
=======
const mongoose=require('mongoose')

let MONGO_URL="mongodb://steinily:samsung@172.21.0.1:8080/"

const PORT = process.env.PORT || 8000;



>>>>>>> Stashed changes
const server = http.createServer(app);


async function startServer(){
<<<<<<< Updated upstream
    await mongoConnecnt();    
=======
    await mongoose.connect(MONGO_URL)
>>>>>>> Stashed changes
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
