/// <reference path="typings/index.d.ts" />

const Builder = require("./Builder");

const WALL_MIN_HITS = 100;

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
            let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax 
                                && s.structureType != STRUCTURE_WALL 
                                && s.structureType != STRUCTURE_RAMPART
            });

            if(structure != undefined) {
                if(creep.repair(structure) == ERR_NOT_IN_RANGE)
                    creep.moveTo(structure);
            }
            // If no structure to repair, try to find a wall or rampart
            else {
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < WALL_MIN_HITS 
                                && (s.structureType == STRUCTURE_WALL || s.structureType == STRUCTURE_RAMPART)
                });

                if(structure != undefined) {
                    if(creep.repair(structure) == ERR_NOT_IN_RANGE)
                        creep.moveTo(structure);
                }
                else
                    Builder.onTick(creep);
            }
            
            if(creep.carry.energy == 0)
                creep.memory.full = false;
        }
    }

};