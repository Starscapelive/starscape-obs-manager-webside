export const loadSrcipt = (src, callback) => {

//   console.log(getStaticDomain());
  let script = document.createElement('script'),
      head = document.getElementsByTagName('head')[0];
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.src = src;
  if (script.addEventListener) {
      script.addEventListener('load', function () {
          callback(true);
      }, false);

      script.addEventListener('error', function () {
          callback(false);
      }, false);
  } else if (script.attachEvent) {
      script.attachEvent('onreadystatechange', function () {
          var target = window.event.srcElement;
          if (target.readyState === 'loaded') {
              callback(true);
          }
      });
  }
  head.appendChild(script);
}