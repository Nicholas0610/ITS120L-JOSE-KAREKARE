import { Navigate } from "react-router-dom";
import { useAuth } from '../contexts/useAuth';

interface ProtectedRouteProps {
  children: JSX.Element;
  requiredUserType?: "admin" | "customer" | "delivery";
}

const ProtectedRoute = ({ children, requiredUserType }: ProtectedRouteProps) => {
  const { user, isLoggedIn, isLoading } = useAuth();

  // Wait for auth to load before rendering
  if (isLoading) return <div>Loading...</div>;

  // Not logged in → redirect to login
  if (!isLoggedIn || !user) return <Navigate to="/login" replace />;

  // If route has a required user type, and it doesn’t match → block access
  if (requiredUserType && user.userType !== requiredUserType) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-red-50">
        <h1 className="text-2xl font-bold text-red-600 mb-2">
          Unauthorized Access
        </h1>
        <p className="text-gray-700 mb-4">
          You do not have permission to view this page.
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Go back to Home
        </a>
      </div>
    );
  }

  // Access granted
  return children;
};

export default ProtectedRoute;
