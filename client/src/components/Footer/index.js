import React from "react";
import "../Footer/index.css";
import { Button } from "../Button/Button";
import "../Button/Button.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">All songs made with Jam Hammer are made with the assumption that they will be shared and used in other songs </p>
      </section>
      <section class="social-media">
        <div class="social-media-wrap">
          <div class="footer-logo">
          </div>
          <small class="website-rights">JamHammer © 2021</small>
        </div>
      </section>
    </div>
  );
}

export default Footer;
