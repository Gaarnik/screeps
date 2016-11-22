/// <reference path="typings/index.d.ts" />

const Upgrader = require("./Upgrader");

module.exports = {

    onTick: function(creep) {
        if(creep.memory.full == false) {
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE)
                creep.moveTo(source);

            if(creep.carry.energy >= creep.carryCapacity)
                creep.memory.full = true;
        }
        else {
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
            else
                Upgrader.onTick(creep);

            if(creep.carry.energy == 0)
                creep.memory.full = false;
        }
    }

};