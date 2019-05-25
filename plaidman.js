/*
This is Plaidman (or some other name I think of latter, like plaidguy, plaidboy,
the plaid pussay, plaid ass mutha fucka, I dunno). Plaid man generate plaid
designs based on user input.



*/

/*
TODO list:

  + create an html file with a canvas object X

  + successfully have canvas object portray a changable background
    + background x
    + changeable x

  + successfully add and modify lines to canvas object
    + Add HTML element to the page X
      + color X
      + thickness X
      + regularity X
      + orientation X
    + Add line object to program instance that properly draws
      + color
      + thickness
      + regularity
      + orientation
    + interactions between HTML elements and line object
      + color
      + thickness
      + regularity
      + orientation
  + identify and modify overlapping colors
      + color math (blending)
      + how are the locations of the line represented?
      + function to identify the overlapping locations

*/

// canvas constants
const canvas = document.getElementById("plaidCanvas");
const ctx = canvas.getContext("2d");
const height = canvas.width;
const width = canvas.height;

// program constants
const background = new Base(parseColor($("#base").val()));
const lineArray = [];

// Object constructors
function Base(color) {
  this.color = color; // return value of parseColor() call
  this.draw = function(ctx, width, height) {
    if (this.color !== undefined) {
      ctx.fillStyle = this.color;
      var background = new Path2D();
      background.rect(0, 0, width, height);
      ctx.fill(background);
    }
  };
};

function Line() {
  this.color = parseColor("#000000"); // return value of parseColor() call
  this.thickness = 1;
  this.regularity = 1;
  this.orientation = "b"; // can be h for horizontal, v for vertical or b for both
}



// convert value from color element into string readable by fillStyle
function parseColor(colorString) {
  var red = parseInt("0x" + colorString.slice(1,3));
  var green = parseInt("0x" + colorString.slice(3,5));
  var blue = parseInt("0x" + colorString.slice(5,7));
  var output = 'rgb(' + red.toString() + ',' + green.toString() + ',' +
  blue.toString() + ')';
  return output;
}

// add lines to pattern
function addLine() {

  var panel = document.getElementById('controlPanel');
  var index = lineArray.length;

  // create element and add it to panel
  var newLine = document.createElement("div");
  panel.appendChild(newLine);

  // create line

  var newLineObject = Line()
  lineArray.push(newLineObject);

  // define name new line attributes
  newLine.id = "line" + index.toString();

  // add header
  header = document.createElement("h2");
  content = document.createTextNode("Line " + (index + 1).toString());
  header.appendChild(content);
  newLine.appendChild(header);

  // add color input
  var lineColor = document.createElement("input");
  lineColor.type = "color";
  lineColor.value = "#000000";
  lineColor.name = "C" + index;
  lineColor.class = "lineColor"
  newLine.appendChild(lineColor);

  // add thickness input
  var lineThickness = document.createElement("input");
  lineThickness.type = "range";
  lineThickness.value = 1;
  lineThickness.name = "T" + index.toString();
  lineThickness.class = "lineThickness";
  lineThickness.min = 1;
  lineThickness.max= 50;
  newLine.appendChild(lineThickness);

  // add regularity input
  var lineRegularity = document.createElement("input");
  lineRegularity.type = "range";
  lineRegularity.value = 1;
  lineRegularity.name = "R" + index.toString();
  lineRegularity.class = "lineRegularity";
  lineRegularity.min = 1;
  lineRegularity.max = 20;
  newLine.appendChild(lineRegularity);

  // add orientation seletor
  var lineSelector = document.createElement("select");

  var orients = ["horizontal", "vertical", "both"];

  for (let i = 0; i < orients.length; i++) {
    orient = orients[i];
    var option = document.createElement("option");
    option.value = orient.slice(0,2);
    option.appendChild(document.createTextNode(orient));
    lineSelector.appendChild(option);
  }

  newLine.appendChild(lineSelector);












}




$(document).ready(function() {

  // initialize background
  ctx.clearRect(0, 0, width, height);
  ctx.save();
  ctx.fillStyle = background.color;
  ctx.fillRect(0,0, width, height);
  ctx.restore();

  // event handlers
  $("#base").change(function(){
    background.color = parseColor($("#base").val());
    console.log("change registered");
    console.log(background.color);
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.fillStyle = background.color;
    ctx.fillRect(0,0, width, height);
    ctx.restore();
  });
});
