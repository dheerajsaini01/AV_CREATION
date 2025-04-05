
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl font-semibold mb-10">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Welcome to AV CREATION. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully.
            </p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing our website, creating an account, or making a purchase, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using this site.
            </p>

            <h2>2. Products and Pricing</h2>
            <p>
              All product descriptions, images, and specifications are as accurate as possible. However, we do not guarantee that all information is complete or error-free. All prices are subject to change without notice. We reserve the right to discontinue any product at any time.
            </p>

            <h2>3. Orders and Payment</h2>
            <p>
              When you place an order with us, you are making an offer to purchase. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing or product information, or issues with order information.
            </p>
            <p>
              Payment must be made at the time of order. We accept major credit cards, debit cards, and selected digital payment methods. All payments are processed securely through our payment processors.
            </p>

            <h2>4. Shipping and Delivery</h2>
            <p>
              Delivery times are estimates only and may vary. We are not responsible for delays caused by customs, postal services, or other circumstances beyond our control. Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
            </p>

            <h2>5. Returns and Refunds</h2>
            <p>
              Please refer to our separate Return Policy for detailed information about returns, exchanges, and refunds.
            </p>

            <h2>6. User Accounts</h2>
            <p>
              When you create an account, you must provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, images, and software, is the property of AV CREATION and is protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, display, or create derivative works from any content without our express written permission.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              AV CREATION shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the website or products.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Your continued use of the website after any changes indicates your acceptance of the modified terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at legal@avcreation.com.
            </p>

            <p className="text-sm text-muted-foreground">
              Last Updated: June 15, 2023
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Terms;
