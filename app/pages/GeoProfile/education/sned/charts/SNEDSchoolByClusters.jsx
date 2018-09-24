import React from "react";
import { Section } from "datawheel-canon";
import { translate } from "react-i18next";

import { colorContrast } from "d3plus-color";

import { simpleGeoChartNeed } from "helpers/MondrianClient";
import {
  numeral,
  slugifyItem,
  getNumberFromTotalString
} from "helpers/formatters";
import { snedComparisonColorScale } from "helpers/colors";

import ExportLink from "components/ExportLink";
import SourceTooltip from "components/SourceTooltip";
import TreemapStacked from "components/TreemapStacked";

class SNEDSchoolByClusters extends Section {
  static need = [
    simpleGeoChartNeed(
      "path_sned_indicators",
      "education_sned",
      ["Number of records"],
      {
        drillDowns: [["Cluster", "Cluster", "Stage 2"], ["Date", "Year"]],
        options: { parents: true }
      }
    )
  ];

  render() {
    const { t, className, i18n } = this.props;
    const geo = this.context.data.geo;
    const locale = i18n.language;
    const path = this.context.data.path_sned_indicators;

    const title = t("Total schools by type");
    const classSvg = "sned-school-by-clusters";

    return (
      <div className={className}>
        <h3 className="chart-title">
          <span>
            {title}
            <SourceTooltip cube="sned" />
          </span>
          <ExportLink path={path} className={classSvg} title={title} />
        </h3>
        <TreemapStacked
          path={path}
          className={classSvg}
          msrName="Number of records"
          drilldowns={["Stage 1a"]}
          config={{
            legendConfig: {
              label: false,
              shapeConfig: {
                backgroundImage: "/images/legend/education/type.png"
              }
            },
            legendTooltip: {
              title: d =>
                "<div style='display: flex; align-items: center; justify-content: center;'><img height='30px' src='/images/legend/education/type.png'/>" +
                d["Stage 1a"] +
                "</div>"
            },
            shapeConfig: {
              fill: d => snedComparisonColorScale("sned" + d["ID Stage 1a"])
            },
            tooltipConfig: {
              padding: 0,
              titleStyle: {
                "background-color": d =>
                  snedComparisonColorScale("sned" + d["ID Stage 1a"]),
                color: d =>
                  colorContrast(
                    snedComparisonColorScale("sned" + d["ID Stage 1a"])
                  ),
                padding: "5px 10px 5px 10px"
              },
              bodyStyle: {
                "background-color": "#fff",
                color: "#000",
                padding: "5px 10px"
              },
              title: d =>
                "<div style='display: flex; align-items: center; justify-content: center;'><img height='30px' src='/images/legend/education/type.png'/>" +
                d["Stage 1a"] +
                "</div>",
              body: d =>
                numeral(d["Number of records"], locale).format("0") +
                " " +
                t("Schools")
            },
            total: d => d["Number of records"],
            totalConfig: {
              text: d =>
                "Total: " +
                numeral(getNumberFromTotalString(d.text), locale).format("0") +
                " " +
                t("Schools")
            },
            yConfig: {
              title: t("US$"),
              tickFormat: tick => numeral(tick, locale).format("(0a)")
            }
          }}
        />
      </div>
    );
  }
}

export default translate()(SNEDSchoolByClusters);
