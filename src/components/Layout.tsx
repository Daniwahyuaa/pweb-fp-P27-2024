import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { Role } from '../types';

export function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return children;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold">
                Lab KCKS
              </Link>
              
              <div className="ml-10 flex items-baseline space-x-4">
                {user.role === Role.ADMIN && (
                  <>
                    <Link to="/admin" className="px-3 py-2 rounded-md hover:bg-indigo-700">
                      Data Barang
                    </Link>
                    <Link to="/admin/all-operator" className="px-3 py-2 rounded-md hover:bg-indigo-700">
                      Data Petugas
                    </Link>
                    <Link to="/admin/summary" className="px-3 py-2 rounded-md hover:bg-indigo-700">
                      Data Peminjaman
                    </Link>
                  </>
                )}
                
                {user.role === Role.OPERATOR && (
                  <>
                    <Link to="/operator/book-equipment" className="px-3 py-2 rounded-md hover:bg-indigo-700">
                      Form Peminjaman
                    </Link>
                    <Link to="/operator/all-equipment" className="px-3 py-2 rounded-md hover:bg-indigo-700">
                      Data Barang
                    </Link>
                    <Link to="/operator/borrowers" className="px-3 py-2 rounded-md hover:bg-indigo-700">
                      Data Peminjam
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User size={20} />
                <span>{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-indigo-700"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center">© 2024 Lab KCKS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}