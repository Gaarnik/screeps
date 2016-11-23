/// <reference path="typings/index.d.ts" />

const JobsUtils = require("./JobsUtils");

module.exports = {

    onTick: function(creep) {
        // Reach the flag's room
        if(creep.memory.inRoom == false) {
            let flag = Game.flags[creep.memory.flag]
            if(flag == undefined)
                return creep.suicide();
            
            if(creep.moveTo(flag) != 0)
                return creep.suicide();
console.log(creep.room.name);
console.log(flag.room.name);
            if(creep.room.name == flag.room.name)
                creep.memory.inRoom = true;
        }
        // Collect energy & reserve the controller
        else {
            if(creep.room.controller == undefined)
                return creep.suicide();
            
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE)
                creep.moveTo(creep.room.controller);    
        }
    }

};