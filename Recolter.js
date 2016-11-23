/// <reference path="typings/index.d.ts" />

const Upgrader = require("./Upgrader");
const JobsUtils = require("./JobsUtils");

module.exports = {

    onTick: function(creep) {
        // Not full, need to get energy
        if(creep.memory.full == false) {
            // Not in target room, need to go to the room
            if(creep.memory.inTargetRoom == false) {
                let flag = Game.flags[creep.memory.targetFlag];
                if(flag == undefined)
                    return creep.suicide();
                
                creep.moveTo(flag);

                if(flag.room != undefined && creep.room.name == flag.room.name)
                    creep.memory.inTargetRoom = true;
            }
            // In target room, can get energy
            else
                JobsUtils.getEnergy(creep);
        }
        else {
            // In target room, need to go to start room
            if(creep.memory.inTargetRoom) {
                let flag = Game.flags[creep.memory.startFlag];
                if(flag == undefined)
                    return creep.suicide();
                
                creep.moveTo(flag);

                if(flag.room != undefined && creep.room.name == flag.room.name)
                    creep.memory.inTargetRoom = false;
            }
            // In start room, store energy to container or storage, else upgrade controller
            else {
                let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
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
                
                if(creep.carry.energy == 0)
                    creep.memory.full = false;
            }
        }
    }

}