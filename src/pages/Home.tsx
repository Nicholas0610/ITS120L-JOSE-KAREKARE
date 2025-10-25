import { Link } from 'react-router-dom';
import FeaturedItems from '../components/FeaturedItems';
const Home = () => {
  return <div className="w-full">
      {/* Hero Section with Food Background */}
      <section className="relative text-white">
        <div className="absolute inset-0 bg-black opacity-60 z-10"></div>
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full">
            <img src="/458535220_1618145195463539_5856557017954625555_n.png" alt="Kare-Kare dish" className="w-full h-full object-cover" />
          </div>
          <div className="w-1/2 h-full">
            <img src="/Bulalo.jpg" alt="Bulalo dish" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 relative z-20">
          <div className="md:w-2/3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight">
              Delicious Filipino Cuisine, Delivered to Your Door
            </h1>
            <p className="text-lg sm:text-xl mb-8 md:mb-10">
              Experience authentic Filipino dishes with our AI-powered food
              ordering system that personalizes your dining experience.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/menu" className="px-8 py-3 bg-amber-50 text-amber-900 font-semibold rounded-md text-center hover:bg-amber-100 transition">
                Browse Menu
              </Link>
              <Link to="/register" className="px-8 py-3 bg-amber-900 text-white font-semibold rounded-md text-center hover:bg-amber-950 transition">
                Sign Up & Get 10% Off
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-amber-50 z-20 hero-clip"></div>
      </section>
      {/* How It Works Section */}
      <section className="py-12 md:py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-amber-900">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-amber-100 rounded-full p-6 mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-amber-900">
                Browse & Order
              </h3>
              <p className="text-amber-800">
                Browse our menu of authentic Filipino dishes and add your
                favorites to your cart.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-amber-100 rounded-full p-6 mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-amber-900">
                Track Your Order
              </h3>
              <p className="text-amber-800">
                Follow your order's progress from preparation to delivery in
                real-time.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-amber-100 rounded-full p-6 mb-4">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-amber-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-amber-900">
                Enjoy & Earn
              </h3>
              <p className="text-amber-800">
                Savor your meal and earn loyalty points for future discounts and
                free condiments.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Items Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-amber-900">
            Featured Dishes
          </h2>
          <FeaturedItems />
          <div className="text-center mt-8 md:mt-12">
            <Link to="/menu" className="px-6 py-3 bg-amber-800 text-white font-semibold rounded-md hover:bg-amber-900 transition">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-amber-900">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>)}
                </div>
              </div>
              <p className="text-amber-800 mb-4">
                "The Kare-Kare was absolutely delicious! The AI recommendations
                were spot on, and the delivery was faster than expected. Will
                definitely order again!"
              </p>
              <p className="font-semibold text-amber-900">- Maria Santos</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>)}
                </div>
              </div>
              <p className="text-amber-800 mb-4">
                "I love the loyalty rewards! The free condiments are a nice
                touch, and the Bulalo is the best I've had outside my
                grandmother's kitchen."
              </p>
              <p className="font-semibold text-amber-900">- Juan Reyes</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>)}
                </div>
              </div>
              <p className="text-amber-800 mb-4">
                "The first-time discount was a great surprise! The ordering
                process was seamless, and the food arrived hot and fresh. Highly
                recommend!"
              </p>
              <p className="font-semibold text-amber-900">- Ana Lim</p>
            </div>
          </div>
        </div>
      </section>
      {/* Call to Action */}
      <section className="py-12 md:py-16 bg-amber-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Ready to Experience Filipino Cuisine?
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
            Sign up today and get 10% off your first order. Enjoy personalized
            recommendations and earn rewards with every purchase.
          </p>
          <Link to="/register" className="px-6 py-3 bg-amber-50 text-amber-900 font-semibold rounded-md hover:bg-amber-100 transition">
            Create Your Account
          </Link>
        </div>
      </section>
    </div>;
};
export default Home;