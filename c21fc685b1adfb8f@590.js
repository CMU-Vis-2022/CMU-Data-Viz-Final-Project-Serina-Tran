function _1(md){return(
md`# Data Visualization Final Project`
)}

function _2(md){return(
md`## I. Market Capitalization`
)}

function _3(md){return(
md`### 1. Bitcoin 

The dataset for Bitcoin from April 29, 2013 to July 6, 2021.`
)}

function _coin_bitcoin5(__query,FileAttachment,invalidation){return(
__query.sql(FileAttachment("coin_Bitcoin@5.csv"),invalidation)`SELECT * FROM "coin_Bitcoin"`
)}

function _5(md){return(
md`Market Capitalization for Bitcoin Chart`
)}

function _btcChart(LineChart,coin_bitcoin5){return(
LineChart(coin_bitcoin5, {
  x: d => d.Date,
  y: d => d.Marketcap,
  yLabel: "BTC Marketcap ($)"
})
)}

function _7(md){return(
md`### 2. Ethereum

The dataset for Ethereum from August 8, 2015 to July 6, 2021.`
)}

function _coin_ethereum(__query,FileAttachment,invalidation){return(
__query.sql(FileAttachment("coin_Ethereum.csv"),invalidation)`SELECT * FROM "coin_Ethereum"`
)}

function _9(md){return(
md`Market Capitalization for Ethereum Chart`
)}

function _ethChart(LineChart,coin_ethereum){return(
LineChart(coin_ethereum, {
  x: d => d.Date,
  y: d => d.Marketcap,
  yLabel: "ETH Marketcap ($)"
})
)}

function _11(md){return(
md`### 3. Tether
The dataset for Tether from February 26, 2015 to July 6, 2021.`
)}

function _coin_tether(__query,FileAttachment,invalidation){return(
__query.sql(FileAttachment("coin_Tether.csv"),invalidation)`SELECT * FROM "coin_Tether"`
)}

function _13(md){return(
md`Market Capitalization for Tether Chart`
)}

function _usdtChart(LineChart,coin_tether){return(
LineChart(coin_tether, {
  x: d => d.Date,
  y: d => d.Marketcap,
  yLabel: "USDT Marketcap ($)"
})
)}

function _15(md){return(
md`### 4. XRP
The dataset for XRP from August 5, 2013 to July 6, 2021.`
)}

function _coin_xrp(__query,FileAttachment,invalidation){return(
__query.sql(FileAttachment("coin_XRP.csv"),invalidation)`SELECT * FROM "coin_XRP"`
)}

function _17(md){return(
md`Market Capitalization for XRP Chart`
)}

function _xrpChart(LineChart,coin_xrp){return(
LineChart(coin_xrp, {
  x: d => d.Date,
  y: d => d.Marketcap,
  yLabel: "XRP Marketcap ($)"
})
)}

function _19(md){return(
md`### 5. Cardano
The dataset for Cardano from October 2, 2017 to July 6, 2021.`
)}

function _coin_cardano(__query,FileAttachment,invalidation){return(
__query.sql(FileAttachment("coin_Cardano.csv"),invalidation)`SELECT * FROM "coin_Cardano"`
)}

function _21(md){return(
md`Market Capitalization for Cardano Chart`
)}

function _adaChart(LineChart,coin_cardano){return(
LineChart(coin_cardano, {
  x: d => d.Date,
  y: d => d.Marketcap,
  yLabel: "ADA Marketcap ($)"
})
)}

function _LineChart(d3){return(
function LineChart(data, {
  x = ([x]) => x, 
  y = ([, y]) => y, 
  title, 
  defined, 
  curve = d3.curveLinear, 
  marginTop = 20, 
  marginRight = 30,
  marginBottom = 30, 
  marginLeft = 40, 
  width = 640,  
  height = 400, 
  xType = d3.scaleUtc, 
  xDomain, 
  xRange = [marginLeft, width - marginRight],
  yType = d3.scaleLinear, 
  yDomain, 
  yRange = [height - marginBottom, marginTop],
  color = "currentColor",
  strokeWidth = 1.5, 
  strokeLinejoin = "round", 
  strokeLinecap = "round", 
  yFormat, 
  yLabel, 
} = {}) {
  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const O = d3.map(data, d => d);
  const I = d3.map(data, (_, i) => i);

  if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
  const D = d3.map(data, defined);

  if (xDomain === undefined) xDomain = d3.extent(X);
  if (yDomain === undefined) yDomain = [0, d3.max(Y)];

  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

  if (title === undefined) {
    const formatDate = xScale.tickFormat(null, "%b %-d, %Y");
    const formatValue = yScale.tickFormat(100, yFormat);
    title = i => `${formatDate(X[i])}\n${formatValue(Y[i])}`;
  } else {
    const O = d3.map(data, d => d);
    const T = title;
    title = i => T(O[i], i, data);
  }

  const line = d3.line()
      .defined(i => D[i])
      .curve(curve)
      .x(i => xScale(X[i]))
      .y(i => yScale(Y[i]));

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .style("-webkit-tap-highlight-color", "transparent")
      .style("overflow", "visible")
      .on("pointerenter pointermove", pointermoved)
      .on("pointerleave", pointerleft)
      .on("touchstart", event => event.preventDefault());

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel));

  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-linejoin", strokeLinejoin)
      .attr("stroke-linecap", strokeLinecap)
      .attr("d", line(I));

  const tooltip = svg.append("g")
      .style("pointer-events", "none");

  function pointermoved(event) {
    const i = d3.bisectCenter(X, xScale.invert(d3.pointer(event)[0]));
    tooltip.style("display", null);
    tooltip.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i])})`);

    const path = tooltip.selectAll("path")
      .data([,])
      .join("path")
        .attr("fill", "white")
        .attr("stroke", "black");

    const text = tooltip.selectAll("text")
      .data([,])
      .join("text")
      .call(text => text
        .selectAll("tspan")
        .data(`${title(i)}`.split(/\n/))
        .join("tspan")
          .attr("x", 0)
          .attr("y", (_, i) => `${i * 1.1}em`)
          .attr("font-weight", (_, i) => i ? null : "bold")
          .text(d => d));

    const {x, y, width: w, height: h} = text.node().getBBox();
    text.attr("transform", `translate(${-w / 2},${15 - y})`);
    path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
    svg.property("value", O[i]).dispatch("input", {bubbles: true});
  }

  function pointerleft() {
    tooltip.style("display", "none");
    svg.node().value = null;
    svg.dispatch("input", {bubbles: true});
  }

  return Object.assign(svg.node(), {value: null});
}
)}

function _24(md){return(
md`## II. Fear and Greed Index`
)}

function _25(md){return(
md`The dataset for the Crypto Fear and Greed Index from February 1, 2018 to September 7, 2022.`
)}

function _fear_and_greed_index1(__query,FileAttachment,invalidation){return(
__query.sql(FileAttachment("fear_and_greed_index@1.csv"),invalidation)`SELECT * FROM "fear_and_greed_index"`
)}

function _27(md){return(
md`Crypto Fear and Greed Index Chart`
)}

function _chart(AreaChart,fear_and_greed_index1,width){return(
AreaChart(fear_and_greed_index1, {
  x: d => d.fng_value,
  y: d => d.fng_classification,
  yLabel: "Fear and Greed Index; 0 = Extreme Fear, 100 = Extreme Greed",
  width,
  height: 500,
  color: "steelblue",
})
)}

function _AreaChart(d3){return(
function AreaChart(data, {
  x = ([x]) => x, 
  y = ([, y]) => y, 
  defined,
  curve = d3.curveLinear,
  marginTop = 20,
  marginRight = 30, 
  marginBottom = 30, 
  marginLeft = 40,
  width = 640,
  height = 400,
  xType = d3.scaleUtc,
  xDomain,
  xRange = [marginLeft, width - marginRight], 
  yType = d3.scaleLinear, 
  yDomain,
  yRange = [height - marginBottom, marginTop],
  yFormat,
  yLabel, 
  color = "currentColor"
} = {}) {

  const X = d3.map(data, x);
  const Y = d3.map(data, y);
  const I = d3.range(X.length);

  if (defined === undefined) defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
  const D = d3.map(data, defined);

  if (xDomain === undefined) xDomain = d3.extent(X);
  if (yDomain === undefined) yDomain = [0, d3.max(Y)];

  const xScale = xType(xDomain, xRange);
  const yScale = yType(yDomain, yRange);
  const xAxis = d3.axisBottom(xScale).ticks(width / 80).tickSizeOuter(0);
  const yAxis = d3.axisLeft(yScale).ticks(height / 40, yFormat);

  const area = d3.area()
      .defined(i => D[i])
      .curve(curve)
      .x(i => xScale(X[i]))
      .y0(yScale(0))
      .y1(i => yScale(Y[i]));

  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(yAxis)
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(yLabel));

  svg.append("path")
      .attr("fill", color)
      .attr("d", area(I));

  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(xAxis);

  return svg.node();
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["coin_Bitcoin@5.csv", {url: new URL("./files/06c7afa6ce1a6cc3e5de92c6f4e9870323b1d02273dbcf0edc2d0afb202b98b55960d808b3ee0e735468bb6fd82422e5d17f5a4f2e60701612f6d802eb6a2863.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["coin_Ethereum.csv", {url: new URL("./files/dd53b34f8ff0e6978f72d9f0a54521ffbc204635cbbfa318f233ff33c26ababdd743dfcb4e5e6e43bb3fc86f67518afc950985c3cbfc334c38115d51f354e869.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["coin_Tether.csv", {url: new URL("./files/a76bddb7f22afc55efacbcc77b6f168cb8420c35f914b07339d523d0c6e7126d7fc34ce8064b330e1206e1bde3215ce17777fbdfd662865dcd9a05ee6b7c6eed.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["coin_XRP.csv", {url: new URL("./files/40270f508bd1086ddb4a712b880632e6b0a1bf90db7c5f0abb28b956c8ad7ed27e8ce0048c55d3334c636743d6548b7c8521781c982dd104b2fa4a5d1a784c4e.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["coin_Cardano.csv", {url: new URL("./files/a1b27123511365ccfb9916faf62020983c62d6a8efd4e9dfe87a5a05d0920f97ec1a2db18c3ebbc49a090faab536406ee95140ae970849e3c15adc56c6415c83.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["fear_and_greed_index@1.csv", {url: new URL("./files/2ed673912e95c76a7e590461d2c8c746a61ee6ded5c0c31789ffc28de5bd667dfe2d452ce5b971ed3839a9f34c6adf1f4149a9ea989d8ea4ce12843320db0499.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer("coin_bitcoin5")).define("coin_bitcoin5", ["__query","FileAttachment","invalidation"], _coin_bitcoin5);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer("btcChart")).define("btcChart", ["LineChart","coin_bitcoin5"], _btcChart);
  main.variable(observer()).define(["md"], _7);
  main.variable(observer("coin_ethereum")).define("coin_ethereum", ["__query","FileAttachment","invalidation"], _coin_ethereum);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer("ethChart")).define("ethChart", ["LineChart","coin_ethereum"], _ethChart);
  main.variable(observer()).define(["md"], _11);
  main.variable(observer("coin_tether")).define("coin_tether", ["__query","FileAttachment","invalidation"], _coin_tether);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer("usdtChart")).define("usdtChart", ["LineChart","coin_tether"], _usdtChart);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer("coin_xrp")).define("coin_xrp", ["__query","FileAttachment","invalidation"], _coin_xrp);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer("xrpChart")).define("xrpChart", ["LineChart","coin_xrp"], _xrpChart);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("coin_cardano")).define("coin_cardano", ["__query","FileAttachment","invalidation"], _coin_cardano);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer("adaChart")).define("adaChart", ["LineChart","coin_cardano"], _adaChart);
  main.variable(observer("LineChart")).define("LineChart", ["d3"], _LineChart);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer()).define(["md"], _25);
  main.variable(observer("fear_and_greed_index1")).define("fear_and_greed_index1", ["__query","FileAttachment","invalidation"], _fear_and_greed_index1);
  main.variable(observer()).define(["md"], _27);
  main.variable(observer("chart")).define("chart", ["AreaChart","fear_and_greed_index1","width"], _chart);
  main.variable(observer("AreaChart")).define("AreaChart", ["d3"], _AreaChart);
  return main;
}
