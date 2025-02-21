export const Tags = [
    { id: "ATTACK", label: "attack", description: "Affects attacks dice and other parameters" },
    { id: "DEFENCE", label: "defence", description: "Affects defence dice" },
    { id: "EXTRA_TOKEN", label: "extra token", description: "Provides additional tokens" },
    { id: "ORDER", label: "order", description: "Affects order mechanics" },
    { id: "MOVE", label: "move", description: "Affects movement" },
    { id: "ACTIVATION", label: "activation", description: "Triggers during activation" },
    { id: "SUPPRESS_PANIC", label: "suppress panic", description: "Influences suppression and panic mechanics" },
    { id: "WOUND", label: "wound", description: "Affects wound mechanics" },
    { id: "RANGE", label: "range", description: "Affects range-related mechanics" },
    { id: "GAME_SETUP", label: "game setup", description: "Influences game setup mechanics" },
    { id: "FREE_ATTACK", label: "free attack", description: "Grants free attack actions" },
    { id: "FREE_MOVE", label: "free move", description: "Grants free movement actions" },
    { id: "SHIELD", label: "shield", description: "Provides shielding benefits" }
];

export const Keywords = [
    { id: "Precise X", label: "Precise", tags: new Set(["EXTRA_TOKEN"]) },
    { id: "Repair", label: "Repair", tags: new Set(["WOUND"]) },
    { id: "High Velocity", label: "High Velocity", tags: new Set(["DEFENCE"]) },
    { id: "Lethal X", label: "Lethal", tags: new Set(["ATTACK"]) },
    { id: "Impact X", label: "Impact", tags: new Set(["DEFENCE"]) },
    { id: "Coordinate", label: "Coordinate", tags: new Set(["ORDER"]) },
    { id: "Cumbersome", label: "CUMBERSOME", tags: new Set(["MOVE", "ACTIVATION"]) },
    { id: "Critical X", label: "Critical", tags: new Set(["ATTACK"]) },
    { id: "Treat", label: "Treat", tags: new Set([]) },
    { id: "Inspire X", label: "Inspire", tags: new Set([]) },
    { id: "Indomitable", label: "Indomitable", tags: new Set(["SUPPRESS_PANIC"]) },
    { id: "Scale", label: "Scale", tags: new Set(["MOVE"]) },
    { id: "Spotter", label: "Spotter", tags: new Set(["EXTRA_TOKEN"]) },
    { id: "Unhindered", label: "Unhindered", tags: new Set(["MOVE"]) },
    { id: "Expert Climber", label: "Expert Climber", tags: new Set(["MOVE"]) },
    { id: "Take Cover", label: "Take Cover", tags: new Set([]) },
    { id: "Cache", label: "Cache", tags: new Set(["EXTRA_TOKEN", "GAME_SETUP"]) },
    { id: "Scout X", label: "Scout", tags: new Set(["MOVE", "GAME_SETUP"]) },
    { id: "Blast", label: "Blast", tags: new Set([]) },
    { id: "Ion", label: "Ion", tags: new Set(["ATTACK", "DEFENCE", "ACTIVATION", "WOUND", "SHIELD"]) },
    { id: "Smoke", label: "Smoke", tags: new Set([]) },
    { id: "Suppressive", label: "Suppressive", tags: new Set(["SUPPRESS_PANIC"]) },
    { id: "Disciplined X", label: "Disciplined", tags: new Set(["SUPPRESS_PANIC"]) },
    { id: "Compel", label: "Compel", tags: new Set(["FREE_MOVE", "SUPPRESS_PANIC"]) },
    { id: "Tactical X", label: "Tactical", tags: new Set(["RANGE"]) },
    { id: "Sentinel", label: "Sentinel", tags: new Set(["RANGE"]) },
    { id: "Outmaneuver", label: "Outmaneuver", tags: new Set(["DEFENCE"]) },
    { id: "Charge", label: "Charge", tags: new Set(["FREE_ATTACK"]) },
    { id: "Relentless", label: "Relentless", tags: new Set(["FREE_ATTACK"]) },
    { id: "Steady", label: "Steady", tags: new Set(["FREE_ATTACK"]) },
    { id: "Pulling the Strings", label: "Pulling the Strings", tags: new Set(["FREE_ATTACK", "FREE_MOVE"]) },
    { id: "Unstoppable", label: "Unstoppable", tags: new Set(["ACTIVATION", "ORDER"]) },
    { id: "Cycle", label: "Cycle", tags: new Set(["ACTIVATION"]) },
    { id: "Independent", label: "Independent", tags: new Set(["EXTRA_TOKEN"]) },
    { id: "Nimble", label: "Nimble", tags: new Set(["EXTRA_TOKEN"]) },
    { id: "Agile X", label: "Agile", tags: new Set(["EXTRA_TOKEN"]) },
    { id: "Aid", label: "Aid", tags: new Set(["EXTRA_TOKEN", "SUPPRESS_PANIC"]) },
    { id: "Ready X", label: "Ready", tags: new Set(["EXTRA_TOKEN"]) },
    { id: "Retinue", label: "Retinue", tags: new Set(["EXTRA_TOKEN", "DEFENCE"]) },
    { id: "Target", label: "Target", tags: new Set(["EXTRA_TOKEN", "ORDER"]) },
    { id: "Fire support", label: "Fire support", tags: new Set(["EXTRA_TOKEN"]) },
    { id: "Low Profile", label: "Low Profile", tags: new Set(["DEFENCE"]) },
    { id: "Reposition", label: "Reposition", tags: new Set(["MOVE"]) },
    { id: "Full pivot", label: "Full pivot", tags: new Set(["MOVE"]) },
    { id: "Speeder", label: "Speeder", tags: new Set(["MOVE", "ACTIVATION"]) },
    { id: "Plodding", label: "Plodding", tags: new Set(["MOVE"]) },
    { id: "Dauntless", label: "Dauntless", tags: new Set(["FREE_MOVE", "SUPPRESS_PANIC"]) },
    { id: "Self-preservation", label: "Self-preservation", tags: new Set(["SUPPRESS_PANIC"]) },
    { id: "Danger Sense X", label: "Danger Sense", tags: new Set(["DEFENCE", "SUPPRESS_PANIC"]) },
    { id: "Sharpshooter", label: "Sharpshooter", tags: new Set(["DEFENCE"]) },
    { id: "Pierce X", label: "Pierce", tags: new Set(["DEFENCE"]) },
    { id: "Immune: Pierce", label: "Immune: Pierce", tags: new Set(["DEFENCE"]) },
    { id: "Deflect", label: "Deflect", tags: new Set(["DEFENCE"]) },
    { id: "Impervious", label: "Impervious", tags: new Set(["DEFENCE"]) },
    { id: "Unconcerned", label: "Unconcerned", tags: new Set(["DEFENCE", "WOUND"]) },
    { id: "Armor X", label: "Armor", tags: new Set(["DEFENCE"]) },
    { id: "Prepared Position", label: "Prepared Position", tags: new Set(["GAME_SETUP", "EXTRA_TOKEN"]) },
    { id: "Demoralize X", label: "Demoralize", tags: new Set(["SUPPRESS_PANIC"]) },
    { id: "Allies of convenience", label: "Allies of convenience", tags: new Set(["GAME_SETUP"]) },
];



export const Units = [
    {
        id: "C1",
        label: "Stormtroopers",
        rank: "corps",
        faction: "empire",
        keywords: new Set(["Precise X"]),
        extraMiniUpgrades: new Set(["Repair", "High Velocity", "Lethal X", "Impact X", "Coordinate", "Cumbersome", "Critical X", "Treat", "Inspire X", "Indomitable"]),
        gearUpgrades: new Set(["Scale", "Spotter", "Unhindered", "Expert Climber", "Take Cover", "Cache", "Scout X", "Precise X"]),
        grenadeUpgrades: new Set(["Blast", "Ion", "Smoke", "Suppressive"]),
    },
    {
        id: "C2",
        label: "Imperial Death Troopers",
        rank: "special forces",
        faction: "empire",
        keywords: new Set(["Disciplined X", "Precise X", "Ready X"]),
        extraMiniUpgrades: new Set(["Impact X", "Compel"]),
        grenadeUpgrades: new Set(["Blast", "Ion", "Smoke", "Suppressive"]),
        trainingUpgrades: new Set(["Tactical X", "Sentinel", "Outmaneuver"]),
        gearUpgrades: new Set(["Scale", "Spotter", "Unhindered", "Expert Climber", "Take Cover", "Cache", "Scout X", "Precise X"]),
        otherUpgrades: new Set(["Reconfigure", "Suppressive", "Blast"]),
    },
    {
        id: "C3",
        label: "Vader (Commander)",
        rank: "commander",
        faction: "empire",
        keywords: new Set(["Deflect", "Relentless", "Master of the Force", "Immune", "Compel", "Impact X", "Pierce X"]),
        otherUpgrades: new Set(["Demoralize X", "Suppressive", "Guardian X", "Inspire X", "Allies of convenience"]),
    },
];


