/// <reference path="typings/index.d.ts" />

const Jobs = require("./Jobs");
const Spawn = require("./Spawn");
const Towers = require("./Towers");
const Utils = require("./Utils");

Memory.mainSpawn = "BSA";
Memory.mainRoom = "E62S12";
Memory.allJob = null;

Spawn.init();

module.exports.loop = function() {
    // Clear memory
    Utils.clearMemory();

    // Process creeps job
    Jobs.onTick();

    // Create more workers if needed
    Spawn.onTick();

    // Process Towers attack
    Towers.onTick();
}