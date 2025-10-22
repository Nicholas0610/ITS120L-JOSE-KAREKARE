// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Link } from 'react-router-dom';
const FeaturedItems = () => {
  const featuredDishes = [{
    id: 1,
    name: 'Kare-Kare',
    description: 'A Filipino stew with a thick peanut sauce, oxtail, and vegetables.',
    price: 299.0,
    image: "/470201380_122126291132423180_6165366624816461951_n.jpg",
    popular: true
  }, {
    id: 2,
    name: 'Bulalo',
    description: 'A light-colored soup made by cooking beef shanks and bone marrow with corn, potatoes, and vegetables.',
    price: 320.0,
    image: "/Bulalo.jpg",
    popular: true
  }, {
    id: 3,
    name: 'Sinigang',
    description: 'A sour soup with pork, vegetables, and tamarind.',
    price: 280.0,
    image: 'https://images.unsplash.com/photo-1614397881451-ca0d7ce89401?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    popular: false
  }];
  return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {featuredDishes.map(dish => <div key={dish.id} className="bg-amber-50 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
          <div className="relative">
            <img src={dish.image} alt={dish.name} className="w-full h-48 object-cover" loading="lazy" />
            {dish.popular && <div className="absolute top-0 right-0 bg-amber-800 text-white px-3 py-1 text-sm font-semibold">
                Popular
              </div>}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2 text-amber-900">
              {dish.name}
            </h3>
            <p className="text-amber-800 mb-4 line-clamp-2">
              {dish.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-amber-900">
                ₱{dish.price.toFixed(2)}
              </span>
              <Link to={`/menu/${dish.id}`} className="px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-900 transition">
                Order Now
              </Link>
            </div>
          </div>
        </div>)}
    </div>;
};
export default FeaturedItems;