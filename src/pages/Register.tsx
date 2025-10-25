import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  type RegisterForm = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    deliveryAddress: string;
    agreeToTerms: boolean;
    userType: 'customer'; // 👈 force customer
  };

  type FormErrors = Partial<Record<keyof RegisterForm | 'general', string | null>>;

  type StoredUser = {
    id: string;
    email: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    contactNumber?: string;
    deliveryAddress?: string;
    userType: 'customer'; // 👈 only customer accounts allowed
  };

  const [formData, setFormData] = useState<RegisterForm>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    deliveryAddress: '',
    agreeToTerms: false,
    userType: 'customer',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [existingUsers, setExistingUsers] = useState<StoredUser[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing users
  useEffect(() => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]') as StoredUser[];
      setExistingUsers(users);
    } catch {
      setExistingUsers([]);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    } else if (existingUsers.some((u) => u.email === formData.email)) {
      newErrors.email = 'This email is already registered';
    }

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';

    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact number is required';
    } else if (!/^\+?\d{10,15}$/.test(formData.contactNumber.replace(/\s/g, ''))) {
      newErrors.contactNumber = 'Please enter a valid phone number';
    }

    if (!formData.deliveryAddress)
      newErrors.deliveryAddress = 'Delivery address is required';

    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      const newUser: StoredUser = {
        id: Date.now().toString(),
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        fullName: `${formData.firstName} ${formData.lastName}`,
        contactNumber: formData.contactNumber,
        deliveryAddress: formData.deliveryAddress,
        userType: 'customer', // 👈 enforce customer account
      };

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      alert('Registration successful! You can now log in.');
      navigate('/login');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-center text-3xl font-extrabold text-amber-900">
          Create your account
        </h1>
        <p className="mt-2 text-center text-sm text-amber-800">
          Or{' '}
          <Link to="/login" className="font-medium text-amber-800 hover:text-amber-700">
            sign in to your existing account
          </Link>
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* 👇 REMOVE the admin/customer selection entirely */}
          {/* All users register as customers */}

          <div className="rounded-md shadow-sm space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-amber-800">
                  First Name*
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className={`mt-1 block w-full border ${
                    errors.firstName ? 'border-red-300' : 'border-amber-300'
                  } rounded-md shadow-sm`}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-amber-800">
                  Last Name*
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className={`mt-1 block w-full border ${
                    errors.lastName ? 'border-red-300' : 'border-amber-300'
                  } rounded-md shadow-sm`}
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-amber-800">
                Email address*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className={`mt-1 block w-full border ${
                  errors.email ? 'border-red-300' : 'border-amber-300'
                } rounded-md shadow-sm`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* Contact */}
            <div>
              <label htmlFor="contactNumber" className="block text-sm font-medium text-amber-800">
                Mobile Number*
              </label>
              <input
                id="contactNumber"
                name="contactNumber"
                type="tel"
                required
                placeholder="+63 912 345 6789"
                className={`mt-1 block w-full border ${
                  errors.contactNumber ? 'border-red-300' : 'border-amber-300'
                } rounded-md shadow-sm`}
                value={formData.contactNumber}
                onChange={handleChange}
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-xs">{errors.contactNumber}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="deliveryAddress" className="block text-sm font-medium text-amber-800">
                Delivery Address*
              </label>
              <textarea
                id="deliveryAddress"
                name="deliveryAddress"
                rows={3}
                required
                placeholder="Complete street address, barangay, city"
                className={`mt-1 block w-full border ${
                  errors.deliveryAddress ? 'border-red-300' : 'border-amber-300'
                } rounded-md shadow-sm`}
                value={formData.deliveryAddress}
                onChange={handleChange}
              />
              {errors.deliveryAddress && (
                <p className="text-red-500 text-xs">{errors.deliveryAddress}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-amber-800">
                Password*
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`mt-1 block w-full border ${
                  errors.password ? 'border-red-300' : 'border-amber-300'
                } rounded-md shadow-sm`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-amber-800">
                Confirm Password*
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className={`mt-1 block w-full border ${
                  errors.confirmPassword ? 'border-red-300' : 'border-amber-300'
                } rounded-md shadow-sm`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-center">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                className="h-4 w-4 text-amber-600 border-amber-300 rounded"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-amber-900">
                I agree to the{' '}
                <Link to="/terms" className="text-amber-800 hover:text-amber-700">
                  Terms and Conditions
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-2 px-4 text-sm font-medium rounded-md text-white ${
                isSubmitting ? 'bg-amber-600 cursor-not-allowed' : 'bg-amber-800 hover:bg-amber-900'
              }`}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
