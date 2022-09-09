const mongoose = require('mongoose')

let MONGO_URL=process.env.MONGO_URL


mongoose.connection.once('open', () => {
    console.log('Mongose connection ready!')
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnecnt(){
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect(){
    await mongoose.disconnect();
}
module.exports = {
    mongoConnecnt,
    mongoDisconnect,
}