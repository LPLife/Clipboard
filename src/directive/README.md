# 自定义指令说明

## clipboard自定义指令的使用

### main.js 中引入

```JavaScript
import '@/directive/index';
```

### 组件中使用：success、error不传入，则采用默认，若无默认值，复制后则不做响应

- template

``` html
<input v-model="text" />
<button type="button" v-clipboard:copy="text" v-clipboard:success="clipboardSuccess">
    Copy!
</button>
```

- vue methods 可选

```JavaScript
clipboardSuccess() {
    this.$message({
        message: '复制成功',
        type: 'success',
        duration: 500
    });
}
```

### 其他

- 统一处理轻提示，传入则采用自定义的，不传则采用默认，缺点：具备侵入性,视情况使用，当前环境ui库为element,主要代码：

```JavaScript
import Vue from 'vue'
// 默认复制成功提示 UI库为element
const clipboardSuccess = () => {
  Vue.prototype.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}
// 默认复制失败提示  UI库为element
const clipboardError = () => {
  Vue.prototype.$message({
    message: 'Copy failed',
    type: 'error'
  })
}
```

```JavaScript
//bind中指定位置加入 设置默认提示 具备较强侵入性，视情况更改为项目引入的，如果不设置
clipboard.on('success', e => {
  const callback = el._v_clipboard_success || clipboardSuccess();
  callback && callback(e) // eslint-disable-line
})
clipboard.on('error', e => {
  const callback = el._v_clipboard_error || clipboardError();
  callback && callback(e) // eslint-disable-line
})
```

***
