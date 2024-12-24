<script setup lang="ts">
import { ref } from 'vue';
import { useBorrowStore } from '../../stores/borrowStore';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const borrowStore = useBorrowStore();

const generatePDF = () => {
  const doc = new jsPDF();
  
  doc.text('Laporan Peminjaman Barang', 14, 15);
  doc.text('Lab KCKS', 14, 25);
  
  const tableColumn = ["No", "Nama Barang", "Jumlah", "Tgl Pinjam", "Tgl Kembali", "Peminjam", "Petugas"];
  const tableRows = borrowStore.borrowItems.map((item, index) => [
    index + 1,
    item.item_name,
    item.amount,
    new Date(item.borrow_date).toLocaleDateString(),
    new Date(item.return_date).toLocaleDateString(),
    item.borrower_name,
    item.officer_name
  ]);

  (doc as any).autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 35,
  });

  doc.save('laporan-peminjaman.pdf');
};
</script>

<template>
  <div class="bg-white shadow rounded-lg p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Data Peminjaman</h2>
      <button
        @click="generatePDF"
        class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
      >
        Cetak PDF
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Barang
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jumlah Pinjam
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tgl. Pinjam
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tgl. Kembali
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Peminjam
            </th>
            <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Petugas
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(item, index) in borrowStore.borrowItems" :key="item.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.item_name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.amount }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ new Date(item.borrow_date).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ new Date(item.return_date).toLocaleDateString() }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.borrower_name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.officer_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>