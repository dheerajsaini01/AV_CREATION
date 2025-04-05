
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-display text-4xl font-semibold mb-10">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p>
              Your privacy is important to us. This Privacy Policy explains how AV CREATION collects, uses, and protects your personal information when you use our website or services.
            </p>

            <h2>1. Information We Collect</h2>
            <p>
              We may collect the following information:
            </p>
            <ul>
              <li>Name, contact information, and email address</li>
              <li>Demographic information such as address, postal code, preferences, and interests</li>
              <li>Payment information for orders</li>
              <li>Other information relevant to customer surveys and/or offers</li>
              <li>Information about your device and how you use our website</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              We use your information to:
            </p>
            <ul>
              <li>Process orders and provide our services</li>
              <li>Improve our products and services</li>
              <li>Send promotional emails about new products, special offers, or other information we think you may find interesting</li>
              <li>Contact you for market research purposes</li>
              <li>Customize the website according to your interests</li>
            </ul>

            <h2>3. Security</h2>
            <p>
              We are committed to ensuring that your information is secure. We have implemented suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
            </p>

            <h2>4. Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
            </p>

            <h2>5. Links to Other Websites</h2>
            <p>
              Our website may contain links to other websites of interest. However, once you have used these links to leave our site, we do not have any control over that other website. Therefore, we cannot be responsible for the protection and privacy of any information which you provide whilst visiting such sites.
            </p>

            <h2>6. Controlling Your Personal Information</h2>
            <p>
              You may choose to restrict the collection or use of your personal information in the following ways:
            </p>
            <ul>
              <li>When you are asked to fill in a form on the website, look for the box that you can click to indicate that you do not want the information to be used for direct marketing purposes</li>
              <li>If you have previously agreed to us using your personal information for direct marketing purposes, you may change your mind at any time by contacting us</li>
            </ul>

            <h2>7. Data Retention</h2>
            <p>
              We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy.
            </p>

            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@avcreation.com.
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

export default Privacy;
