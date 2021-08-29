<template>
    <div>
        <div v-if="primeiraRenderizacao">
            <h2 class="info">Nenhum perfil no momento.</h2>
            <p class="texto">Busque por um perfil do GitHub no campo de busca acima.</p>
        </div>
        <div v-else>
            <h2 class="info">Nenhum perfil foi encontrado.</h2>
            <p class="texto">Nenhum perfil existente do GitHub foi encontrado.</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        primeiraRenderizacao: Boolean
    },
    beforeCreate() {
        // Adiciona a classe para ajustar o layout sem Perfil ativo
        this.$root.$el.classList.add('layoutSemPerfil')
    },
    destroyed() {
        // Remove a classe para ajustar o layout com Perfil ativo
        this.$root.$el.classList.remove('layoutSemPerfil')
    }
}
</script>

<style>
    .info {
        font-size: 30px;
    }

    .texto, .info {
        text-align: center;
    }
</style>