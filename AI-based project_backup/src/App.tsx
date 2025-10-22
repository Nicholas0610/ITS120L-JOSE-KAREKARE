import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ChatBot from './components/ChatBot';
import CookieConsent from './components/CookieConsent';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import QuickAccess from './components/QuickAccess';
import { AuthProvider } from './contexts/AuthContext';
import About from './pages/About';
import AddOrder from './pages/AddOrder';
import AdminDashboard from './pages/AdminDashboard';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import CustomerDashboard from './pages/CustomerDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import FAQ from './pages/FAQ';
import FileComplaint from './pages/FileComplaint';
import Help from './pages/Help';
import Home from './pages/Home';
import Login from './pages/Login';
import Menu from './pages/Menu';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderDetails from './pages/OrderDetails';
import OrdersList from './pages/OrdersList';
import Payment from './pages/Payment';
import Privacy from './pages/Privacy';
import Register from './pages/Register';
import Terms from './pages/Terms';
import UserProfile from './pages/UserProfile';
export function App() {
  useEffect(() => {
    // noop for now - cookie consent persisted elsewhere; keep effect minimal
    void localStorage.getItem('cookieConsent');
  }, []);
  return <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-amber-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/customer" element={<ProtectedRoute requiredUserType="customer">
                    <CustomerDashboard />
                  </ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute requiredUserType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>} />
              <Route path="/delivery" element={<ProtectedRoute requiredUserType="delivery">
                    <DeliveryDashboard />
                  </ProtectedRoute>} />
              <Route path="/order/:id" element={<ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/help" element={<Help />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/checkout" element={<ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>} />
              <Route path="/payment" element={<ProtectedRoute>
                    <Payment />
                  </ProtectedRoute>} />
              <Route path="/order-confirmation" element={<ProtectedRoute>
                    <OrderConfirmation />
                  </ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute>
                    <OrdersList />
                  </ProtectedRoute>} />
              <Route path="/add-order" element={<ProtectedRoute>
                    <AddOrder />
                  </ProtectedRoute>} />
              <Route path="/complaint/:orderId" element={<ProtectedRoute>
                    <FileComplaint />
                  </ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
          <CookieConsent />
          <ChatBot />
          <QuickAccess />
        </div>
      </AuthProvider>
    </Router>;
}