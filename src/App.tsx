import { AuthProvider } from "./hooks/useAuth";
import { Toaster } from "./components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import DonateMedicine from "./pages/DonateMedicine";
import NGOMap from "./pages/NGOMap";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  return user ? children : <Navigate to="/auth" replace />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/donate-medicine" element={<ProtectedRoute><DonateMedicine /></ProtectedRoute>} />
      <Route path="/ngo-map" element={<ProtectedRoute><NGOMap /></ProtectedRoute>} />
    </Routes>
  </QueryClientProvider>
);

export default App;