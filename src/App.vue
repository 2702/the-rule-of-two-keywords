<template>

  <div class="container">
    <div class="filters-panel">
      <GraphButtons />
    </div>
    <div class="graph-panel">
      <Graph />
    </div>

  </div>


</template>

<script>
import Graph from "@/components/Graph.vue";
import GraphButtons from "@/components/GraphButtons.vue";

export default {
  components: {GraphButtons, Graph }
};

</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.filters-panel {
  width: 50%;
  padding: 20px;
  overflow-y: auto;
  border-right: 2px solid #ccc;
}

.graph-panel {
  width: 50%;
  flex-grow: 1;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

}

</style>
