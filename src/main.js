// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from 'components/goods/goods';
import ratings from 'components/ratings/ratings';
import seller from 'components/seller/seller';

import 'common/stylus/index.styl';

Vue.use(VueRouter);
Vue.use(VueResource);

let app = Vue.extend(App);

let router = new VueRouter({
	linkActiveClass: 'active'
});
/**
 * 配置路由
 */
router.map({
	'/goods': {
		component: goods
	},
	'/ratings': {
		component: ratings
	},
	'/seller': {
		component: seller
	}
});
router.start(app, '#app');
router.redirect({ // 初次加载重定向至商品页
  '/': '/goods'
});
