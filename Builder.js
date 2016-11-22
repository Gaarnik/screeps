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
    }

};