/// <reference path="typings/index.d.ts" />

const Upgrader = require("./Upgrader");
const JobsUtils = require("./JobsUtils");

module.exports = {

    onTick: function(creep) {
        if(creep.memory.full == false)
            return JobsUtils.getEnergy(creep);

        // Try to find a spawn, an extension or a tower to refill
        let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_SPAWN 
                            || s.structureType == STRUCTURE_EXTENSION
                            || s.structureType == STRUCTURE_TOWER) 
                            && s.energy < s.energyCapacity
        });

        if(structure != undefined) {
            if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                creep.moveTo(structure);
        }
        // if no spawn, extension or tower need energy, try to find a container or a storage
        else {
            structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                                || s.structureType == STRUCTURE_STORAGE)
                                && s.store.energy < s.storeCapacity
            });

            if(structure != undefined) {
                if(creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                    creep.moveTo(structure);
            }
            else
                Upgrader.onTick(creep);
        }

        if(creep.carry.energy == 0)
            creep.memory.full = false;
    }

};