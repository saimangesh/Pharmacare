import React from 'react'

export const Hero = () => {
  return (
    <>
     <section className="hero">
        <div className="container">
          <div className="hero-content">
            <p className="hero-subtitle">Flat 20% off all products.</p>
            <h2 className="h1 hero-title">
              Order <span className="span">medicines</span> online.
              Earn <span className="span">cashback points.</span>
            </h2>
            <p className="hero-text">
              We will deliver the orders in ontime and quality.
            </p>
            <a href="/shop" className="btn btn-primary">
              <span className="span">Shop Now</span>
              <ion-icon name="chevron-forward" aria-hidden="true" />
            </a>
          </div>
          <figure className="hero-banner">
            <img
              src="./img/pharm1.png"
              width={603}
              height={634}
              loading="lazy"
              alt="Pharmacy"
              className="w-100"
            />
          </figure>
        </div>
      </section>
    </>
  )
}
