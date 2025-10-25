import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth"; // ✅ Uses the AuthContext hook

type UserType = "customer" | "admin";

interface LoginForm {
  email: string;
  password: string;
  userType: UserType;
}

interface StoredUser {
  id: string;
  email: string;
  password: string;
  userType: UserType;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  deliveryAddress?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
    userType: "customer",
  });

  const [error, setError] = useState<string | null>(null);
  const [existingUsers, setExistingUsers] = useState<StoredUser[]>([]);

  const adminCredentials: StoredUser = {
    id: "admin-001",
    email: "admin@account.com",
    password: "admin123",
    userType: "admin",
  };

  useEffect(() => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]") as StoredUser[];
      setExistingUsers(users);
    } catch {
      setExistingUsers([]);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ✅ ADMIN LOGIN
    if (formData.userType === "admin") {
      if (
        formData.email === adminCredentials.email &&
        formData.password === adminCredentials.password
      ) {
        localStorage.setItem("authUser", JSON.stringify(adminCredentials));
        login(adminCredentials);
        navigate("/admin");
      } else {
        setError("Unauthorized: Only admin@account.com can access the admin dashboard.");
      }
      return;
    }

    // ✅ CUSTOMER LOGIN
    const matchedUser = existingUsers.find(
      (user) =>
        user.email === formData.email &&
        user.password === formData.password &&
        user.userType === "customer"
    );

    if (!matchedUser) {
      setError("Invalid customer email or password.");
      return;
    }

    localStorage.setItem("authUser", JSON.stringify(matchedUser));
    login(matchedUser);
    navigate("/customer");
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-center text-3xl font-extrabold text-amber-900">
          Sign in to your account
        </h1>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* User Type Selection */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="userType"
                value="customer"
                checked={formData.userType === "customer"}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-amber-600"
              />
              <span className="ml-2 text-amber-900">Customer</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="userType"
                value="admin"
                checked={formData.userType === "admin"}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-amber-600"
              />
              <span className="ml-2 text-amber-900">Admin</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800">
              Email address
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              title="Email address"
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-800">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              title="Password"
              className="mt-1 block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-800 hover:bg-amber-900"
            >
              Sign In
            </button>
          </div>

          <p className="text-sm text-center text-amber-800">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-amber-800 hover:text-amber-700"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
