/// <reference path="typings/index.d.ts" />

module.exports = {

    getEnergy: function(creep) {
        // Try to find an energy source
        let source = creep.pos.findClosestByPath(FIND_SOURCES);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE)
            creep.moveTo(source);

        if(creep.carry.energy >= creep.carryCapacity)
            creep.memory.full = true;
    }

};