/// <reference path="typings/index.d.ts" />

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
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
                creep.moveTo(creep.room.controller);

            if(creep.carry.energy == 0)
                creep.memory.full = false;
        }
    }

};