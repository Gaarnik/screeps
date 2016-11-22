/// <reference path="typings/index.d.ts" />

const Upgrader = require("./Upgrader");
const JobsUtils = require("./JobsUtils");

module.exports = {

    onTick: function(creep) {
        if(creep.memory.full == false)
            return JobsUtils.getEnergy(creep);
        
        let site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if(site != undefined) {
            if(creep.build(site) == ERR_NOT_IN_RANGE)
                creep.moveTo(site);
        }
        else
            Upgrader.onTick(creep);
        
        if(creep.carry.energy == 0)
            creep.memory.full = false;
    }

};