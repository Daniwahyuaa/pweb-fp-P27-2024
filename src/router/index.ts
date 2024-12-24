import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue';
import RulesPage from '../views/RulesPage.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import ItemList from '../views/admin/ItemList.vue';
import OperatorList from '../views/admin/OperatorList.vue';
import BorrowSummary from '../views/admin/BorrowSummary.vue';

const routes = [
  // Rute untuk halaman login dan rules
  {
    path: '/',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/rules',
    name: 'rules',
    component: RulesPage,
  },

  // Rute untuk admin layout dengan nested routes
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'items',
        component: ItemList,
      },
      {
        path: 'all-operator',
        name: 'operators',
        component: OperatorList,
      },
      {
        path: 'summary',
        name: 'summary',
        component: BorrowSummary,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
