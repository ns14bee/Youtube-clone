import * as Vue from 'vue'
import App from './App.vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import * as VueObserveVisibility from "vue-observe-visibility";
// import * as IntersectionObserver from 'intersection-observer';


import router from  './Router/router.js'
import store from './store/store.js'
// import { VueReCaptcha } from "vue-recaptcha-v3"
const requireComponent = require.context(   
    './components/Forms',
    false,
    /Base[A-Z]\w+\.(vue|js)$/
)
const app = Vue.createApp(App)

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)
    const componentName = upperFirst(
        camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
    )

    app.component(componentName,componentConfig.default || componentConfig)
})

// app.use(VueReCaptcha, { siteKey: "6LdJPSkeAAAAAOzcSn180SjnnEUozY-FjA0vQ8m3" });
app.use(VueObserveVisibility);
// app.directive('observe-visibility',VueObserveVisibility.ObserveVisibility);
app.use(store);
app.use(router).mount('#app');
