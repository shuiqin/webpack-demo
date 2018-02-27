/**
 * Created by shuiqin on 2/24/18.
 */
async function getComponent1() {
   var element = document.createElement('div');
   const _ = await import(/* webpackChunkName: "lodash" */ 'lodash');

  element.innerHTML = _.join(['Hello11', 'webpack232'], ' ');
  return element;
}

getComponent1().then(component => {
  document.body.appendChild(component);
});