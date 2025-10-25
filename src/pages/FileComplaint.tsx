import { ArrowLeftIcon, UploadIcon } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

type OrderType = {
  id: string;
  date: string;
  status: string;
  total: number;
};

type ComplaintType = {
  id: number;
  orderId: string;
  customerId: string;
  customer: string;
  date: string;
  description: string;
  imageUrl?: string;
  status: string;
  dateSubmitted: string;
};

type UserPartial = { id?: string; name?: string; email?: string } | null;

const FileComplaint: React.FC = () => {
  const { orderId } = useParams<{ orderId?: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [order, setOrder] = useState<OrderType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ description: '', imageUrl: '' });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]') as OrderType[];
    const currentOrder = savedOrders.find((o) => o.id === orderId);
    if (currentOrder) {
      setOrder(currentOrder);
    } else {
      navigate('/orders');
    }
    setIsLoading(false);
  }, [orderId, user, navigate]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement & HTMLTextAreaElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, imageUrl }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.description.trim()) newErrors.description = 'Please describe your issue';
    else if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!order || !user) {
      alert('Order or user information is missing.');
      return;
    }
    setIsSubmitting(true);
    const u = user as unknown as UserPartial;
    const customerId = u?.id ?? u?.email ?? 'unknown';
    const customerName = u?.name ?? u?.email ?? 'Unknown';

    const complaint: ComplaintType = {
      id: Date.now(),
      orderId: order.id,
      customerId,
      customer: customerName,
      date: new Date().toISOString(),
      description: formData.description,
      imageUrl: formData.imageUrl || undefined,
      status: 'Open',
      dateSubmitted: new Date().toISOString()
    };

    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]') as ComplaintType[];
    complaints.push(complaint);
    localStorage.setItem('complaints', JSON.stringify(complaints));

    alert('Your complaint has been submitted. We will review it shortly.');
    navigate('/orders');
    setIsSubmitting(false);
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen bg-amber-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-800" />
    </div>
  );

  if (!order) return (
    <div className="bg-amber-50 min-h-screen py-8 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Order not found</h2>
        <p className="text-amber-800 mb-6">We couldn't find the order for filing a complaint.</p>
        <button onClick={() => navigate('/orders')} className="px-4 py-2 bg-amber-800 text-white rounded-md">Back to Orders</button>
      </div>
    </div>
  );

  return (
    <div className="bg-amber-50 min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="mr-4 text-amber-800 hover:text-amber-900" aria-label="Go back" title="Go back">
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-semibold text-amber-900">File a Complaint</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-amber-800 mb-2">Order Information</h2>
            <div className="bg-amber-50 rounded-md p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID:</p>
                  <p className="font-medium">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date:</p>
                  <p className="font-medium">{new Date(order.date).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status:</p>
                  <p className="font-medium">{order.status}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total:</p>
                  <p className="font-medium">₱{order.total.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Describe your issue*</label>
              <textarea id="description" name="description" rows={5} value={formData.description} onChange={handleChange} className={`w-full px-3 py-2 border ${errors.description ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500`} placeholder="Please provide details about your issue..." />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload a photo (optional)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  {formData.imageUrl ? (
                    <div>
                      <img src={formData.imageUrl} alt="Uploaded" className="mx-auto h-32 w-auto" />
                      <button type="button" onClick={() => setFormData((p) => ({ ...p, imageUrl: '' }))} className="mt-2 text-sm text-red-600 hover:text-red-800">Remove</button>
                    </div>
                  ) : (
                    <div>
                      <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-amber-800 hover:text-amber-900 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" onClick={() => navigate(-1)} className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancel</button>
              <button type="submit" disabled={isSubmitting} className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting ? 'bg-amber-600 cursor-not-allowed' : 'bg-amber-800 hover:bg-amber-900'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500`}>{isSubmitting ? 'Submitting...' : 'Submit Complaint'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FileComplaint;