// Inspired by https://github.com/Inndy/vue-clipboard2
// import Vue from 'vue';
// const Clipboard = require('clipboard')
if (!Clipboard) {
  throw new Error('you should npm install `clipboard` --save at first ')
}
// 默认复制成功提示 UI库为element
// const clipboardSuccess = () => {
//   Vue.prototype.$message({
//     message: 'Copy successfully',
//     type: 'success',
//     duration: 500,
//   })
// }
// 默认复制失败提示  UI库为element
// const clipboardError = () => {
//   Vue.prototype.$message({
//     message: 'Copy failed',
//     type: 'error',
//     duration: 500,
//   })
// }

export default {
  bind: function (el, binding, vnode) {
    if (binding.arg === 'success') {
      el._vClipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._vClipboard_error = binding.value
    } else {
      let clipboard = new Clipboard(el, {
        text: function () { return binding.value },
        action: function () { return binding.arg === 'cut' ? 'cut' : 'copy' },
      })
      clipboard.on('success', function (e) {
        // let callback = el._vClipboard_success || clipboardSuccess();
        let callback = el._vClipboard_success;

        callback && callback(e)
      })
      clipboard.on('error', function (e) {
        // let callback = el._vClipboard_error || clipboardError();
        let callback = el._vClipboard_error;
        callback && callback(e)
      })
      el._vClipboard = clipboard
    }
  },
  update: function (el, binding) {
    if (binding.arg === 'success') {
      el._vClipboard_success = binding.value
    } else if (binding.arg === 'error') {
      el._vClipboard_error = binding.value
    } else {
      el._vClipboard.text = function () { return binding.value }
      el._vClipboard.action = function () { return binding.arg === 'cut' ? 'cut' : 'copy' }
    }
  },
  unbind: function (el, binding) {
    if (binding.arg === 'success') {
      delete el._vClipboard_success
    } else if (binding.arg === 'error') {
      delete el._vClipboard_error
    } else {
      el._vClipboard.destroy()
      delete el._vClipboard
    }
  },
}
