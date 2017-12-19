import React from "react";
import { Link } from "react-router";
import { translate } from "react-i18next";
import "./Footer.css";

function Footer(props) {
  const t = props.t;

  return (
    <footer>
      <div className="footer-container">
        <div className="collaboration">
          <div className="column developed">
            <p className="footer-title">{t("Developed by")}</p>
            <p className="logos">
              <img
                className="logo datawheel"
                src="/images/logos/logo-datawheel.svg"
              />
            </p>
          </div>
          <div className="column sponsored">
            <p className="footer-title">{t("Sponsored by")}</p>
            <p className="logos">
              <img className="logo" src="/images/logos/logo-aminerals.svg" />
              <img className="logo" src="/images/logos/logo-corfo.svg" />
              <img className="logo" src="/images/logos/logo-minecon.svg" />
              <img className="logo" src="/images/logos/logo-entel.svg" />
            </p>
          </div>
          <div className="column supported">
            <p className="footer-title">{t("Supported by")}</p>
            <p className="logos">
              <img className="logo" src="/images/logos/logo-direcon.svg" />
              <img className="logo" src="/images/logos/logo-asech.svg" />
            </p>
          </div>
        </div>

        <div className="nav-links">
          <Link className="link" to="/">
            {t("Home")}
          </Link>
          <span className="link link-dot">&#183;</span>
          <Link className="link" to="/explore/geo">
            {t("Regions & Comunas")}
          </Link>
          <span className="link link-dot">&#183;</span>
          <Link className="link" to="/explore/industries">
            {t("Industries")}
          </Link>
          <span className="link link-dot">&#183;</span>
          <Link className="link" to="/explore/institutions">
            {t("Institutions")}
          </Link>
          <span className="link link-dot">&#183;</span>
          <Link className="link" to="/explore/careers">
            {t("Careers")}
          </Link>
          <span className="link link-dot">&#183;</span>
          <Link className="link" to="/explore/products">
            {t("Products")}
          </Link>
          <span className="link link-dot">&#183;</span>
          <Link className="link" to="/explore/industries">
            {t("Industries")}
          </Link>
          <span className="link link-dot">&#183;</span>
          <Link className="link" to="/explore/map">
            {t("Map")}
          </Link>
          <span className="link link-dot">&#183;</span>
          <Link className="link" to="/about">
            {t("About")}
          </Link>
          <span className="link link-dot">&#183;</span>
          <a className="link" href="#" target="_blank">
            {t("Contact")}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default translate()(Footer);
