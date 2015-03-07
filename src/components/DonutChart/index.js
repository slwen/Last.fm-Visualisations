"use strict";

var _          = require('lodash');
var React      = require('react');
var Color      = require('color');
var Pie        = require('paths-js/pie');
var SmoothLine = require('paths-js/smooth-line');

// Color Palette
var color       = Color("rgb(70,50,151)");
var somePalette = [
  Color("rgb(70,50,151)"),
  Color("rgb(70,50,151)").lighten(0.9),
  Color("rgb(70,50,151)").lighten(0.2),
  Color("rgb(70,50,151)").lighten(0.4)
];

var pie = Pie({
  data: [
    { name: 'Italy', population: 59859996 },
    { name: 'Mexico', population: 118395054 },
    { name: 'France', population: 65806000 },
    { name: 'Argentina', population: 40117096 },
    { name: 'Japan', population: 127290000 }
  ],
  accessor: function(x) { return x.population; },
  center: [50, 50],
  r: 35,
  R: 50
});


var data = [
  [
    { year: 2012, month: 0, value: 1 },
    { year: 2012, month: 1, value: 4 },
    { year: 2012, month: 2, value: 7 },
    { year: 2012, month: 3, value: 3 },
    { year: 2012, month: 4, value: 5 },
    { year: 2012, month: 5, value: 11 },
    { year: 2012, month: 6, value: 5 }
  ],
  [
    { year: 2012, month: 0, value: 0 },
    { year: 2012, month: 1, value: 3 },
    { year: 2012, month: 2, value: 9 },
    { year: 2012, month: 3, value: 7 },
    { year: 2012, month: 4, value: 7 },
    { year: 2012, month: 5, value: 3 },
    { year: 2012, month: 6, value: 2 }
  ]
];

function date(data) {
  var d = new Date();
  d.setYear(data.year);
  d.setMonth(data.month - 1);
  return d.getTime();
}

var smoothLine = SmoothLine({
  data: data,
  xaccessor: date,
  yaccessor: function(d) { return d.value; },
  width: 300,
  height: 200,
  compute: {
    color: function(i) { return somePalette[i]; }
  },
  closed: true
});



module.exports = React.createClass({
  displayName: 'DonutChart',

  renderPaths: function() {
    return _.map(pie.curves, function(d, i) {
      color.lighten(i / 10);
      return <path d={ d.sector.path.print() } fill={ color.hslString() } />;
    });
  },

  renderLines: function() {
    return _.map(smoothLine.curves, function(d, i) {
      color.lighten(i / 10);
      return <path d={ d.line.path.print() } stroke={ d.color.hexString() } fill="none" />;
    });
  },

  renderAreas: function() {
    return _.map(smoothLine.curves, function(d, i) {
      var fill = d.color.clone();
      fill.clearer(0.5);
      return <path d={ d.area.path.print() }  fill={ fill.rgbString() } />;
    });
  },

  render: function() {
    console.log(smoothLine);

    return (
      <div>
        <svg width="100" height="100">
          { this.renderPaths() }
        </svg>
        <svg width="300" height="200">

          { this.renderAreas() }
        </svg>
      </div>
    );
  }
});
