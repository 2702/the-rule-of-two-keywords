import {defineStore} from "pinia";
import {edges, factions, keywords, nodes, ranks, upgrades, tags, unitsNames} from "./dataTransformation.js";
import { Units, Keywords, Tags } from "./database.js";


export const useGraphStore = defineStore("graphStore", {
    state: () => ({
        filterOptions: {
            tags: new Set(),
            keywords: new Set(),
            units: new Set(),
            factions: new Set(),
            ranks: new Set(),
            upgrades: new Set(),
        },
        
        viewOptions: {
            tags: new Set(),
            keywords: new Set(),
            units: new Set(),
            factions: new Set(),
            ranks: new Set(),
            upgrades: new Set(),
        },
        
        nodes,
        edges,

        
        optionsSpace: {
            tags: tags,
            keywords: keywords,
            units: unitsNames,
            factions: factions,
            ranks: ranks,
            upgrades: upgrades,
        },
        initialized: false,
    }),
    actions: {
        
        // views
        toggleView(option, type) {
            if (this.viewOptions[type].has(option)) {
                this.viewOptions[type].delete(option);
            } else {
                this.viewOptions[type].add(option);
            }
        },

        clearViews(type) {
            this.viewOptions[type].clear();
        },

        resetViews() {
            this.reset(this.viewOptions);
        },

        selectAllViews() {
            this.selectFromSpace(this.viewOptions);
        },

        selectAllViewsOf(type) {
            this.viewOptions[type] = new Set(this.optionsSpace[type]);
        },

        // filters
        toggleFilter(option, type) {
            if (this.filterOptions[type].has(option)) {
                this.filterOptions[type].delete(option);
            } else {
                this.filterOptions[type].add(option);
            }
        },

        clearFilters(type) {
            this.filterOptions[type].clear();
        },
        
        resetFilters() {
            this.reset(this.filterOptions);
        },

        selectAllFilters() {
            this.selectFromSpace(this.filterOptions);
        },

        selectAllFiltersOf(type) {
            this.filterOptions[type] = new Set(this.optionsSpace[type]);
        },
        
        // common mechanics

        selectFromSpace(filters) {
            filters.tags = new Set(this.optionsSpace.tags);
            filters.keywords = new Set(this.optionsSpace.keywords);
            filters.units = new Set(this.optionsSpace.units);
            filters.factions = new Set(this.optionsSpace.factions);
            filters.ranks = new Set(this.optionsSpace.ranks);
            filters.upgrades = new Set(this.optionsSpace.upgrades);
        },
    
        reset(filters) {
            filters.tags.clear();
            filters.keywords.clear();
            filters.units.clear();
            filters.factions.clear();
            filters.ranks.clear();
            filters.upgrades.clear();
        },

        // updateUrlParams() {
        //     const urlParams = new URLSearchParams();
        //
        //     Object.keys(this.filterOptions).forEach((type) => {
        //         const filterKey = `filter${type}`;
        //         const filterValues = Array.from(this.filterOptions[type]);
        //         if (filterValues.length > 0) {
        //             urlParams.set(filterKey, filterValues.join(","));
        //         }
        //     });
        //     window.history.replaceState(null, "", "?" + urlParams.toString());
        // },

        applyInitialState() {
            this.selectAllViews();
        },

        applyFiltersFromUrl() {
            if (this.initialized) return;

            const urlParams = new URLSearchParams(window.location.search);

            if (urlParams.size) {
                Object.keys(this.filterOptions).forEach((type) => {
                    const filterKey = `filter${type}`;
                    const filterValue = urlParams.get(filterKey);

                    if (filterValue) {
                        this.filterOptions[type] = new Set(filterValue.split(","));
                    }
                });
            } else {
                this.applyInitialState();
            }
            this.initialized = true;
        },



        filteredGraph() {
            const selectedTypeFilters = this.filterOptions;
            const selectedViewOptions = this.viewOptions;


            // filter by filters

            const filteredUnits = Units.filter((unit) => {
                return selectedTypeFilters.ranks.has(unit.rank) || selectedTypeFilters.factions.has(unit.faction) || selectedTypeFilters.units.has(unit.label)
            })
            const filteredUnitById = filteredUnits.map(unit => unit.id);
            const filteredKeywords = Keywords.filter((keyword) => selectedTypeFilters.keywords.has(keyword.id))
            const filteredKeywordsById = filteredKeywords.map((keyword) => keyword.id);
            const filteredTagIds = Tags.filter((tag) => selectedTypeFilters.tags.has(tag.id)).map((tag) => tag.id);


            // extended by views - traverse the graph
            //      units first
            let keywordsIdsFromUnits = filteredUnits.flatMap(unit => this.extractKeywordsFromUnit(unit, selectedViewOptions.upgrades));
            const keywordsIdsByView = keywordsIdsFromUnits.filter((keyword) => selectedViewOptions.keywords.has(keyword));
            let keywordsFromUnits = Keywords.filter((keyword) => keywordsIdsByView.includes(keyword.id));
            const tagIdsFromUnitsByView = keywordsFromUnits.flatMap((keyword) => [...keyword.tags]).filter((tagId) => selectedViewOptions.tags.has(tagId));

            //      keywords next
            const unitIdsByKeyword = Units.filter((unit) => this.extractKeywordsFromUnit(unit, selectedViewOptions.upgrades).some((keyword) => filteredKeywordsById.includes(keyword))
                && selectedViewOptions.units.has(unit.label)
                && selectedViewOptions.ranks.has(unit.rank)
                && selectedViewOptions.factions.has(unit.faction))
                .map(unit => unit.id);
            const tagIdsByKeyword = filteredKeywords.flatMap((keyword) => [...keyword.tags]).filter(tag => selectedViewOptions.tags.has(tag));

            //      lastly tags
            const keywordIdsByTag= Keywords.filter((keyword) =>  [...keyword.tags].some(tagId => filteredTagIds.includes(tagId))).map(keyword => keyword.id).filter(keyword => selectedViewOptions.keywords.has(keyword));
            const unitIdsByTag = Units.filter((unit) => this.extractKeywordsFromUnit(unit, selectedViewOptions.upgrades).some((keyword) => keywordIdsByTag.includes(keyword))
                && selectedViewOptions.units.has(unit.label)
                && selectedViewOptions.ranks.has(unit.rank)
                && selectedViewOptions.factions.has(unit.faction))
                .map(unit => unit.id);

            // edges
            const allNodeIds = new Set([...filteredUnitById, ...filteredKeywordsById, ...filteredTagIds, ...keywordsIdsByView, ...tagIdsFromUnitsByView, ...unitIdsByKeyword, ...tagIdsByKeyword, ...keywordIdsByTag, ...unitIdsByTag]);
            const filteredNodes = this.nodes.filter(node => allNodeIds.has(node.id));
            const filteredEdges = this.edges.filter(
                (edge) =>  allNodeIds.has(edge.source) && allNodeIds.has(edge.target)
                            && (edge.upgrade === undefined || selectedViewOptions.upgrades.has(edge.upgrade))
            );

            return { nodes: filteredNodes, edges: filteredEdges, selectedIds: new Set([...filteredUnitById, ...filteredKeywordsById, ...filteredTagIds]) };
        },

        extractKeywordsFromUnit(unit, upgrades) {
            return [
                ...(unit.keywords ?? []),
                ...(upgrades.has("extraMiniUpgrades") && unit.extraMiniUpgrades ? unit.extraMiniUpgrades : []),
                ...(upgrades.has("gearUpgrades") && unit.gearUpgrades ? unit.gearUpgrades : []),
                ...(upgrades.has("grenadeUpgrades") && unit.grenadeUpgrades ? unit.grenadeUpgrades : []),
                ...(upgrades.has("trainingUpgrades") && unit.trainingUpgrades ? unit.trainingUpgrades : []),
                ...(upgrades.has("otherUpgrades") && unit.otherUpgrades ? unit.otherUpgrades : [])
               ];
        }

    }
});
