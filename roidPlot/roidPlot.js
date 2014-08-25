function makePlot() {
  var xScale = new Plottable.Scale.Ordinal();
  var yScale = new Plottable.Scale.Linear();
  var yScale2 = new Plottable.Scale.Linear();
  var radScale = new Plottable.Scale.Linear();
  radScale.domain([0,6]).range([0,20]);
  yScale.domain([0,0.06]);

  var xAxis = new Plottable.Axis.Category(xScale, "bottom");
  xScale.rangeType("points");
  
  var yAxis = new Plottable.Axis.Numeric(yScale, "left");
  
  var yAxis2 = new Plottable.Axis.Numeric(yScale, "right");
  yAxis2.formatter(function(tickValue) {
  	return String(Number(tickValue*398).toFixed(0));
  });
  
  var chartTitle = new Plottable.Component.TitleLabel("10 Nearby Asteroid Threats by MOID")
  var AUtag = new Plottable.Component.Label("AU");
  var LDtag = new Plottable.Component.Label("Lunar Distances", "right");
  
  var renderer = new Plottable.Plot.Scatter(subOutput, xScale, yScale)
                              .project("x", "Name", xScale)
                              .project("y", "MOID", yScale)
                              .project("r", "Diameter", radScale)
                              .project("fill", function() { return "steelblue"; } );

  var chart = new Plottable.Component.Table([
  					[AUtag, chartTitle, null, null],
                    [yAxis, renderer, yAxis2, LDtag],
                    [null,  xAxis, null, null]
                  ]);

  chart.renderTo("#roidPlot");
  
  window.setTimeout(function() {
	    $('circle').each(function() {
  			$(this).qtip({
  				content: {
  					text: "<font face = \"verdana\"> Diameter: " + this.__data__.Diameter
  					+ " km<br>" + "Earth MOID: " + Number((this.__data__.MOID)).toFixed(4) + " AU</font>",
  					title: "<font face = \"verdana\">" + this.__data__.Designation + " " + this.__data__.Name + "</font>"
        		},
        		position: {
        			my: 'left center',
        			adjust: {
            			x: 1.5*(5 + parseFloat(this.getAttribute("r")))
        			}
        		},
        		style: {
        			classes: 'qtip-blue qtip-tipped'
        		}
    		});
  		});
  }, 50);
}
