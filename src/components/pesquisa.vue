<template>
    <nav>
        <input placeholder="Usuário" class="pesquisa" v-model="user">
        <img src="../assets/lupa.png" class="btnPesquisar" @click="pegarNome">
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

<style>
    nav {
        display: grid;
        grid-template-areas: "inputPesquisa btnPesquisa";
        grid-template-columns: 350px 80px;
        grid-template-rows: 100%;
        margin-left: 15%;
        width: 60px;
    }

    .pesquisa {
        grid-area: inputPesquisa;
        height: 25px;
    }

    .btnPesquisar {
        padding: 0px;
        margin: 0px;
        grid-area: btnPesquisa;
        background-color: black;
        width: 30px;
    }

    @media(max-width: 768px) {
        nav {
            grid-template-columns: 290px 80px;

        }
    }

</style>