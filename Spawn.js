/// <reference path="typings/index.d.ts" />

const Config = require("./Config");

module.exports = {

    init: function() {
        StructureSpawn.prototype.createCustomCreep = function(energy, job) {
            if(energy < 200)
                return null;
            
            let bodyPartsCount = Math.floor(energy / 200);
            let maxParts = Math.floor(Config.spawner.MAX_PARTS_BY_CREEP / 3);
            if(maxParts != 0 && bodyPartsCount > maxParts) bodyPartsCount = maxParts;

            let body = [];
            
            for(let i=0;i<bodyPartsCount;i++)
                body.push(WORK);
            for(let i=0;i<bodyPartsCount;i++)
                body.push(CARRY);
            for(let i=0;i<bodyPartsCount;i++)
                body.push(MOVE);
            
            return this.createCreep(body, undefined, { job: job, full: false });
        };
        
        StructureSpawn.prototype.createRecolterCreep = function(startFlag, targetFlag) {
            return this.createCreep([WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE], undefined, {
                job: "recolter", full: false, inTargetRoom: false, startFlag: startFlag, targetFlag: targetFlag
            });
        };

        StructureSpawn.prototype.createClaimerCreep = function(flag) {
            return this.createCreep([CLAIM, CLAIM, MOVE], undefined, {
                job: "claimer", full: false, flag: flag, inRoom: false
            });
        };
    },

    onTick: function() {
        let energy = Game.spawns[Memory.mainSpawn].room.energyCapacityAvailable;

        // Spanw harvesters
        let harvestersCount = _.sum(Game.creeps, (c) => c.memory.job == "harvester");
        if(harvestersCount < Config.spawner.MAX_HARVESTERS) {
            let error = Game.spawns[Memory.mainSpawn].createCustomCreep(energy, "harvester");
            
            // if not enough energy to spawn an harvester and current harvester count = 0,
            // spawn a less strong harvester
            if(error == ERR_NOT_ENOUGH_ENERGY && harvestersCount == 0)
                Game.spawns[Memory.mainSpawn].createCustomCreep(Game.spawns[Memory.mainSpawn].room.energyAvailable, "harvester");
        }

        // Spawn recolters
        let recoltersCount = _.sum(Game.creeps, (c) => c.memory.job == "recolter");
        if(recoltersCount < Config.spawner.MAX_RECOLTERS)
            Game.spawns[Memory.mainSpawn].createRecolterCreep(Config.baseFlag, Config.farmFlag);

        // Spawn other jobs
        module.exports.spawnWorker(energy, "upgrader", Config.spawner.MAX_UPGRADERS);
        module.exports.spawnWorker(energy, "repairer", Config.spawner.MAX_REPAIRERS);
        module.exports.spawnWorker(energy, "builder", Config.spawner.MAX_BUILDERS);
    },

    spawnWorker: function(energy, job, max) {
        let count = _.sum(Game.creeps, (c) => c.memory.job == job);
        if(count < max)
            Game.spawns[Memory.mainSpawn].createCustomCreep(energy, job);
    }

};