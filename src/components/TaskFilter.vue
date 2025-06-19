<template>
  <div class="filters">
    <button
      v-for="f in options"
      :key="f.value"
      :class="{ active: current === f.value }"
      @click="set(f.value)">
      {{ f.label }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

const options = [
  { label: 'Все', value: 'all' },
  { label: 'Активные', value: 'active' },
  { label: 'Выполненные', value: 'completed' },
];

export default defineComponent({
  setup() {
    const store = useStore();
    const current = computed(() => store.state.tasks.filter);
    const set = (f: string) => store.dispatch('tasks/setFilter', f);
    return { options, current, set };
  },
});
</script>

<style scoped>
.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
button {
  padding: 4px 8px;
}
.active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
