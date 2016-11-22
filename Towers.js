/// <reference path="typings/index.d.ts" />

module.exports = {

    onTick: function() {
        let towers = Game.rooms[Memory.mainRoom].find(FIND_STRUCTURES, {
            filter: (s) => s.structureType == STRUCTURE_TOWER
        });
        
        for(let tower of towers) {
            // Try to find a target to attack
            var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(target != undefined)
                tower.attack(target);
        }
    }

};