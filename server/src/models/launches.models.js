const launchesDatabase = require('./launches.mongo')
const planets = require('./planets.mongo');
const axios = require('axios')

const DEFAULT_FLIGHT_NUMBER =100;

const launches = new Map();


/* const launch = {
    flightNumber : 100, // flight_number
    mission : 'Kepler Exploration X' , // name
    rocket : 'Explorer IS1', // rocket.name
    launchDate: new Date('December 27, 2030'), // date_local
    target: 'Kepler-442 b', //not applocable
    customers : ['NASA ','ZTM'], // payload.customer for each payload
    upcoming : true, // upcoming
    success: true, // success
};

saveLaunches(launch); */

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query'


async function populateLaunches(){
    const response = await axios.post(SPACEX_API_URL,{
        query: {},
        options:{
            pagination:false,
            populate: [
                {
                    path:'rocket',
                    select:{
                        name: 1
                    },

                path:'payloads',
                select:{
                    'customers': 1
                }
                }
            ]
        }

    })

    if (response.status !==200){
        console.log('problem downloading launch data')
        throw new Error('Launch dat kripppkrappp')
    }

    const launchDocs = response.data.docs;
    for(const launchDoc of launchDocs) {
        const payloads = launchDoc['payloads'];
        const customers = payloads.flatMap((payload)=>{
            return payload['customers']
        })
        
        const launch = {
            flightNumber:launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers : customers,
        }
        await saveLaunches(launch)
    }
}

async function loadLaunchData(){
  const firsrLaunc =  await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1 ',
        mission: 'FalconSat'
    })
    if (firsrLaunc) {
        console.log('Launch data already read')
    }else {
        await populateLaunches()
    }
  
}


async function findLaunch(filter){

    return await launchesDatabase.findOne(filter);
}


async function existLaunchWithId(launchId){
    return await findLaunch({
        flightNumber:launchId,
    });
}

async function getLatestFlightNumber(){
    const latestLaunch = await launchesDatabase.findOne ()
    .sort('-flightNumber' );

    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER
    }
    
    return latestLaunch.flightNumber;
}

async function getAllLaunches(skip,limit){
     return await launchesDatabase
     .find({}, {'__id':0 , '__v':0})
     .sort({flightNumber: 1})
     .skip(skip)
     .limit(limit)
}

async function saveLaunches(launch){
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber,
    },launch, {
        upsert:true,
    });

}




async function scheduleNewLaunch(launch){
    const planet = await planets.findOne({
        keplerName: launch.target,
    });

    if(!planet){
        throw new Error('No matching planet found');
    }

    const newFlightNumber = await getLatestFlightNumber()+1;

    const newLaunch = Object.assign(launch, {
                   success : true,
                    upcoming : true,
                    customers :  ['Zero to Mastery', 'Nasa'],
                    flightNumber : newFlightNumber,
                });

    await saveLaunches(newLaunch);
}




//function addNewLaunches(launch) { 
//    latesFlightNumber++
//    launches.set(
//        latesFlightNumber , 
//        Object.assign(launch, {
//            success : true,
//            upcoming : true,
//            customers :  ['Zero to Mastery', 'Nasa'],
//            flightNumber : latesFlightNumber,
//    }));
//}

async function abortLaunchById(launchId){
const aborted = await launchesDatabase.updateOne({
    flightNumber:launchId,
}, {
    upcoming:false,
    success:false,
})
return aborted.modifiedCount === 1;

}

module.exports = {
    getAllLaunches,
     existLaunchWithId,
     abortLaunchById,
     scheduleNewLaunch,
     loadLaunchData
}