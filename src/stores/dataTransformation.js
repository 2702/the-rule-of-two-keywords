import { Tags, Keywords, Units } from "@/stores/database.js";

export function transformGraphData() {
    const nodes = [];
    const edges = [];

    Tags.forEach((tag) => {nodes.push({ id: tag.id, type: "Tag", label: tag.label });});

    Keywords.forEach((keyword) => {
        nodes.push({ id: keyword.id, type: "Keyword", label: keyword.label });

        keyword.tags.forEach((tagId) => {edges.push({source: keyword.id, target: tagId, color: "green"})})
    });


    Units.forEach((unit) => {
        nodes.push({ id: unit.id, type: "Unit", label: unit.label });

        if (unit.keywords) {
            unit.keywords.forEach((keywordId) => {edges.push({source: keywordId, target: unit.id, color: "blue"})});
        }

        if (unit.extraMiniUpgrades) {
            unit.extraMiniUpgrades.forEach((keywordId) => {edges.push({source: keywordId, target: unit.id, color: "red", upgrade: "extraMiniUpgrades"})});
        }

        if (unit.gearUpgrades) {
            unit.gearUpgrades.forEach((keywordId) => {edges.push({source: keywordId, target: unit.id, color: "red", upgrade: "gearUpgrades"})});
        }

        if (unit.grenadeUpgrades) {
            unit.grenadeUpgrades.forEach((keywordId) => {edges.push({source: keywordId, target: unit.id, color: "red", upgrade: "grenadeUpgrades"})});
        }

        if (unit.trainingUpgrades) {
            unit.trainingUpgrades.forEach((keywordId) => {edges.push({source: keywordId, target: unit.id, color: "red", upgrade: "trainingUpgrades"})});
        }

        if (unit.otherUpgrades) {
            unit.otherUpgrades.forEach((keywordId) => {edges.push({source: keywordId, target: unit.id, color: "red", upgrade: "otherUpgrades"})});
        }
    });

    return {nodes, edges }
}

export function provideOptionsSpace() {
    const tags = new Set(Tags.map((tag) => tag.id));
    const keywords = new Set(Keywords.map((keyword) => keyword.id));
    const unitsNames = new Set(Units.map((unit) => unit.label));
    const factions = new Set(Units.map((unit) => unit.faction));
    const ranks = new Set(Units.map((unit) => unit.rank));
    const upgrades = new Set(["extraMiniUpgrades", "gearUpgrades", "grenadeUpgrades", "trainingUpgrades", "otherUpgrades"]);
    return {tags, keywords, unitsNames, factions, ranks, upgrades}
}


export const { nodes, edges } = transformGraphData();
export const {tags, keywords, unitsNames, factions, ranks, upgrades} = provideOptionsSpace();