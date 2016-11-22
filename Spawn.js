/// <reference path="typings/index.d.ts" />

const Config = require("./Config");

module.exports = {

    init: function() {
        StructureSpawn.prototype.createCustomCreep = function(energy, job) {
            if(energy < 200)
                return null;
            
            let bodyPartsCount = Math.floor(energy / 200);
            let body = [];

            for(let i=0;i<bodyPartsCount;i++)
                body.push(WORK);
            for(let i=0;i<bodyPartsCount;i++)
                body.push(CARRY);
            for(let i=0;i<bodyPartsCount;i++)
                body.push(MOVE);
            
            return this.createCreep(body, undefined, { job: job, full: false });
        };
    },

    onTick: function() {
        let energy = Game.spawns[Memory.mainSpawn].room.energyCapacityAvailable;

        module.exports.spawnWorker(energy, "harvester", Config.spawner.MAX_HARVESTERS);
        module.exports.spawnWorker(energy, "upgrader", Config.spawner.MAX_UPGRADERS);
        module.exports.spawnWorker(energy, "repairer", Config.spawner.MAX_REPAIRERS);
        module.exports.spawnWorker(energy, "builder", Config.spawner.MAX_BUILDERS);
    },

    spawnWorker: function(energy, job, max) {
        let count = _.sum(Game.creeps, (c) => c.memory.job == job);
        if(count < max) {
            let error = Game.spawns[Memory.mainSpawn].createCustomCreep(energy, job);
            
            // if not enough energy to spawn an harvester and current harvester count = 0,
            // spawn a less strong harvester
            if(error == ERR_NOT_ENOUGH_ENERGY && count == 0 && job == "harvester")
                Game.spawns[Memory.mainSpawn].createCustomCreep(Game.spawns[Memory.mainSpawn].room.energyAvailable, job);
        }
    }

};