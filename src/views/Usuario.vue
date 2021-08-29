<template>
    <div class="containerUsuario">
        <transition>
            <Perfil class="perfil" :dataGit="dataGit" v-if="animar"/>
        </transition>

        <transition>
            <Repositorios class="repos" :dataRepo="dataRepo" v-if="animar" />
        </transition>
    </div>
</template>

<script>
import Perfil from '../components/Perfil.vue'
import Repositorios from '../components/Repositorios.vue'

export default {
    components: {
        Perfil,
        Repositorios
    },
    props: {
        dataGit: [Object, String, Array],
        dataRepo: [Object, String, Array],
        animar: Boolean,
        perfil: Boolean
    }
}
</script>

<style scoped>
    .containerUsuario {
        display: grid;
        grid-template-rows: 100%;
        grid-template-columns: 330px 1fr;
        grid-template-areas:
        "perfil repositorio";
    }

    .repos {
        grid-area: repositorio;
    }

    .perfil {
        grid-area: perfil;
    }
</style>