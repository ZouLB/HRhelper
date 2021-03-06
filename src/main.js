import App from './App'
//import Vue from 'vue'
import router from './router'
//import axios from 'axios';
//import VueQuillEditor from 'vue-quill-editor'

//import { 
//	Pagination,
//	Dropdown,
//	DropdownMenu,
//	DropdownItem,
//	Menu,
//	Submenu,
//	MenuItem,
//	InputNumber,
//	Radio,
//	RadioGroup,
//	Button, 
//	Table,
//	TableColumn,
//	Tabs,
//	TabPane,
//	DatePicker,
//	TimePicker,
//	Select,
//	Option,
//	Form, 
//	FormItem, 
//	Checkbox, 
//	Input,
//	Loading,
//	MessageBox,
//	Message,
//} from 'element-ui';
 
//import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'

//Vue.use(Pagination);
//Vue.use(Dropdown);
//Vue.use(DropdownMenu);
//Vue.use(DropdownItem);
//Vue.use(Menu);
//Vue.use(Submenu);
//Vue.use(MenuItem);
//Vue.use(InputNumber);
//Vue.use(Radio);
//Vue.use(RadioGroup);
//Vue.use(Button);
//Vue.use(Table);
//Vue.use(TableColumn);
//Vue.use(Tabs);
//Vue.use(TabPane);
//Vue.use(DatePicker);
//Vue.use(TimePicker);
//Vue.use(Select);
//Vue.use(Option);
//Vue.use(Form);
//Vue.use(FormItem);
//Vue.use(Checkbox);
//Vue.use(Input);
//Vue.use(Loading);
//Vue.component(MessageBox.name, MessageBox);
//Vue.component(Message.name, Message);
//
//Vue.prototype.$alert = MessageBox.alert;
//Vue.prototype.$confirm = MessageBox.confirm;
//Vue.prototype.$message = Message;

//Vue.prototype.$axios = axios;

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
//
//Vue.use(VueQuillEditor)


//mock
//import Mock from './mock';
//Mock.bootstrap();

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

