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
    }

};