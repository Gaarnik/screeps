/// <reference path="typings/index.d.ts" />

module.exports = {

    getEnergy: function(creep) {
        // Try to find an energy source
        let source = creep.pos.findClosestByPath(FIND_SOURCES, {
            filter: (s) => s.energy > 0
        });
        if(creep.harvest(source) == ERR_NOT_IN_RANGE)
            creep.moveTo(source);

        if(creep.carry.energy >= creep.carryCapacity)
            creep.memory.full = true;
    },
    
    createClaimer: function(flag) {
        let name = Game.spawns[Memory.mainSpawn].createClaimerCreep(flag);
        if(name < 0)
            return console.log("Cannot create claimer: " + name);
    },

    listWorkers: function() {
        let jobs = {};
        let total = 0;

        for(let name in Game.creeps) {
            let creep = Game.creeps[name];
            let job = creep.memory.job;

            if(jobs[job] == null)
                jobs[job] = [];
            jobs[job].push(creep.name);

            total++;
        }

        for(let job in jobs) {
            var str = jobs[job].length + " " + job + ": ";
            
            for(let name of jobs[job])
                str += name + ", ";

            console.log(str);
        }

        console.log(total + " workers in total");
    }

};