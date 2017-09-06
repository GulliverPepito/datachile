import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { CanonComponent } from "datawheel-canon";
import { Link } from "react-router";
import { browserHistory } from "react-router";
import { translate } from "react-i18next";

import Nav from "components/Nav";

import d3plus from "helpers/d3plus";
import { slugifyItem } from "helpers/formatters";
import mondrianClient, { getMemberQuery } from "helpers/MondrianClient";
import { getLevelObject, ingestParent } from "helpers/dataUtils";

import "./intro.css";

class CountryProfile extends Component {
  constructor() {
    super();
    this.state = {
      subnav: false,
      activeSub: false
    };
  }

  static need = [
    (params, store) => {
      var ids = getLevelObject(params);

      var prms = [
        getMemberQuery(
          "exports",
          "Destination Country",
          "Subregion",
          ids.level1,
          store.i18n.locale
        )
      ];

      if (ids.level2) {
        prms.push(
          getMemberQuery(
            "exports",
            "Destination Country",
            "Country",
            ids.level2,
            store.i18n.locale
          )
        );
      }

      var prm = Promise.all(prms).then(res => {
        return { key: "country", data: ingestParent(res[0], res[1]) };
      });

      return {
        type: "GET_DATA",
        promise: prm
      };
    }
  ];

  componentDidMount() {}

  render() {
    const { subnav, activeSub } = this.state;
    const { focus, t } = this.props;

    const { country } = this.props.routeParams;
    const obj = this.props.data.country;

    return (
      <CanonComponent data={this.props.data} d3plus={d3plus}>
        <div className="country-profile">
          <div className="intro">
            {obj &&
              <Nav
                title={obj.caption}
                type={obj.parent ? t("Country") : t("Zone")}
                exploreLink={"/explore/countries"}
                ancestor={obj.parent ? obj.parent.caption : ""}
                ancestorLink={
                  obj.parent
                    ? slugifyItem("countries", obj.parent.key, obj.parent.name)
                    : ""
                }
              />}
            <div className="splash">
              <div
                className="image"
                style={{
                  backgroundImage: `url('/images/profile-bg/chile.jpg')`
                }}
              />
              <div className="gradient" />
            </div>

            <div className="dc-container">
              <div className="header">
                <div className="meta" />
              </div>
            </div>
          </div>
        </div>
      </CanonComponent>
    );
  }
}

export default translate()(
  connect(
    state => ({
      data: state.data,
      focus: state.focus,
      stats: state.stats
    }),
    {}
  )(CountryProfile)
);