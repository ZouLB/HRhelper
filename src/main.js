import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import { 
	Pagination,
	Dropdown,
  	DropdownMenu,
  	DropdownItem,
  	Menu,
  	Submenu,
  	MenuItem,
  	InputNumber,
	Button, 
	Table,
  	TableColumn,
  	DatePicker,
	Select,
	Option,
	Form, 
	FormItem, 
	Checkbox, 
	Input,
	Loading,
} from 'element-ui';
 
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'

Vue.use(Pagination);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(InputNumber);
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Checkbox);
Vue.use(Input);
Vue.use(Loading);

Vue.prototype.$axios = axios;

//mock
import Mock from './mock';
Mock.bootstrap();

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

