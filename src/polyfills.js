// Temporary polyfills - remove once they become unnecessary

// polyfill for requestAnimationFrame - issue in create-react-app
// https://github.com/facebookincubator/create-react-app/issues/3199#issuecomment-332842582
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};
