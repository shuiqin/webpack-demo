/**
 * Created by shuiqin on 2/24/18.
 */
function getComponent() {
  var element = document.createElement('div');

       // Lodash, now imported by this script
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(_ => {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack11'], ' ');
    return element;
  }).catch(error => 'An error occurred while loading the component');
}

getComponent().then(component => {
 document.body.appendChild(component);
});
