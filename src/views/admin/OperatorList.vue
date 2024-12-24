<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '../../types';
import { Role } from '../../types';
import { useOperatorStore } from '../../stores/operatorStore';

const operatorStore = useOperatorStore();
const showAddModal = ref(false);
const newOperator = ref({
  username: '',
  password: '',
  role: Role.USER
});

const addOperator = () => {
  operatorStore.addOperator(newOperator.value);
  showAddModal.value = false;
  newOperator.value = {
    username: '',
    password: '',
    role: Role.USER
  };
};

const deleteOperator = (username: string) => {
  operatorStore.deleteOperator(username);
};
</script>

<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Data Petugas</h2>
      <button
        @click="showAddModal = true"
        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Tambah Petugas
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="operator in operatorStore.operators" :key="operator.username">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ operator.username }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ operator.role }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <button
                @click="deleteOperator(operator.username)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Operator Modal -->
    <div v-if="showAddModal" class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Tambah Petugas Baru</h3>
        <form @submit.prevent="addOperator">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Username</label>
              <input
                v-model="newOperator.username"
                type="text"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Password</label>
              <input
                v-model="newOperator.password"
                type="password"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="showAddModal = false"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>