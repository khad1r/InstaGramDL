document.querySelector(".search").addEventListener("click", (e) => {
  const link = document.getElementById("link").value.split("/");
  id = link[4];
  console.log(id);
  fetch("https://igpi.ga/p/" + id + "/?__a=1").then((response) => {
    console.log(response);
  });
});

function renderMultiple(post) {
  html = "";
  path = post.graphql.shortcode_media.edge_sidecar_to_children.edges;
  for (var i = 0; i < path.length; i++) {
    pathChild = path[i].node;
    html += renderFeed(pathChild);
  }
  html +=
    '<a class="prev" onclick="plusSlides(-1)">&#10094;</a>\n<a class="next" onclick="plusSlides(1)">&#10095;</a>';
  renderHtml(html);
}

function renderSingle(post) {
  path = post.graphql.shortcode_media;
  html = renderFeed(path);
  renderHtml(html);
}

function renderFeed(path) {
  console.log(path);
  html = "";
  if (path.is_video) {
    html =
      '<div class="feed fade">\n<video class="feedIg" controls preload="none" poster="' +
      path.display_url +
      '"><source id="datauri" src="' +
      path.video_url +
      '" type="video/mp4"></video>\n</div>\n';
  } else {
    html =
      '<div class="feed fade">\n<img class="feedIg" loading="lazy" src="' +
      path.display_url +
      '">\n</div>\n';
  }
  return html;
}

function renderHtml(html) {
  html += '<span class="text">Right Click or Long Press to download</span>';
  scrape = document.querySelector(".scrape");
  scrape.innerHTML = html;
  scrape.style.display = "block";
  slideIndex = 1;
  showSlides(slideIndex);
}

var slideIndex = 1;

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("feed");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].className = slides[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
}
function a() {
  var http_request = new XMLHttpRequest();
  http_request.open(
    "GET",
    "https://www.instagram.com/p/" + id + "/?__a=1",
    true
  );
  http_request.withCredentials = "true";
  http_request.setRequestHeader("Access-Control-Allow-Origin", "*");
  http_request.setRequestHeader("Content-Type", "application/json");

  http_request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var resp = JSON.parse(this.response);
      if ("edge_sidecar_to_children" in resp.graphql.shortcode_media) {
        renderMultiple(resp);
      } else {
        renderSingle(resp);
      }
    } else {
      // We reached our target server, but it returned an error
      alert("Link salah atau Internet lo Lemot");
    }
  };

  http_request.onerror = function () {
    // There was a connection error of some sort
    alert("Paketan lo habis");
  };
  http_request.onreadystatechange = function () {
    console.log(http_request);
  };
  http_request.send();
}
