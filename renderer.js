"use strict";

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", "400");
svg.setAttribute("height", "100");


let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
circle.setAttributeNS(null, "cx", 50);
circle.setAttributeNS(null, "cy", 50);
circle.setAttributeNS(null, "r", 30);
circle.setAttributeNS(null, "fill", "red");
circle.id = "foo";


svg.appendChild(circle);
graph.appendChild(svg);


function spin() {
	let circle = document.getElementById("foo");
	let old_cx = parseInt(circle.getAttributeNS(null, "cx"), 10);
	circle.setAttributeNS(null, "cx", old_cx + 1);
	setTimeout(spin, 50);
}

spin();
