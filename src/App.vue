<template>
  <div id="app">
    <h1>Список задач</h1>
    <TaskInput />
    <TaskFilter />
    <TaskList />
  </div>
</template>

<script lang="ts">
import TaskInput from './components/TaskInput.vue';
import TaskFilter from './components/TaskFilter.vue';
import TaskList from './components/TaskList.vue';

export default { components: { TaskInput, TaskFilter, TaskList } };
</script>

<style>
#app {
  max-width: 480px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
}
h1 {
  text-align: center;
  margin-bottom: 24px;
}
</style>
