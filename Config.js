
module.exports = {

    mainSpawn: "BSA",
    mainRoom: "W2N2",
    spawner: {
        MAX_PARTS_BY_CREEP: 0, // 0 = as big as possible
        
        // 0 = no spawn
        MAX_HARVESTERS: 3,
        MAX_RECOLTERS: 3,
        MAX_UPGRADERS: 2,
        MAX_REPAIRERS: 2,
        MAX_BUILDERS: 2,
    },
    baseFlag: "BSA",
    farmFlag: "Farm",
    linker: {
        enable: true,
        from: { x: 16, y: 47 },
        to: { x: 13, y: 29 }
    }

};