import React from "react";
import { Section } from "datawheel-canon";
import { StackedArea } from "d3plus-react";
import { translate } from "react-i18next";

import { simpleGeoChartNeed } from "helpers/MondrianClient";
import { employmentBySexColorScale } from "helpers/colors";
import { numeral } from "helpers/formatters";
import { getGeoObject } from "helpers/dataUtils";

import Select from "components/Select";
import ExportLink from "components/ExportLink";
import SourceNote from "components/SourceNote";
import CustomStackedArea from "components/CustomStackedArea";

class EmploymentBySex extends Section {
  static need = [
    (params, store) => {
      return simpleGeoChartNeed(
        "path_employment_by_sex",
        "nene_quarter",
        ["Expansion factor"],
        {
          drillDowns: [
            [
              "Occupational Situation",
              "Occupational Situation",
              "Occupational Situation"
            ],
            ["Sex", "Sex", "Sex"],
            ["Date", "Date", "Moving Quarter"]
          ]
        }
      )(params, store);
    }
  ];

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedOption: 0,
      key: Math.random(),
      selectedObj: {
        path: "",
        groupBy: [],
        label: () => "",
        sum: () => "",
        sex_id: 1
      },
      chartVariations: []
    };
  }

  componentDidMount() {
    const { t } = this.props;

    var variations = [
      {
        id: 0,
        title: t("Female"),
        sex_id: 1
      },
      {
        id: 1,
        title: t("Male"),
        sex_id: 2
      }
    ];

    this.setState({
      selectedOption: 0,
      selectedObj: variations[0],
      chartVariations: variations
    });
  }

  handleChange(ev) {
    this.setState({ key: Math.random() });

    this.setState({
      selectedOption: ev.newValue,
      selectedObj: this.state.chartVariations[ev.newValue]
    });
  }

  render() {
    const { t, className, i18n } = this.props;
    const { selectedObj } = this.state;

    const locale = i18n.language;

    const path = this.context.data.path_employment_by_sex;

    return (
      <div className={className}>
        <h3 className="chart-title">
          <span>{t("Regional Employment By Sex")}</span>
          <Select
            id="variations"
            options={this.state.chartVariations}
            value={this.state.selectedOption}
            labelField="title"
            valueField="id"
            onChange={this.handleChange}
          />
          <ExportLink path={path} />
        </h3>
        <CustomStackedArea
        key={this.state.key}
          config={{
            height: 500,
            data: path,
            groupBy: ["variable"],
            label: d => d["variable"],
            x: "month",
            y: "percentage",
            time: "month",
            timeline: false,
            scale: "time",
            xConfig: {
              title: false
            },
            yConfig: {
              title: t("People"),
              tickFormat: tick => numeral(tick, locale).format("0%")
            },
            shapeConfig: {
              fill: d => employmentBySexColorScale("bysex" + d["variable"])
            },
            tooltipConfig: {
              title: d => d["variable"],
              body: d => {
                return d["month"] instanceof Array
                  ? ""
                  : numeral(d["percentage"], locale).format("0.[0]%") +
                      " " +
                      t("people") +
                      "<br/>" +
                      d["quarter"];
              }
            }
          }}
          Sex={this.state.selectedObj.sex_id}
        />
        {/*<StackedArea
          config={{
            height: 500,
            data: path,
            groupBy: ["variable"],
            label: d => d["variable"],
            x: "month",
            y: "percentage",
            time: "month",
            timeline: false,
            scale: "time",
            xConfig: {
              title: false
            },
            yConfig: {
              title: t("People"),
              tickFormat: tick => numeral(tick, locale).format("0%")
            },
            shapeConfig: {
              fill: d => employmentBySexColorScale("bysex" + d["variable"])
            },
            tooltipConfig: {
              title: d => d["variable"],
              body: d => {
                return d["month"] instanceof Array
                  ? ""
                  : numeral(d["percentage"], locale).format("0.[0]%") +
                      " " +
                      t("people") +
                      "<br/>" +
                      d["quarter"];
              }
            }
          }}
          dataFormat={data => {
            var filtered = data.data.filter(d => {
              return d["ID Sex"] == selectedObj.sex_id;
            });
            var melted = [];
            var total = {};
            filtered.forEach(f => {
              if (total[f["ID Moving Quarter"]]) {
                total[f["ID Moving Quarter"]] += f["Expansion factor"];
              } else {
                total[f["ID Moving Quarter"]] = f["Expansion factor"];
              }
              var a = f;
              var date = f["ID Moving Quarter"].split("_");
              f["month"] = date[0] + "-" + date[1] + "-01";
              f["quarter"] =
                date[0] + " (" + date[1] + "," + date[2] + "," + date[3] + ")";
              a["variable"] = f["Occupational Situation"];
              a["value"] = f["Expansion factor"];
              melted.push(a);
            });
            melted = melted
              .map(m => {
                m["percentage"] = m["value"] / total[m["ID Moving Quarter"]];
                return m;
              })
              .sort((a, b) => {
                return a["Month"] > b["Month"] ? 1 : -1;
              });

            return melted;
          }}
        />*/}
        <SourceNote cube="nene" />
      </div>
    );
  }
}

export default translate()(EmploymentBySex);
