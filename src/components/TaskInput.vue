<template>
  <div class="task-input">
    <input v-model.trim="title" @keyup.enter="add" placeholder="Новая задача" />
    <button :disabled="!title" @click="add">Добавить</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const title = ref('');
    const add = async () => {
      if (!title.value) return;
      await store.dispatch('tasks/add', title.value);
      title.value = '';
    };
    return { title, add };
  },
});
</script>

<style scoped>
.task-input {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
input {
  flex: 1;
  padding: 4px;
}
button {
  padding: 4px 12px;
}
</style>
