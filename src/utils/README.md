# 工具

## clipboard

### 使用

```html
<!-- Target -->
<input v-model="name" />
<!-- Trigger -->
<button class="btn" @click="handleClipboard(name, $event)">Copy to clipboard</button>
```

```javascript
import clip from '@/utils/clipboard';
export default {
    data() {
        return {
            name: ''
        };
    },
    methods: {
        handleClipboard(text, event) {
            clip(text, event);
        }
    }
};
</script>
```
