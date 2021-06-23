<template>
    <aside>
        <img src="#">

        <h2>{{ dataGit }}</h2>
        
    </aside>
</template>

<script>
export default {
    props: {
        dataGit: [Object, String]
    },
    data() {
        return {
            nome: '',
        }
    }
}
</script>

<style>

</style>