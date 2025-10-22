import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

type Address = {
  id: number;
  name: string;
  address: string;
  isDefault: boolean;
};

type ProfileState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: Address[];
  loyaltyPoints: number;
};

type PasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type NewAddress = {
  name: string;
  address: string;
  isDefault: boolean;
};

type MessageState = { type: string; text: string };
const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const {
    user,
    isLoggedIn
  } = useAuth();
  const navigate = useNavigate();
  // User profile state
  const [profile, setProfile] = useState<ProfileState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addresses: [],
    loyaltyPoints: 0
  });
  // Password change state
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  // New address state
  const [newAddress, setNewAddress] = useState<NewAddress>({
    name: '',
    address: '',
    isDefault: false
  });
  // Status messages
  const [message, setMessage] = useState<MessageState>({
    type: '',
    text: ''
  });
  // Load user profile data
  useEffect(() => {
    if (!isLoggedIn || !user) {
      navigate('/login');
      return;
    }
    // Load profile from localStorage
    const savedProfile = localStorage.getItem(`profile_${user.email}`);
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile({
        firstName: parsedProfile.firstName || '',
        lastName: parsedProfile.lastName || '',
        email: parsedProfile.email || user.email || '',
        phone: parsedProfile.contactNumber || '',
        addresses: parsedProfile.addresses || [],
        loyaltyPoints: parsedProfile.loyaltyPoints || 0
      });
    } else {
      // Initialize with data from auth context if available
      setProfile({
        firstName: user.name ? user.name.split(' ')[0] : '',
        lastName: user.name ? user.name.split(' ')[1] || '' : '',
        email: user.email || '',
        phone: '',
        addresses: [],
        loyaltyPoints: 0
      });
    }
  }, [user, isLoggedIn, navigate]);
  // Handle personal info changes
  const handlePersonalInfoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value } as ProfileState));
  };
  // Handle password changes
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value } as PasswordData));
  };
  // Handle new address changes
  const handleNewAddressChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setNewAddress(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value } as NewAddress));
  };
  // Save personal information
  const savePersonalInfo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoggedIn || !user) {
      navigate('/login');
      return;
    }
    // Create updated profile to save
    const updatedProfile = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      contactNumber: profile.phone,
      addresses: profile.addresses,
      loyaltyPoints: profile.loyaltyPoints
    };
    // Save to localStorage
    if (user && user.email) {
      localStorage.setItem(`profile_${user.email}`, JSON.stringify(updatedProfile));
    }
    // Show success message
    setMessage({ type: 'success', text: 'Personal information updated successfully!' });
    // Clear message after 3 seconds
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };
  // Save password changes
  const savePasswordChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simple validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match!' });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters!' });
      return;
    }
    // In a real app, you would verify the current password and update it in the backend
    // For this demo, we'll just show a success message
    setMessage({ type: 'success', text: 'Password updated successfully!' });
    // Reset form
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    // Clear message after 3 seconds
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };
  // Add a new address
  const addNewAddress = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newAddress.name || !newAddress.address) {
      setMessage({ type: 'error', text: 'Please fill out all address fields!' });
      return;
    }
    // Create new address object
    const addressToAdd: Address = {
      id: Date.now(),
      name: newAddress.name,
      address: newAddress.address,
      isDefault: newAddress.isDefault || profile.addresses.length === 0 // Make first address default if none exists
    };
    // If this is set as default, update other addresses
    let updatedAddresses: Address[] = [...profile.addresses];
    if (addressToAdd.isDefault) {
      // Remove default from all other addresses
      updatedAddresses = updatedAddresses.map(addr => ({ ...addr, isDefault: false }));
    }
    // Add the new address
    updatedAddresses = [...updatedAddresses, addressToAdd];
    // Update profile
    const updatedProfile = { ...profile, addresses: updatedAddresses };
    setProfile(updatedProfile);
    // Save to localStorage
    if (user && user.email) {
      localStorage.setItem(`profile_${user.email}`, JSON.stringify({
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        email: updatedProfile.email,
        contactNumber: updatedProfile.phone,
        addresses: updatedProfile.addresses,
        loyaltyPoints: updatedProfile.loyaltyPoints
      }));
    }
    // Reset form
    setNewAddress({ name: '', address: '', isDefault: false });
    // Show success message
    setMessage({ type: 'success', text: 'Address added successfully!' });
    // Clear message after 3 seconds
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };
  // Delete address
  const deleteAddress = (id: number) => {
    const updatedAddresses = profile.addresses.filter(addr => addr.id !== id);
    // Update profile
    const updatedProfile = { ...profile, addresses: updatedAddresses };
    setProfile(updatedProfile);
    // Save to localStorage
    if (user && user.email) {
      localStorage.setItem(`profile_${user.email}`, JSON.stringify({
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        email: updatedProfile.email,
        contactNumber: updatedProfile.phone,
        addresses: updatedProfile.addresses,
        loyaltyPoints: updatedProfile.loyaltyPoints
      }));
    }
    // Show success message
    setMessage({ type: 'success', text: 'Address deleted successfully!' });
    // Clear message after 3 seconds
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };
  // Set address as default
  const setDefaultAddress = (id: number) => {
    // Update addresses with new default
    const updatedAddresses = profile.addresses.map(addr => ({ ...addr, isDefault: addr.id === id }));
    // Update profile
    const updatedProfile = { ...profile, addresses: updatedAddresses };
    setProfile(updatedProfile);
    // Save to localStorage
    if (user && user.email) {
      localStorage.setItem(`profile_${user.email}`, JSON.stringify({
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        email: updatedProfile.email,
        contactNumber: updatedProfile.phone,
        addresses: updatedProfile.addresses,
        loyaltyPoints: updatedProfile.loyaltyPoints
      }));
    }
    // Show success message
    setMessage({ type: 'success', text: 'Default address updated!' });
    // Clear message after 3 seconds
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };
  // If not authenticated, show loading state
  if (!isLoggedIn || !user) {
    return <div className="flex justify-center items-center min-h-screen bg-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800 mx-auto"></div>
          <p className="mt-4 text-amber-800">Loading profile...</p>
        </div>
      </div>;
  }
  return <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link to="/customer" className="text-orange-600 hover:text-orange-800 flex items-center">
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Dashboard
          </Link>
        </div>
        {/* Status message */}
        {message.text && <div className={`mb-4 p-3 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-900">
              Your Profile
            </h1>
          </div>
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button onClick={() => setActiveTab('personal')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'personal' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Personal Information
              </button>
              <button onClick={() => setActiveTab('addresses')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'addresses' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Addresses
              </button>
              <button onClick={() => setActiveTab('password')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'password' ? 'border-orange-500 text-orange-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                Change Password
              </button>
            </nav>
          </div>
          <div className="p-6">
            {activeTab === 'personal' && <div>
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-900">
                      Personal Information
                    </h2>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {profile.loyaltyPoints} Loyalty Points
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Update your personal details and contact information.
                  </p>
                </div>
                <form onSubmit={savePersonalInfo}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input type="text" id="firstName" name="firstName" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" value={profile.firstName} onChange={handlePersonalInfoChange} />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input type="text" id="lastName" name="lastName" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" value={profile.lastName} onChange={handlePersonalInfoChange} />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" value={profile.email} onChange={handlePersonalInfoChange} />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input type="tel" id="phone" name="phone" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" value={profile.phone} onChange={handlePersonalInfoChange} />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>}
            {activeTab === 'addresses' && <div>
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Delivery Addresses
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage your delivery addresses for faster checkout.
                  </p>
                  {/* Existing addresses */}
                  <div className="space-y-4 mb-6">
                    {profile.addresses.length === 0 ? <div className="text-center py-4 text-gray-500">
                        You haven't added any addresses yet.
                      </div> : profile.addresses.map(address => <div key={address.id} className="border border-gray-200 rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <h3 className="font-medium text-gray-900">
                                  {address.name}
                                </h3>
                                {address.isDefault && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Default
                                  </span>}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                {address.address}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              {!address.isDefault && <button className="text-orange-600 hover:text-orange-800" onClick={() => setDefaultAddress(address.id)}>
                                  Set as Default
                                </button>}
                              <button className="text-red-600 hover:text-red-800" onClick={() => deleteAddress(address.id)}>
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>)}
                  </div>
                  {/* Add new address form */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-md font-medium text-gray-900 mb-3">
                      Add New Address
                    </h3>
                    <form onSubmit={addNewAddress}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address Name
                          </label>
                          <input type="text" name="name" value={newAddress.name} onChange={handleNewAddressChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="Home, Office, etc." />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Address
                          </label>
                          <textarea name="address" value={newAddress.address} onChange={handleNewAddressChange} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" placeholder="Street, Barangay, City, etc." />
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="isDefault" name="isDefault" checked={newAddress.isDefault} onChange={handleNewAddressChange} className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                          <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                            Set as default address
                          </label>
                        </div>
                        <div>
                          <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                            Add Address
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>}
            {activeTab === 'password' && <div>
                <div className="mb-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Change Password
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Update your password to keep your account secure.
                  </p>
                </div>
                <form onSubmit={savePasswordChanges}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input type="password" id="currentPassword" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input type="password" id="newPassword" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                      <p className="text-xs text-gray-500 mt-1">
                        Password must be at least 6 characters.
                      </p>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input type="password" id="confirmPassword" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button type="submit" className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                      Update Password
                    </button>
                  </div>
                </form>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default UserProfile;