
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import axios from '../../../node_modules/axios'
const moment = require('moment')
require('moment/locale/sl')

Vue.use(require('vue-moment'), {
    moment
})

console.log(Vue.moment().locale()) //es
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('oseba', require('./components/Oseba.vue'));

const app = new Vue({
    el: '#app',
    data: {
    	juske: 0,
    	myha: 0
    },
    methods: {
        fetchZmage: function() {
            var self = this;
            setInterval(function() {
                axios.get('/zmage').then(function(response) {
                	var celota = response.data.juske + response.data.myha;
                	var juske = (response.data.juske * 100) / celota;
					var myha = (response.data.myha * 100) / celota;
					self.juske = juske;
					self.myha = myha;

                }) .catch(function (error) {
				    console.log(error);
				  });
            }, 1000);
        },
    },
    created: function() {
		this.fetchZmage();
    }
});
