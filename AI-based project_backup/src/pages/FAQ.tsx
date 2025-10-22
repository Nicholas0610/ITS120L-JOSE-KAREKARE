import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]);
  const toggleItem = (index: number) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(item => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };
  const faqItems = [{
    question: "What are Jose's Kare-Kare and Bulalo House's operating hours?",
    answer: "We're open daily from 10:00 AM to 9:00 PM, seven days a week including holidays."
  }, {
    question: 'Do you offer delivery services?',
    answer: 'Yes, we offer delivery services within Pasay City and nearby areas. Delivery typically takes 30-45 minutes depending on your location and traffic conditions. A delivery fee of ₱20 applies to all orders.'
  }, {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash on delivery, credit/debit cards, GCash, PayMaya, and bank transfers. All online payments are securely processed through our payment partners.'
  }, {
    question: 'Do you take reservations?',
    answer: 'Yes, we accept reservations for dine-in. We recommend booking at least 2 hours in advance, especially during weekends and holidays. You can make a reservation by calling us at 09079222970 or through our contact form.'
  }, {
    question: 'Are your dishes suitable for people with dietary restrictions?',
    answer: 'We can accommodate some dietary restrictions with advance notice. Please inform us of any allergies or dietary requirements when ordering. Note that our kitchen handles common allergens including peanuts, shellfish, and gluten.'
  }, {
    question: 'How does the loyalty program work?',
    answer: 'Our loyalty program rewards you with 1 point for every ₱100 spent. You can redeem these points for free dishes, condiments, or discounts on future orders. 150 points can be redeemed for a free side dish, and 300 points for a free main dish.'
  }, {
    question: "Can I modify my order after it's been placed?",
    answer: 'Order modifications are possible within 5 minutes of placing your order. After that, modifications may not be possible if food preparation has already begun. Please contact our customer service immediately if you need to make changes.'
  }, {
    question: 'Do you cater for events?',
    answer: 'Yes, we offer catering services for events and parties. We require at least 48 hours notice for catering orders. Please contact us directly to discuss your catering needs and for a custom quote.'
  }, {
    question: 'What is your refund policy?',
    answer: "If you're not satisfied with your order, please contact us within 30 minutes of delivery. We'll either replace your order or provide a refund depending on the situation. For hygiene reasons, we cannot accept returns of food that has been partially consumed."
  }, {
    question: 'How do I provide feedback about my experience?',
    answer: 'We value your feedback! You can share your experience through our Contact page, by emailing feedback@joseskarekare.com, or by speaking with our manager during your visit. All feedback is reviewed and helps us improve our service.'
  }];
  return <div className="bg-amber-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/" className="text-amber-800 hover:text-amber-900 flex items-center">
            <svg className="h-5 w-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </Link>
        </div>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-semibold text-amber-900">
              Frequently Asked Questions
            </h1>
            <p className="text-sm text-amber-800">
              Find answers to common questions about our services
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {faqItems.map((item, index) => <div key={index} className="border border-amber-200 rounded-lg overflow-hidden">
                  <button className="flex justify-between items-center w-full px-6 py-4 text-left bg-amber-50 hover:bg-amber-100 transition-colors" onClick={() => toggleItem(index)}>
                    <span className="font-medium text-amber-900">
                      {item.question}
                    </span>
                    {openItems.includes(index) ? <ChevronUpIcon className="h-5 w-5 text-amber-700" /> : <ChevronDownIcon className="h-5 w-5 text-amber-700" />}
                  </button>
                  {openItems.includes(index) && <div className="px-6 py-4 bg-white">
                      <p className="text-amber-800">{item.answer}</p>
                    </div>}
                </div>)}
            </div>
            <div className="mt-8 pt-6 border-t border-amber-200">
              <h2 className="text-lg font-semibold text-amber-900 mb-4">
                Still have questions?
              </h2>
              <p className="text-amber-800 mb-4">
                If you couldn't find the answer to your question, please don't
                hesitate to contact our customer support team.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link to="/contact" className="px-4 py-2 bg-amber-800 text-white text-center rounded hover:bg-amber-900 transition">
                  Contact Us
                </Link>
                <Link to="/help" className="px-4 py-2 border border-amber-800 text-amber-800 text-center rounded hover:bg-amber-50 transition">
                  Visit Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default FAQ;