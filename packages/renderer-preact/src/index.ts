import { options, render } from 'preact';
import define from '@skatejs/define';

const mapDom = new WeakMap();
let oldVnode;

function newVnode(vnode) {
  const { nodeName } = vnode;
  if (nodeName.prototype instanceof HTMLElement) {
    vnode.nodeName = define(nodeName).is;
  }
  return vnode;
}

function setupPreact() {
  oldVnode = options.vnode;
  options.vnode = newVnode;
}

function teardownPreact() {
  options.vnode = oldVnode;
}

export default function(elem) {
  const root = elem.renderRoot;
  const dom = mapDom.get(root);
  setupPreact();
  mapDom.set(
    root,
    render(
      elem.isConnected ? elem.render() : null,
      root,
      dom || root.childNodes[0]
    )
  );
  teardownPreact();
}

export { h } from 'preact';
