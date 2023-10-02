const content = `
Fall of Ancient Rome #1.color_purple
  caused by: (#2)
  caused by: (#3)
  caused by: (#4)
  caused by: (#5)
  caused by: (#6)
  caused by: (#7)
  caused by: (#8)
Economic Instability #2
Military Spending #3
Overexpansion and Political Instability #4
Invasion by Barbarian tribes #5
Rise of the Eastern Empire #6
Dependence on Slave Labor #7
Religious Disputes #8

`;

const template = `=====
{
"cytoscapeStyle": "@import url(\\"https://fonts.googleapis.com/css2?family=Inclusive+Sans&display=swap\\");\\n\\n$background: rgb(239, 239, 239);\\n$color: #314137;\\n$fontFamily: \\"Inclusive Sans\\", sans-serif;\\n$green: #75ed99;\\n$red: #f88373;\\n$orange: #ffb566;\\n$purple: #a7a3fa;\\n$grey: #d3cec8;\\n\\nedge {\\n  width: 2px;\\n  curve-style: bezier;\\n  target-arrow-shape: triangle;\\n  line-color: $color;\\n  source-arrow-color: $color;\\n  target-arrow-color: $color;\\n  arrow-scale: 1.25;\\n  label: data(label);\\n  text-background-color: $background;\\n  text-background-opacity: 1;\\n  text-background-padding: 2.5;\\n  font-family: $fontFamily;\\n  font-size: 14;\\n  source-distance-from-node: 0;\\n  target-distance-from-node: 4;\\n  text-rotation: autorotate;\\n}\\n\\n:childless[shapeWidth] {\\n  width: data(shapeWidth);\\n}\\n\\n:childless[shapeHeight] {\\n  height: data(shapeHeight);\\n}\\n\\n:childless[textMarginY] {\\n  text-margin-y: data(textMarginY);\\n}\\n\\n:childless[textMarginX] {\\n  text-margin-x: data(textMarginX);\\n}\\n\\n:childless {\\n  label: data(label);\\n  font-family: $fontFamily;\\n  text-wrap: wrap;\\n  text-max-width: 100;\\n  width: 140;\\n  height: label;\\n  padding: 20;\\n  font-size: 16;\\n  text-valign: center;\\n  text-halign: center;\\n  line-height: 1.4;\\n  shape: rectangle;\\n  background-color: white;\\n  color: $color;\\n  border-color: $color;\\n  border-width: 0;\\n  border-style: solid;\\n  font-weight: 500;\\n}\\n\\n:childless.color_red {\\n  background-color: $red;\\n}\\n:childless.color_orange {\\n  background-color: $orange;\\n}\\n:childless.color_green {\\n  background-color: $green;\\n}\\n:childless.color_purple {\\n  background-color: $purple;\\n}\\n:childless.color_grey {\\n  background-color: $grey;\\n}\\n\\n:childless.shape_rectangle {\\n  shape: rectangle;\\n}\\n:childless.shape_roundrectangle {\\n  shape: roundrectangle;\\n}\\n:childless.shape_ellipse {\\n  shape: ellipse;\\n}\\n:childless.shape_triangle {\\n  shape: triangle;\\n}\\n:childless.shape_pentagon {\\n  shape: pentagon;\\n}\\n:childless.shape_hexagon {\\n  shape: hexagon;\\n}\\n:childless.shape_heptagon {\\n  shape: heptagon;\\n}\\n:childless.shape_octagon {\\n  shape: octagon;\\n}\\n:childless.shape_star {\\n  shape: star;\\n  height: 120;\\n}\\n:childless.shape_barrel {\\n  shape: barrel;\\n}\\n:childless.shape_diamond {\\n  shape: diamond;\\n}\\n:childless.shape_vee {\\n  shape: vee;\\n}\\n:childless.shape_rhomboid {\\n  shape: rhomboid;\\n}\\n:childless.shape_right-rhomboid {\\n  shape: right-rhomboid;\\n}\\n:childless.shape_tag {\\n  shape: tag;\\n}\\n:childless.shape_round-rectangle {\\n  shape: round-rectangle;\\n}\\n:childless.shape_cut-rectangle {\\n  shape: cut-rectangle;\\n}\\n:childless.shape_bottom-round-rectangle {\\n  shape: bottom-round-rectangle;\\n}\\n:childless.shape_concave-hexagon {\\n  shape: concave-hexagon;\\n}\\n:childless.border_none {\\n  border-width: 0;\\n  border-style: solid;\\n}\\n:childless.border_solid {\\n  border-width: 2;\\n  border-style: solid;\\n}\\n:childless.border_dashed {\\n  border-width: 2;\\n  border-style: dashed;\\n}\\n:childless.border_dotted {\\n  border-width: 2;\\n  border-style: dotted;\\n}\\n\\n:childless[w] {\\n  width: data(w);\\n}\\n\\n:childless[h] {\\n  height: data(h);\\n}\\n\\nedge.line_solid {\\n  line-style: solid;\\n}\\nedge.line_dotted {\\n  line-style: dotted;\\n}\\nedge.line_dashed {\\n  line-style: dashed;\\n}\\nedge.target-arrow_triangle {\\n  target-arrow-shape: triangle;\\n}\\nedge.target-arrow_triangle-tee {\\n  target-arrow-shape: triangle-tee;\\n}\\nedge.target-arrow_circle-triangle {\\n  target-arrow-shape: circle-triangle;\\n}\\nedge.target-arrow_triangle-cross {\\n  target-arrow-shape: triangle-cross;\\n}\\nedge.target-arrow_triangle-backcurve {\\n  target-arrow-shape: triangle-backcurve;\\n}\\nedge.target-arrow_vee {\\n  target-arrow-shape: vee;\\n}\\nedge.target-arrow_tee {\\n  target-arrow-shape: tee;\\n}\\nedge.target-arrow_square {\\n  target-arrow-shape: square;\\n}\\nedge.target-arrow_circle {\\n  target-arrow-shape: circle;\\n}\\nedge.target-arrow_diamond {\\n  target-arrow-shape: diamond;\\n}\\nedge.target-arrow_chevron {\\n  target-arrow-shape: chevron;\\n}\\nedge.target-arrow_none {\\n  target-arrow-shape: none;\\n}\\nedge.source-arrow_triangle {\\n  source-arrow-shape: triangle;\\n}\\nedge.source-arrow_triangle-tee {\\n  source-arrow-shape: triangle-tee;\\n}\\nedge.source-arrow_circle-triangle {\\n  source-arrow-shape: circle-triangle;\\n}\\nedge.source-arrow_triangle-cross {\\n  source-arrow-shape: triangle-cross;\\n}\\nedge.source-arrow_triangle-backcurve {\\n  source-arrow-shape: triangle-backcurve;\\n}\\nedge.source-arrow_vee {\\n  source-arrow-shape: vee;\\n}\\nedge.source-arrow_tee {\\n  source-arrow-shape: tee;\\n}\\nedge.source-arrow_square {\\n  source-arrow-shape: square;\\n}\\nedge.source-arrow_circle {\\n  source-arrow-shape: circle;\\n}\\nedge.source-arrow_diamond {\\n  source-arrow-shape: diamond;\\n}\\nedge.source-arrow_chevron {\\n  source-arrow-shape: chevron;\\n}\\nedge.source-arrow_none {\\n  source-arrow-shape: none;\\n}\\n\\n:parent {\\n  padding: 10;\\n  border-style: solid;\\n  border-width: 2;\\n  border-color: $color;\\n  background-color: $background;\\n  text-valign: top;\\n  font-family: $fontFamily;\\n  label: data(label);\\n  color: $color;\\n  font-size: 19.5px;\\n  text-margin-y: -5;\\n}\\n\\n:parent.color_white {\\n  background-color: white;\\n}\\n:parent.color_grey {\\n  background-color: $grey;\\n}\\n",
"layout": {
  "name": "cose",
  "spacingFactor": 1.5
}
}
=====`;

export { content, template };
