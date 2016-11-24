/// <reference path="typings/index.d.ts" />

const Config = require("./Config");

module.exports = {

    getEnergy: function(creep) {
        // Harvesters can only get energy from links & sources
        if(creep.memory.job == "harvester") {
            let source = null;

            // Try to find a link
            if(Config.linker.enable) {
                let room = Game.spawns[Memory.mainSpawn].room;
                let structures = room.lookForAt("structure", Config.linker.to.x, Config.linker.to.y);
                if(structures.length > 0 && structures[0].structureType == STRUCTURE_LINK && structures[0].energy > 0)
                    source = structures[0];
            }

            // Try to find an energy source
            if(source == null) {
                source = creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: (s) => s.energy > 0
                });
            }
            
            // Get ebergy fron source
            if(source != null) {
                if(source.structureType == STRUCTURE_LINK) {
                    if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        creep.moveTo(source);
                }
                else {
                    if(creep.harvest(source) == ERR_NOT_IN_RANGE)
                        creep.moveTo(source);
                }
            }
        }
        // Recolters can only get energy from sources
        else if(creep.memory.job == "recolter") {
            // Try to find an energy source
            let source = creep.pos.findClosestByPath(FIND_SOURCES, {
                filter: (s) => s.energy > 0
            });

            if(creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);
        }
        // Others jobs try to get energy from containers or storages first
        // otherwise they can get energy from sources
        else {
            // Try to find a storage or a container
            let source = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                                || s.structureType == STRUCTURE_STORAGE)
                                && s.store.energy > 0
            });

            if(source != undefined) {
                if(source.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    creep.moveTo(source);
            }
            // Try to find an energy source
            else {
                let source = creep.pos.findClosestByPath(FIND_SOURCES, {
                    filter: (s) => s.energy > 0
                });

                if(creep.harvest(source) == ERR_NOT_IN_RANGE)
                    creep.moveTo(source);
            }
        }
        
        if(creep.carry.energy >= creep.carryCapacity)
            creep.memory.full = true;
    },
    
    createRecolter: function(startFlag, targetFlag) {
        let name = Game.spawns[Memory.mainSpawn].createRecolterCreep(startFlag, targetFlag);
        if(name < 0)
            return console.log("Cannot create Recolter: " + name);
    },
    
    createClaimer: function(flag) {
        let name = Game.spawns[Memory.mainSpawn].createClaimerCreep(flag);
        if(name < 0)
            return console.log("Cannot create claimer: " + name);
    },

    listWorkers: function() {
        let jobs = {};
        let total = 0;

        for(let name in Game.creeps) {
            let creep = Game.creeps[name];
            let job = creep.memory.job;

            if(jobs[job] == null)
                jobs[job] = [];
            jobs[job].push(creep.name);

            total++;
        }

        for(let job in jobs) {
            var str = jobs[job].length + " " + job + ": ";
            
            for(let name of jobs[job])
                str += name + ", ";

            console.log(str);
        }

        console.log(total + " workers in total");
    },

    sayJob: function() {
        for(let name in Game.creeps) {
            let creep = Game.creeps[name];
            creep.say(creep.memory.job);
        }
    }

};