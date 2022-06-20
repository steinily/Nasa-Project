const express = require('express');

const { httpgetAllLaunches,httpaddNewLaunches,httpAbortLaunch, } = require('./launches.controller')

const launchesRouter = express.Router();

launchesRouter.get('/', httpgetAllLaunches);
launchesRouter.post('/', httpaddNewLaunches);
launchesRouter.delete('/:id', httpAbortLaunch);

module.exports = launchesRouter