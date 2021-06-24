<template>
    <main>
        <div v-for="repo in dataRepo" class="repoContainer">
            <h2>Nome: {{repo.name}}</h2>
            <span class="descricao">{{repo.description}}</span>
            <span><img src="../assets/estrela.png" class="imgEstrela"> {{repo.stargazers_count}}</span>
            <p></p>
        </div>
    </main>
</template>

<script>
export default {
    props: {
        // Dados dos repositórios via prop
        dataRepo: [Object, Array]
    }
}
</script>

<style scoped>
    .imgEstrela {
        width: 15px;
    }

    .descricao {
        word-wrap: break-word;
    }

    .repoContainer {
        width: 57%;
        display: flex;
        flex-direction: column;
    }
</style>