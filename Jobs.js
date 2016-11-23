/// <reference path="typings/index.d.ts" />

const Harvester = require("./Harvester");
const Upgrader = require("./Upgrader");
const Builder = require("./Builder");
const Repairer = require("./Repairer");
const Recolter = require("./Recolter");
const Claimer = require("./Claimer");

module.exports = {

    onTick: function() {
        for(let name in Game.creeps) {
            let creep = Game.creeps[name];
            let job = Memory.allJob ? Memory.allJob: creep.memory.job;
            
            if(job == "harvester")
                Harvester.onTick(creep);
            else if(job == "upgrader")
                Upgrader.onTick(creep);
            else if(job == "builder")
                Builder.onTick(creep);
            else if(job == "repairer")
                Repairer.onTick(creep);
            else if(job == "recolter")
                Recolter.onTick(creep);
            else if(job == "claimer")
                Claimer.onTick(creep);
        }
    }

};