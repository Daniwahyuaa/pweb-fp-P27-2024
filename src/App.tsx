import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { useAuthStore } from './store/auth';
import { Role } from './types';

// Protected Route Component
function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode;
  allowedRoles: Role[];
}) {
  const user = useAuthStore((state) => state.user);

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <div>Admin Dashboard - Data Barang</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/all-operator"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <div>Admin - Data Petugas</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/summary"
            element={
              <ProtectedRoute allowedRoles={[Role.ADMIN]}>
                <div>Admin - Data Peminjaman</div>
              </ProtectedRoute>
            }
          />
          
          {/* Operator Routes */}
          <Route
            path="/operator/book-equipment"
            element={
              <ProtectedRoute allowedRoles={[Role.OPERATOR]}>
                <div>Operator - Form Peminjaman</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operator/all-equipment"
            element={
              <ProtectedRoute allowedRoles={[Role.OPERATOR]}>
                <div>Operator - Data Barang</div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/operator/borrowers"
            element={
              <ProtectedRoute allowedRoles={[Role.OPERATOR]}>
                <div>Operator - Data Peminjam</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;