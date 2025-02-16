<template>
  <div id="cy-container"></div>
</template>

<script>
import {onMounted, watch} from "vue";
import cytoscape from "cytoscape";
import {useGraphStore} from "../stores/GraphStore.js";


export default {
  setup() {
    const graphStore = useGraphStore();
    let cy = null;

    const updateGraph = () => {
      const {nodes, edges, selectedIds} = graphStore.filteredGraph();
      cy.elements().remove();

      const sortedNodes = { A: [], B: [], C: [] };
      nodes.forEach((node) => {
        switch (node.type) {
          case "Unit": sortedNodes["C"].push(node); break;
          case "Keyword": sortedNodes["B"].push(node); break;
          case "Tag": sortedNodes["A"].push(node); break;
          default: break;
        }
      });
      Object.values(sortedNodes).forEach((list) => list.sort((a, b) => a.id.localeCompare(b.id)));

      const nodePositions = {};
      let yStart = 50;
      let ySpacing = 50;

      ["A", "B", "C"].forEach((type, colIndex) => {
        sortedNodes[type].forEach((node, rowIndex) => {
          nodePositions[node.id] = {
            x: 100 + colIndex * 200,
            y: yStart + rowIndex * ySpacing,
          };
        });
      });


      cy.add([
        ...nodes.map((node) => ({
          data: {id: node.id, label: node.label, type: selectedIds.has(node.id) ? "Selected" : node.type},
          position: nodePositions[node.id],
        })),
        ...edges.map((edge) => ({
          data: {source: edge.source, target: edge.target, color: edge.color},
        })),
      ]);

      cy.layout({name: "preset"}).run();
    }


    onMounted(() => {
      cy = cytoscape({
        container: document.getElementById("cy-container"),
        style: [
          {
            selector: "node",
            style: {
              "background-color": (ele) => (ele.data("type") === "Selected" ? "green" : "grey"),
              "label": "data(label)",
              "text-valign": "center",
              "color": "white",
            }
          },
          {
            selector: "edge",
            style: {
              "width": 2,
              "line-color": "data(color)", // Edge color from data
              "curve-style": "bezier",
            }
          }
        ],
      });

      updateGraph(); // initial render
    });

    watch(() => graphStore.filterOptions, updateGraph, {deep: true});
    watch(() => graphStore.viewOptions, updateGraph, {deep: true});

    return {graphStore};
  },

};

</script>

<style>
#cy-container {
  width: 100%;
  height: 100vh;
  border: 1px solid black;
}
</style>