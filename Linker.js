/// <reference path="typings/index.d.ts" />

const Config = require("./Config");

module.exports = {
    
    onTick: function() {
        if(Config.linker.enable == false)
            return;
        
        let room = Game.spawns[Memory.mainSpawn].room;
        if(room == undefined)
            return;
        
        // Get origin link
        let linkFrom = module.exports.getLink(room, Config.linker.from.x, Config.linker.from.y);
        if(linkFrom == null)
            return;

        // If not ready or no energy, don't try to transfer energy
        if(linkFrom.cooldown > 0 || linkFrom.energy == 0)
            return;
        
        // Get destination link
        let linkTo = module.exports.getLink(room, Config.linker.to.x, Config.linker.to.y);
        if(linkTo == null)
            return;
        
        // If destination is full don't transfer energy
        if(linkTo.energy == linkTo.energyCapacity)
            return;
        
        // Transfer energy 
        linkFrom.transferEnergy(linkTo);
    },

    getLink(room, x, y) {
        let structures = room.lookForAt("structure", x, y);
        if(structures.length == 0)
            return null;
        
        let link = structures[0];
        if(link.structureType != STRUCTURE_LINK)
            return null;
        
        return link;
    }

};