/// <reference path="typings/index.d.ts" />

const Upgrader = require("./Upgrader");
const JobsUtils = require("./JobsUtils");
const Config = require("./Config");

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
            // In start room, store energy to links, else container or storage, else upgrade controller
            else {
                let structure = null;

                // Try to find a link
                if(Config.linker.enable) {
                    let room = Game.spawns[Memory.mainSpawn].room;
                    let structures = room.lookForAt("structure", Config.linker.from.x, Config.linker.from.y);
                    if(structures.length > 0 && structures[0].structureType == STRUCTURE_LINK)
                        structure = structures[0];
                }

                // Try to find a container or storage
                if(structure == null) {
                    structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_CONTAINER
                                        || s.structureType == STRUCTURE_STORAGE)
                                        && s.store.energy < s.storeCapacity
                    });
                }

                // Fill structure or upgrade controller
                if(structure != null) {
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