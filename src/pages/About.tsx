import { Link } from 'react-router-dom';
const About: React.FC = () => {
  return <div className="bg-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            About Us
          </h1>
          <p className="text-xl text-amber-800 max-w-3xl mx-auto">
            The story of Jose's Kare-Kare and Bulalo Store
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img src="/470201380_122126291132423180_6165366624816461951_n.jpg" alt="Kare-Kare dish" className="w-full h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-semibold text-amber-900 mb-4">
                Our Story
              </h2>
              <p className="text-amber-800 mb-4">
                Jose's Kare-Kare and Bulalo Store currently operates through
                traditional walk-in and phone orders, which limits its ability
                to reach a wider market in the digital age. Customers
                increasingly prefer online ordering platforms that offer
                convenience, personalization, and rewards similar to established
                apps like McDonald's, GrabFood, or Foodpanda. However, Jose's
                store lacks a digital system that can provide these modern
                features.
              </p>
              <p className="text-amber-800 mb-4">
                Our new online platform aims to bridge this gap by bringing our
                authentic Filipino cuisine to the digital world, making it
                easier for customers to enjoy our signature dishes from the
                comfort of their homes.
              </p>
              <div className="mt-6">
                <Link to="/menu" className="px-6 py-3 bg-amber-800 text-white font-semibold rounded-md hover:bg-amber-900 transition">
                  Explore Our Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-amber-100 rounded-full p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center">
              <svg className="w-10 h-10 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2 text-amber-900">
              Authentic Recipes
            </h3>
            <p className="text-amber-800 text-center">
              Our dishes are prepared using traditional Filipino recipes passed
              down through generations.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-amber-100 rounded-full p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center">
              <svg className="w-10 h-10 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2 text-amber-900">
              Quality Ingredients
            </h3>
            <p className="text-amber-800 text-center">
              We use only the freshest and highest quality ingredients in all of
              our dishes.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-amber-100 rounded-full p-6 mb-4 mx-auto w-20 h-20 flex items-center justify-center">
              <svg className="w-10 h-10 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2 text-amber-900">
              Community
            </h3>
            <p className="text-amber-800 text-center">
              We're proud to be a part of the local community, serving delicious
              Filipino food for years.
            </p>
          </div>
        </div>
        <div className="bg-amber-800 text-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Experience Authentic Filipino Cuisine
          </h2>
          <p className="text-lg mb-6">
            Come visit us or order online to enjoy our famous Kare-Kare, Bulalo,
            and other Filipino favorites.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/contact" className="px-6 py-3 bg-white text-amber-800 font-semibold rounded-md hover:bg-amber-100 transition">
              Find Our Location
            </Link>
            <Link to="/menu" className="px-6 py-3 bg-amber-900 text-white font-semibold rounded-md hover:bg-amber-950 transition">
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>;
};
export default About;