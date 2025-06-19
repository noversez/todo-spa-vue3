<template>
  <ul class="task-list">
    <li v-for="t in tasks" :key="t.id">
      <label>
        <input type="checkbox" :checked="t.completed" @change="toggle(t.id)" />
        <span :class="{ done: t.completed }">{{ t.title }}</span>
      </label>
      <button @click="remove(t.id)">✕</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const tasks = computed(() => store.getters['tasks/filtered']);

    onMounted(() => store.dispatch('tasks/load'));
    const toggle = (id: number) => store.dispatch('tasks/toggle', id);
    const remove = (id: number) => store.dispatch('tasks/remove', id);

    return { tasks, toggle, remove };
  },
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 0;
}
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
