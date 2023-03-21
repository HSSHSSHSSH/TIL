function showPic (whichPic) {
  var source = whichPic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  placeholder.setAttribute("src", source);
  let text = whichPic.getAttribute("title");
  var description = document.getElementById("description");
  description.firstChild.nodeValue = text;
}

function childrenCount () {
  console.log(document.body.childNodes.length);
}