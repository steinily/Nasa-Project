const launches = new Map();

let latesFlightNumber = 100;

const launch = {
    flightNumber : 100,
    mission : 'Kepler Exploration X' , 
    rocket : 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    target: 'Kepler-442 b',
    customer : ['NASA ','ZTM'],
    upcoming : true,
    success: true,
};

launches.set(launch.flightNumber, launch)

function existLaunchWithId(launchId){
    return launches.has(launchId)
}

function getAllLaunches(){
    return Array.from(launches.values())
}

function addNewLaunches(launch) { 
    latesFlightNumber++
    launches.set(
        latesFlightNumber , 
        Object.assign(launch, {
            success : true,
            upcoming : true,
            customers :  ['Zero to Mastery', 'Nasa'],
            flightNumber : latesFlightNumber,
    }));
}

function abortLaunchById(launchId){
    const aborted = launches.get(launchId)
    aborted.upcoming = false;
    aborted.success  = false;
    return aborted;
}

module.exports = {
    getAllLaunches,
     addNewLaunches,
     existLaunchWithId,
     abortLaunchById,
}