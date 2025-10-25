import { Link } from 'react-router-dom';
const Terms = () => {
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
              Terms of Service
            </h1>
            <p className="text-sm text-amber-800">Last Updated: June 1, 2023</p>
          </div>
          <div className="p-6">
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                1. Introduction
              </h2>
              <p className="text-amber-800 mb-4">
                Welcome to Jose's Kare-Kare and Bulalo House. These Terms of
                Service ("Terms") govern your use of our website, mobile
                application, and services (collectively, the "Services").
              </p>
              <p className="text-amber-800">
                By accessing or using our Services, you agree to be bound by
                these Terms. If you disagree with any part of the Terms, you may
                not access the Services.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                2. Use of Services
              </h2>
              <p className="text-amber-800 mb-4">
                Our Services are intended for users who are at least 18 years of
                age. By using our Services, you represent and warrant that you
                are at least 18 years old and that your use of the Services does
                not violate any applicable laws or regulations.
              </p>
              <p className="text-amber-800">
                You agree to use the Services only for lawful purposes and in
                accordance with these Terms. You agree not to use the Services:
              </p>
              <ul className="list-disc pl-5 mb-4 text-amber-800">
                <li>
                  In any way that violates any applicable national or
                  international law or regulation
                </li>
                <li>
                  To transmit, or procure the sending of, any advertising or
                  promotional material without our prior consent
                </li>
                <li>
                  To impersonate or attempt to impersonate Jose's Kare-Kare and
                  Bulalo House, an employee, another user, or any other person
                  or entity
                </li>
                <li>
                  To engage in any other conduct that restricts or inhibits
                  anyone's use or enjoyment of the Services
                </li>
              </ul>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                3. Account Registration
              </h2>
              <p className="text-amber-800 mb-4">
                Some features of our Services may require you to register for an
                account. You agree to provide accurate, current, and complete
                information during the registration process and to update such
                information to keep it accurate, current, and complete.
              </p>
              <p className="text-amber-800">
                You are responsible for safeguarding the password that you use
                to access the Services and for any activities or actions under
                your password. You agree not to disclose your password to any
                third party. You must notify us immediately upon becoming aware
                of any breach of security or unauthorized use of your account.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                4. Orders and Payments
              </h2>
              <p className="text-amber-800 mb-4">
                When you place an order through our Services, you are offering
                to purchase the products you have selected. We reserve the right
                to accept or decline your order at our discretion.
              </p>
              <p className="text-amber-800 mb-4">
                Prices for our products are subject to change without notice. We
                reserve the right to modify or discontinue the Services without
                notice at any time.
              </p>
              <p className="text-amber-800">
                Payment for all orders must be made at the time of ordering. We
                accept various payment methods as indicated on our website or
                mobile application. By providing a payment method, you represent
                and warrant that you are authorized to use the designated
                payment method and that you authorize us to charge your payment
                method for the total amount of your order (including any
                applicable taxes and other charges).
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                5. Delivery and Pickup
              </h2>
              <p className="text-amber-800 mb-4">
                We offer delivery services to selected areas. Delivery times are
                estimates and may vary based on factors such as traffic, weather
                conditions, and order volume. We are not responsible for delays
                in delivery due to circumstances beyond our control.
              </p>
              <p className="text-amber-800">
                For pickup orders, you agree to collect your order at the
                designated time and location. If you fail to pick up your order
                within 30 minutes of the designated time, we reserve the right
                to dispose of the order without refund.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                6. Refunds and Cancellations
              </h2>
              <p className="text-amber-800 mb-4">
                Orders can be cancelled within 5 minutes of placing the order.
                After this time, cancellations may not be possible if food
                preparation has begun.
              </p>
              <p className="text-amber-800">
                If you are not satisfied with your order, please contact us
                within 30 minutes of delivery or pickup. We will assess the
                situation and may offer a replacement, refund, or store credit
                at our discretion.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                7. Intellectual Property
              </h2>
              <p className="text-amber-800">
                The Services and their entire contents, features, and
                functionality (including but not limited to all information,
                software, text, displays, images, video, and audio) are owned by
                Jose's Kare-Kare and Bulalo House, its licensors, or other
                providers of such material and are protected by copyright,
                trademark, patent, trade secret, and other intellectual property
                or proprietary rights laws.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-amber-800">
                In no event shall Jose's Kare-Kare and Bulalo House, its
                officers, directors, employees, or agents, be liable to you for
                any direct, indirect, incidental, special, punitive, or
                consequential damages whatsoever resulting from any (i) errors,
                mistakes, or inaccuracies of content; (ii) personal injury or
                property damage resulting from your access to and use of our
                Services; (iii) any unauthorized access to or use of our secure
                servers and/or any personal information stored therein; (iv) any
                interruption or cessation of transmission to or from our
                Services; (v) any bugs, viruses, trojan horses, or the like,
                which may be transmitted to or through our Services by any third
                party; and/or (vi) any errors or omissions in any content or for
                any loss or damage of any kind incurred as a result of your use
                of any content posted, emailed, transmitted, or otherwise made
                available via the Services, whether based on warranty, contract,
                tort, or any other legal theory, and whether or not we are
                advised of the possibility of such damages.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                9. Changes to Terms
              </h2>
              <p className="text-amber-800">
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will try to provide at least 30 days' notice prior to any new
                terms taking effect. What constitutes a material change will be
                determined at our sole discretion.
              </p>
            </section>
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">
                10. Contact Us
              </h2>
              <p className="text-amber-800">
                If you have any questions about these Terms, please contact us
                at:
              </p>
              <div className="mt-4 text-amber-800">
                <p>Jose's Kare-Kare and Bulalo House</p>
                <p>205 A. Arnaiz St. Libertad, Pasay City, Philippines</p>
                <p>Email: terms@joseskarekare.com</p>
                <p>Phone: 09079222970</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>;
};
export default Terms;