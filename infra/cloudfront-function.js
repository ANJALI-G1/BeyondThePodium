// CloudFront Function (viewer-request, runtime cloudfront-js-2.0)
// Maps clean URLs to the static files Next.js exports:
//   /             -> /index.html
//   /insights/    -> /insights/index.html
//   /insights     -> /insights/index.html
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith("/")) {
    request.uri += "index.html";
  } else if (!uri.split("/").pop().includes(".")) {
    request.uri += "/index.html";
  }
  return request;
}
