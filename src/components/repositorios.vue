<template>
    <main>
        <transition-group>
            <div v-for="(repo, i) in dataRepo" class="repoContainer" :key="i">
                <h2>{{repo.name}}</h2>
                <span class="descricao">{{repo.description}}</span>
                <span class="repoEstrelas"><img src="../assets/estrela.png" class="imgEstrela"> {{repo.stargazers_count}}</span>
            </div>
        </transition-group>
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
        margin-left: 50px;
        margin-bottom: 25px;
    }

    .repoEstrelas {
        margin-top: 7px;
    }

    @media(max-width: 768px) {
        .repoContainer {
            width: 25%;
            margin-left: 10px;
        }
    }

    


</style>