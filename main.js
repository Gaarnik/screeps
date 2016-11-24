/// <reference path="typings/index.d.ts" />

const Jobs = require("./Jobs");
const Spawn = require("./Spawn");
const Linker = require("./Linker");
const Towers = require("./Towers");
const Utils = require("./Utils");
const Config = require("./Config");

Memory.mainSpawn = Config.mainSpawn;
Memory.mainRoom = Config.mainRoom;
Memory.allJob = null;

Spawn.init();

module.exports.loop = function() {
    // Clear memory
    Utils.clearMemory();

    // Process creeps job
    Jobs.onTick();

    // Create more workers if needed
    Spawn.onTick();

    // Transfer energy between links if needed
    Linker.onTick();

    // Process Towers attack
    Towers.onTick();
}