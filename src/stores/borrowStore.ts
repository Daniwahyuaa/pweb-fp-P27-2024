import { defineStore } from 'pinia';
import type { BorrowItem } from '../types';

export const useBorrowStore = defineStore('borrows', {
  state: () => ({
    borrowItems: [
      {
        id: '1',
        item_name: 'ESP32 Wroom 32UE',
        amount: '1',
        borrow_date: new Date('2024-02-10'),
        return_date: new Date('2024-02-17'),
        borrower_name: 'RizqTaufan',
        officer_name: 'jiki'
      },
      {
        id: '2',
        item_name: 'Monitor Samsung',
        amount: '1',
        borrow_date: new Date('2024-02-12'),
        return_date: new Date('2024-02-14'),
        borrower_name: 'Daw',
        officer_name: 'dani'
      },
      {
        id: '3',
        item_name: 'Arduino atMega 250',
        amount: '2',
        borrow_date: new Date('2024-02-15'),
        return_date: new Date('2024-02-22'),
        borrower_name: 'Neinstat',
        officer_name: 'andre'
      }
    ] as BorrowItem[]
  }),
  actions: {
    addBorrowItem(item: Omit<BorrowItem, 'id'>) {
      this.borrowItems.push({
        id: crypto.randomUUID(),
        ...item
      });
    },
    deleteBorrowItem(id: string) {
      this.borrowItems = this.borrowItems.filter(item => item.id !== id);
    }
  }
});