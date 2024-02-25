import React, { useEffect, useState } from "react";
import { Footer } from "../Component/Footer";
import { Header } from "../Component/Header";

export const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="shopping-cart">
        <div className="px-4 px-lg-0">
          <div className="pb-5">
            <div className="container">
              <p className="section-subtitle">About Our PharmaCare Application</p>
              <div>
                <p>
                  Welcome to our PharmaCare application! We are dedicated to providing innovative solutions to improve healthcare outcomes and enhance patient well-being.
                </p>
                <h2>Our Mission</h2>
                <p>
                  Our mission is to leverage technology to revolutionize the PharmaCare industry, making medication management more efficient, accessible, and personalized.
                </p>
                <h2>What We Offer</h2>
                <p>
                  Our application offers a range of features to both patients and healthcare professionals, including:
                </p>
                <ul>
                  <li>Medication reminders and tracking</li>
                  <li>Drug interaction checker</li>
                  <li>Health record management</li>
                  <li>Access to educational resources</li>
                  <li>Secure communication with healthcare providers</li>
                </ul>
                <h2>Our Team</h2>
                <p>
                  Meet the passionate individuals behind our PharmaCare application:
                </p>
                <ul>
                  <li>Admin - Developer</li>
                  <li>Admin - Developer</li>
                </ul>
                <h2>Contact Us</h2>
                <p>
                  Have questions or feedback? We'd love to hear from you! Reach out to us at <a href="mailto:info@pharmacare.com">info@pharmacare.com</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
