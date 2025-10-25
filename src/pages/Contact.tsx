import { ChangeEvent, FormEvent, useState } from 'react';
const Contact = () => {
  const [formData, setFormData] = useState<{ name: string; email: string; subject: string; message: string }>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  return <div className="bg-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
            We'd love to hear from you. Reach out with any questions or feedback
            about our food and services.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-amber-900 mb-4">
              Send Us a Message
            </h2>
            {formSubmitted ? <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                Thank you for your message! We'll get back to you soon.
              </div> : null}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-1">
                  Your Name
                </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-1">
                  Email Address
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-amber-900 mb-1">
                  Subject
                </label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-amber-900 mb-1">
                  Message
                </label>
                <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} className="w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500" required></textarea>
              </div>
              <div>
                <button type="submit" className="w-full px-4 py-2 bg-amber-800 text-white font-semibold rounded-md hover:bg-amber-900 transition">
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold text-amber-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-3 text-amber-800">
                    <p className="font-medium">Address</p>
                    <p>205 A. Arnaiz St. Libertad, Pasay City</p>
                    <p>Infront of Rusi Motors Libertad, Pasay City</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div className="ml-3 text-amber-800">
                    <p className="font-medium">Phone</p>
                    <p>09079222970</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div className="ml-3 text-amber-800">
                    <p className="font-medium">Email</p>
                    <p>info@joseskarekare.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div className="ml-3 text-amber-800">
                    <p className="font-medium">Hours</p>
                    <p>Monday - Sunday: 10:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-amber-900 mb-4">
                Find Us
              </h2>
              <div className="relative w-full h-72 rounded-md overflow-hidden">
                <iframe title="Map to Jose's Kare-Kare and Bulalo House" src="https://www.google.com/maps?q=14.5379,121.001&hl=en&z=15&output=embed" width="100%" height="100%" className="map-iframe" allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
              <div className="mt-4 text-center">
                <p className="text-amber-800">
                  205 A. Arnaiz St. Libertad, Pasay City, Philippines
                </p>
                <p className="text-amber-800 mt-2">
                  <a href="https://maps.google.com/?q=14.5379,121.001" target="_blank" rel="noopener noreferrer" className="text-amber-800 underline hover:text-amber-900">
                    Get Directions
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Contact;