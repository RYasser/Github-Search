<template>
  <div id="app">
    <div class="titulo">
      <img src="./assets/logo.png" class="imgLogo">
    </div>
    <Pesquisa class="pesquisar" @mandarNome="user = $event"/>
    <component class="perfil" :is="respostaDaPesquisa" v-bind="propsAtuais"/>
    <component class="repos" :is="verificarRepositorio" :dataRepo="dataRepo"/>
  </div>
</template>

<script>
import Pesquisa from './components/pesquisa.vue'
import Perfil from './components/perfil.vue'
import semPerfil from './components/semPerfil.vue'
import Repositorios from './components/repositorios.vue'

export default {
  name: 'App',
  components: {
    Pesquisa,
    Perfil,
    semPerfil,
    Repositorios
  },
  data() {
    return {
      url: 'https://api.github.com/users',
      user: undefined,
      dataGit: '',
      respostaDaPesquisa: '',
      dataRepo: {}
    }
  },
  computed: {
    // Verifica qual componente está sendo utilizado para passar a propriedade ou não
    propsAtuais() {
      return this.respostaDaPesquisa === 'Perfil'
        ? { dataGit: this.dataGit }
        : {}
    },
    verificarRepositorio() {
      return this.respostaDaPesquisa === 'Perfil'? 'Repositorios' : ''
    }
  },
  methods: {
    // Método para realizar a requisição dos repositórios e ser chamado após a req do usuário
    pegarRepositorio() {
      fetch(`${this.url}/${this.user}/repos`)
      .then(res => res.json())
      .then(data => this.dataRepo = data)
    }
  },
  watch: {
    user: function() {
      // Realiza a requisição de acordo com o usuário informado
      fetch(`${this.url}/${this.user}`)
        .then(res => res.json())
        .then(data => {
          this.dataGit = data
          
          // Verifica se o perfil foi encontrado para utilizar o componente de acordo com a respota
          data.message === 'Not Found' ? 
            this.respostaDaPesquisa = 'semPerfil' : this.respostaDaPesquisa = 'Perfil'
        })
        // Realiza a requisição dos repositórios do usuário atual
        .then(data => this.pegarRepositorio())
        // Em caso de erro, executa o componente usado em caso o perfil não é encontrado
        .catch(error => this.respostaDaPesquisa = 'semPerfil')
    }
  }
}
</script>

<style>
  html, body {
    width: 100%;
    height: 100%;
  }

  .imgLogo {
    width: 200px;
  }

  #app {
    margin-left: 10%;
    margin-top: 5%;
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-rows: 20% 1fr;
    grid-template-columns: 25% 1fr;
    grid-template-areas: 
    "titulo pesquisa" 
    "perfil repos";
  }

  .pesquisar {
    grid-area: pesquisa;    
  }

  .perfil {
    grid-area: perfil;
  }

  .repos {
    grid-area: repos;
  }

  .titulo {
    grid-area: titulo;
  }
</style>
