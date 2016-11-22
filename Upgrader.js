/// <reference path="typings/index.d.ts" />

const JobsUtils = require("./JobsUtils");

module.exports = {

    onTick: function(creep) {
        if(creep.memory.full == false)
            return JobsUtils.getEnergy(creep);
        
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE)
            creep.moveTo(creep.room.controller);

        if(creep.carry.energy == 0)
            creep.memory.full = false;
    }

};