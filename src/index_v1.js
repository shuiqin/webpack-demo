/**
 * Created by shuiqin on 2/22/18.
 */
function component() {
  var element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' '); // https://unpkg.com/lodash@4.16.6

  return element;
}

document.body.appendChild(component());