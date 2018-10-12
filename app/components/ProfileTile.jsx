import React, { Component } from "react";
import LazyLoad from "react-lazyload";
import { Link } from "react-router";
import { translate } from "react-i18next";
import { shortenProfileName } from "helpers/formatters";
// import Shiitake from "shiitake";

import "./ProfileTile.css";

class ProfileTile extends Component {
  render() {
    const { t, item, filterUrl, className } = this.props;

    const theme =
      ["national", "region", "comuna"].indexOf(item.type) > -1
        ? "geo"
        : item.type;

    const i18nType = {
      national: t("National"),
      region: t("Region"),
      comuna: t("Comuna"),
      countries: t("Country"),
      industries: t("Industry"),
      products: t("Product"),
      geo: t("Municipal") // all other geo tags accounted for
    };

    let type = i18nType[item.type] ? i18nType[item.type] : item.type;

    // continents aren't countries
    const continents = [
      "Africa",
      "Oceania",
      "Americas",
      "Asia",
      "Europe",
      "Other"
    ];
    if (continents.indexOf(item.name) > -1) {
      type = t("Continent");
    }

    // get truncated name & label id
    let titleTruncated = null;
    let labelId = "";
    if (item) {
      titleTruncated = shortenProfileName(item.name);
      labelId = `${item.name}-label`;
    }

    // console.log(item);

    return (
      <div
        className={`tile ${
          className ? className : ""
        } border-${theme}-hover background-${theme}-dark-2`}
      >
        <Link
          className="cover-link"
          key={item.name + "anchor"}
          to={item.url}
          title={item.name}
          aria-labelledby={labelId}
        />
        <span className="tile-inner" id={labelId}>
          {/* profile title */}
          <span className="tile-title subhead font-xs">
            {titleTruncated ? titleTruncated : item.name}
          </span>

          {/* category indicator */}
          {theme && (
            <span className={`category color-${theme} font-xxs`}>
              {type && (
                <img
                  className="category-icon"
                  src={`/images/icons/icon-${theme}.svg`}
                />
              )}
              <span className="u-visually-hidden">, </span>
              {type}
              <span className="u-visually-hidden">.</span>
            </span>
          )}
        </span>

        {/* explore filter button */}
        {filterUrl && (
          <Link
            to={filterUrl}
            className={`filter-button font-xxs background-${theme}-hover`}
          >
            <span className="filter-button-icon pt-icon pt-icon-multi-select" />
            <span className="filter-button-text inverted-link">
              {" "}
               {t("related profiles")}
            </span>
          </Link>
        )}

        {/* background image */}
        <LazyLoad offset={100}>
          <img
            className="tile-img"
            src={item.img.replace("profile-bg", "thumbs")}
            alt=""
          />
        </LazyLoad>
      </div>
    );
  }
}

export default translate()(ProfileTile);
