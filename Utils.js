/// <reference path="typings/index.d.ts" />

module.exports = {

    clearMemory: function() {
        for(let name in Memory.creeps) {
            if(Game.creeps[name] == undefined)
                delete Memory.creeps[name];
        }
    },

    removeConstructionSite: function(x, y) {
         for (var constructionSite in Game.constructionSites)
            if (Game.constructionSites[constructionSite].pos.x == x && Game.constructionSites[constructionSite].pos.y == y)
                Game.constructionSites[constructionSite].remove();
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