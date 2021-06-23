<template>
    <nav>
        <input placeholder="Usuário GitHub" class="pesquisa" v-model="user">
        <button id="btnPesquisar" class="btnPesquisar" @click="pegarNome">Pesquisar</button>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            // Dados ligado com o input de pesquisa para ser enviado no evento de click
            user: '',
        }
    },
    methods: {
        // Evento que será chamado quando clicar e enviar para o componente App
        pegarNome(e) {
            this.$emit('mandarNome', this.user)
        }
    }
}
</script>

<style scoped>
    nav {
        display: grid;
        grid-template-areas: "inputPesquisa btnPesquisa";
        grid-template-columns: 550px 80px;
    }

    .pesquisa {
        grid-area: inputPesquisa;
        height: 20px;
    }

    .btnPesquisar {
        grid-area: btnPesquisa;

    }

</style>