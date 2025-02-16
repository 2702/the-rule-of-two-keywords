<template>
  <div>
    <h1>Graph Toggles</h1>

    <div>
      <h2>View toggles</h2>
      <div v-for="(options, type) in optionsSpace" :key="type">
        <h3> {{ type }} </h3>
        <div>
          <button
              v-for="option in options"
              :key="option"
              @click="toggleView(type, option)"
              :class="{ active: isViewActive(type, option) }"
          >{{ option }}</button>
        </div>
        <button @click="clearView(type)">Clear {{ type }}</button>
        <button @click="selectAllViewsOf(type)">Select all {{ type }}</button>
      </div>
      <h3>whole set</h3>
      <button @click="resetViews">Reset</button>
      <button @click="selectAllViews">Select all</button>
    </div>

    <hr/>

    <div>
      <h2>Filter toggles</h2>
      <div v-for="(options, type) in optionsSpace" :key="type">
        <h3> {{ type }} </h3>
        <div>
          <button
              v-for="option in options"
              :key="option"
              @click="toggleFilter(type, option)"
              :class="{ active: isFilterActive(type, option) }"
          >{{ option }}</button>
        </div>
        <button @click="clearFilter(type)">Clear {{ type }}</button>
        <button @click="selectAllFiltersOf(type)">Select all {{ type }}</button>
      </div>
      <h3>whole set</h3>
      <button @click="resetFilters">Reset</button>
      <button @click="selectAllFilters">Select all</button>
    </div>


  </div>
</template>

<script>
import {useGraphStore } from "../stores/GraphStore.js";
import {onMounted} from "vue";

export default {
  setup() {
    const graphStore = useGraphStore();

    const optionsSpace = graphStore.optionsSpace;

    // view
    function toggleView(type, option) {
      graphStore.toggleView(option, type);
    }

    function isViewActive(type, option) {
      return graphStore.viewOptions[type].has(option);
    }

    function clearView(type) {
      graphStore.clearViews(type);
    }

    function resetViews() {
      graphStore.resetViews();
    }

    function selectAllViews() {
      graphStore.selectAllViews();
    }

    function selectAllViewsOf(type) {
      graphStore.selectAllViewsOf(type);
    }


    // filter
    function toggleFilter(type, option) {
      graphStore.toggleFilter(option, type);
    }

    function isFilterActive(type, option) {
      return graphStore.filterOptions[type].has(option);
    }

    function clearFilter(type) {
      graphStore.clearFilters(type);
    }

    function resetFilters() {
      graphStore.resetFilters();
    }

    function selectAllFilters() {
      graphStore.selectAllFilters();
    }

    function selectAllFiltersOf(type) {
      graphStore.selectAllFiltersOf(type);
    }

    onMounted(() => {
      graphStore.applyFiltersFromUrl();
    })

    return { optionsSpace, toggleView, isViewActive, clearView, resetViews, selectAllViews, selectAllViewsOf,
          toggleFilter, isFilterActive, clearFilter, resetFilters, selectAllFilters, selectAllFiltersOf };
  }
}
</script>


<style scoped>
button {
  margin: 5px;
  padding: 10px;
  border: none;
  cursor: pointer;
  background: lightgray;
}
button.active {
  background: green;
  color: white;
}


</style>