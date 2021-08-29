import Vue from 'vue'
import Router from 'vue-router'

import Usuario from './views/Usuario.vue'
import semPerfil from './views/semPerfil.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        { path: '/perfil', component: Usuario },
        { path: '/', component: semPerfil }
    ]
})