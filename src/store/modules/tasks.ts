import { Module } from 'vuex';
import { api, Task } from '@/api/tasks';

export interface TasksState {
  items: Task[];
  filter: 'all' | 'active' | 'completed';
}

export const tasks: Module<TasksState, unknown> = {
  namespaced: true,
  state: () => ({ items: [], filter: 'all' }),

  getters: {
    filtered: ({ items, filter }) => {
      switch (filter) {
        case 'active':
          return items.filter((t) => !t.completed);
        case 'completed':
          return items.filter((t) => t.completed);
        default:
          return items;
      }
    },
  },

  mutations: {
    setItems(s, payload: Task[]) {
      s.items = payload;
    },
    addItem(s, t: Task) {
      s.items.push(t);
    },
    removeItem(s, id: number) {
      s.items = s.items.filter((t) => t.id !== id);
    },
    updateItem(s, t: Task) {
      const idx = s.items.findIndex((x) => x.id === t.id);
      if (idx !== -1) s.items[idx] = t;
    },
    setFilter(s, f: TasksState['filter']) {
      s.filter = f;
    },
  },

  actions: {
    async load({ commit }) {
      const list = await api.fetchAll();
      commit('setItems', list);
    },
    async add({ commit }, title: string) {
      const t = await api.create(title);
      commit('addItem', t);
    },
    async remove({ commit }, id: number) {
      await api.remove(id);
      commit('removeItem', id);
    },
    async toggle({ commit, state }, id: number) {
      const task = state.items.find((t) => t.id === id);
      if (!task) return;
      const updated = await api.update({ ...task, completed: !task.completed });
      commit('updateItem', updated);
    },
    setFilter({ commit }, filter: TasksState['filter']) {
      commit('setFilter', filter);
    },
  },
};
