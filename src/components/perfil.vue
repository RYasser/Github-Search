<template>
    <aside>
        <img :src="urlImage">

        <h2>{{ nome }}</h2>
        <p>{{ user }}</p>
        <p>{{ localizacao }}</p>
        <p>{{ seguidores }}</p>
        <p>{{ repos }}</p>
    </aside>
</template>

<script>
export default {
    props: {
        dataGit: [Object, String]
    },
    data() {
        return {
            // Nome real do usuário
            nome: this.dataGit.name,
            // Imagem do perfil
            urlImage: this.dataGit.avatar_url,
            // Nome de usuário Github
            user: this.dataGit.login,
            // Localização
            localizacao: this.dataGit.location,
            // Número de seguidores
            seguidores: this.dataGit.followers,
            // Número de repositórios
            repos: this.dataGit.public_repos
        }
    },
    watch: {
        // Responsável para atualizar todas as variáveis do data que contém as novas informações requisitadas
        dataGit: function() {
            this.urlImage = this.dataGit.avatar_url
            this.nome = this.dataGit.name
            this.user = this.dataGit.login
            this.localizacao = this.dataGit.location
            this.seguidores = this.dataGit.followers
            this.repos = this.dataGit.public_repos
        }
    }
}
</script>

<style>

</style>