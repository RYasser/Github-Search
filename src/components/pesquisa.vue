<template>
    <nav>
        <input placeholder="Usuário" class="pesquisa" v-model="user">
        <div class="containerLupa" @click="pegarNome">
            <img src="../assets/lupa.png" class="imgPesquisar">
        </div>
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
            this.user = ''
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
    }

    .pesquisa {
        grid-area: inputPesquisa;
        height: 25px;
    }

    .imgPesquisar {
        width: 26px;
        margin-top: 2px;
        margin-left: 13px;
    }

    .containerLupa {
        background-color: #000000;
        width: 55px;
        height: 31px;
    }

    @media(max-width: 768px) {
        nav {
            grid-template-columns: 290px 80px;

        }
    }

</style>