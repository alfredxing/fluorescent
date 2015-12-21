'use strict';

export default function() {
  if (!chrome) return;

  let style = document.createElement('style');
  style.innerHTML = fontStyles(chrome.extension.getURL('resources'));

  document.head.appendChild(style);
}

const fontStyles = resourcePath => `
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(${resourcePath}/fonts/material-icons/MaterialIcons-Regular.eot); /* For IE6-8 */
    src: local('Material Icons'),
         local('MaterialIcons-Regular'),
         url(${resourcePath}/fonts/material-icons/MaterialIcons-Regular.woff2) format('woff2'),
         url(${resourcePath}/fonts/material-icons/MaterialIcons-Regular.woff) format('woff'),
         url(${resourcePath}/fonts/material-icons/MaterialIcons-Regular.ttf) format('truetype');
  }
  @font-face {
    font-family: 'Roboto';
    src:  url(${resourcePath}/fonts/roboto/Roboto-Regular.eot);
    src:  local('Roboto Regular'),
          local('Roboto-Regular'),
          url(${resourcePath}/fonts/roboto/Roboto-Regular.eot?#iefix) format('embedded-opentype'),
          url(${resourcePath}/fonts/roboto/Roboto-Regular.woff2) format('woff2'),
          url(${resourcePath}/fonts/roboto/Roboto-Regular.woff) format('woff'),
          url(${resourcePath}/fonts/roboto/Roboto-Regular.ttf) format('truetype'),
          url(${resourcePath}/fonts/roboto/Roboto-Regular.svg#Roboto) format('svg');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto';
    src:  url('${resourcePath}/fonts/roboto/Roboto-Bold.eot');
    src:  local('Roboto Bold'),
          local('Roboto-Bold'),
          url('${resourcePath}/fonts/roboto/Roboto-Bold.eot?#iefix') format('embedded-opentype'),
          url('${resourcePath}/fonts/roboto/Roboto-Bold.woff2') format('woff2'),
          url('${resourcePath}/fonts/roboto/Roboto-Bold.woff') format('woff'),
          url('${resourcePath}/fonts/roboto/Roboto-Bold.ttf') format('truetype'),
          url('${resourcePath}/fonts/roboto/Roboto-Bold.svg#Roboto') format('svg');
    font-weight: 700;
    font-style: normal;
  }
`;
