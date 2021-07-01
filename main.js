import Vue from 'vue';
import { Table, TableColumn, Button, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/directive/index'; // 注册全局指令

Vue.use(Table).use(TableColumn).use(Button);
Vue.prototype.$message = Message;
