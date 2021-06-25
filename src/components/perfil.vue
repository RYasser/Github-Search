<template>
    <aside>
        <img :src="urlImage" class="imgPerfil">
        <h2 class="nome">{{ nome }}</h2>
        <span class="user">{{ user }}</span>

        <div class="dados">
            <span v-if="localizacao != null" class="localizacao">
                <img src="../assets/location.png">
                {{ localizacao }}
            </span>
            
            <span v-if="repos != null">
                <img src="../assets/repository.png">
                {{ repos }}
            </span>

            <span v-if="org != null">
                <img src="../assets/org.png">
                {{ org }}
            </span>
            
            <span v-if="seguidores != null">
                <img src="../assets/followers.png">
                {{ seguidores }}
            </span>
        </div>    
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
            repos: this.dataGit.public_repos,

            // Organização
            org: this.dataGit.company
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
            this.org = this.dataGit.company
        }
    }
}
</script>

<style scoped>
    .imgPerfil {
        width: 170px;
    }

    .nome {
        margin-top: 3px;
        padding: 0px;
        margin: 0px;
    }

    .dados {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }
</style>