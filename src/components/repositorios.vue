<template>
    <main>
        <div v-for="repo in dataRepo">
            Nome: {{repo.name}}
            <br>
            Descrição: {{repo.description}}
            <br>
            Estrelas: {{repo.stargazers_count}}
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