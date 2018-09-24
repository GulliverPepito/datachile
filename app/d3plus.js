const axisConfig = {
  barConfig: {
    stroke: "#fff",
    "stroke-width": 1
  },
  gridConfig: {
    stroke: "#fff",
    "stroke-width": 0
  },
  shapeConfig: {
    fill: "#fff",
    labelConfig: {
      fontColor: "#fff",
      fontFamily: () => "'Saira Condensed', sans-serif",
      fontSize: () => 11
    },
    stroke: "#fff"
  },
  tickSize: 4,
  titleConfig: {
    fontFamily: () => "Roboto, sans-serif",
    fontColor: "#fff",
    fontSize: 14,
    //fontWeight: 600,
    textTransform: "uppercase"
  }
};

export default {
  legendConfig: {
    shapeConfig: {
      fontColor: "white",
      fontFamily: "'Saira Condensed', sans-serif",
      fontResize: false,
      fontSize: 12,
      fontWeight: 400,
      height: () => 20,
      textTransform: "uppercase",
      width: () => 20,
      labelConfig: {
        fontColor: "white"
      }
    }
  },
  loadingHTML:
    "<div style='font-family: Roboto, Helvetica Neue, Helvetica, Arial, sans-serif;'>" +
    "<img style='margin: auto; width:80px; height: 80px' src='/images/loading-visualization.gif' />" +
    "<sub style='display: block; margin-top: 15px;'>Powered by Datawheel</sub>" +
    "</div>",
  shapeConfig: {
    fontColor: "rgba(0, 0, 0, 0.4)",
    fontFamily: "'Saira Condensed', sans-serif",
    labelConfig: {
      fontFamily: () => "'Saira Condensed', sans-serif",
      fontWeight: 300,
      padding: 8,
      fontMax: 40
    },
    fontWeight: 600
  },
  timelineConfig: {
    brushing: false
  },
  totalConfig: {
    fontSize: 14,
    fontColor: "#FFFFFF",
    resize: false,
    textAnchor: "middle"
  },
  xConfig: axisConfig,
  yConfig: axisConfig
};
