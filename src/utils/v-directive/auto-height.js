/**
 * 创建一个vue自定义指令 用来监听窗口resize事件 使element-ui的table组件的max-height属性能够根据屏幕大小自适应
 * 指令的内部会有五个生命周期事件函数
 * 1. bind(){} 当指令绑定到 HTML 元素上时触发.只调用一次.
 * 2. inserted() 当绑定了指令的这个HTML元素插入到父元素上时触发(在这里父元素是 div#app).但不保证,父元素已经插入了 DOM 文档.
 * 3. updated() 所在组件的VNode更新时调用.
 * 4. componentUpdate 指令所在的组件的VNode以及其子VNode 全部更新后调用.
 * 5. unbind: 指令和元素解绑的时候调用,只调用一次
 */

export default {
  componentUpdated(el, binding, vNode) {
    const ctx = vNode.context;
    if (!ctx || typeof ctx[binding.arg] === 'undefined' || ctx.autoHeightResizeListener) return;

    ctx.autoHeightResizeListener = () => {
      let top = el.offsetTop;
      let cur = el.offsetParent;
      while (cur !== null) {
        top += cur.offsetTop;
        cur = cur.offsetParent;
      }
      const h = (window.innerHeight - top) + binding.value;
      ctx[binding.arg] = Math.max(h, 100);
    };
    window.addEventListener('resize', ctx.autoHeightResizeListener, false);

    setTimeout(ctx.autoHeightResizeListener, 50);
  },
  unbind(el, binding, vNode) {
    const ctx = vNode.context;
    if (ctx && ctx.autoHeightResizeListener) {
      window.removeEventListener('resize', ctx.autoHeightResizeListener, false);
      ctx.autoHeightResizeListener = null;
    }
  },
};
