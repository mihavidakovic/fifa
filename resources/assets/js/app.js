
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
    	myha: 0,
    	count: 0,
    	message: "Fifa 2017",
        altMessage: [
            "Myha Foreee",
            "Juske najslabši",
            "Myha skos pametn neki",
            "Juske legenda",
            "Juske ne ve kje je doma"
        ]
    },
    methods: {
        addCount(){
        	if (this.count == 5) {
                var random = 0;
                random = Math.floor(Math.random() * this.altMessage.length)
        		this.message = this.altMessage[random];
        		this.count = 0;
        	} else {
        		this.count++;
        	}
        },
        fetchZmage: function() {
            var self = this;
            setInterval(function() {
                axios.get('/zmage').then(function(response) {
                	var celota = response.data.juske + response.data.myha;
                	var juske = (response.data.juske * 100) / celota;
					var myha = (response.data.myha * 100) / celota;
					if (celota == 0) {
						self.juske = 50;
						self.myha = 50;

					} else if ((response.data.juske == 0 && response.data.myha >= 1) || (response.data.myha == 0 && response.data.juske >= 1)) {
                        self.juske = 50;
                        self.myha = 50;
                    } else {
						self.juske = juske;
						self.myha = myha;
					}

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
