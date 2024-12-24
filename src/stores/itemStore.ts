import { defineStore } from 'pinia';
import type { Item } from '../types';

export const useItemStore = defineStore('items', {
  state: () => ({
    items: [
      {
        id: '1',
        name: 'ESP32 Wroom 32UE',
        amount: '5',
        condition: 'Baik',
        created_at: new Date('2024-01-15')
      },
      {
        id: '2',
        name: 'Monitor Samsung',
        amount: '3',
        condition: 'Baik',
        created_at: new Date('2024-01-20')
      },
      {
        id: '3',
        name: 'Arduino atMega 250',
        amount: '10',
        condition: 'Baik',
        created_at: new Date('2024-02-01')
      }
    ] as Item[]
  }),
  actions: {
    addItem(item: Omit<Item, 'id'>) {
      this.items.push({
        id: crypto.randomUUID(),
        ...item
      });
    },
    deleteItem(id: string) {
      this.items = this.items.filter(item => item.id !== id);
    }
  }
});