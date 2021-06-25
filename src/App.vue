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
import { decrescente } from './funcionalidades/decrescente.js'

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
      // Manda pro armazenamento de repositórios do usuário atual com a lógica de decrementação
      .then(data => this.dataRepo = decrescente(data))
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
        // Realiza a requisição dos repositórios do usuário encontrado
        .then(data => this.pegarRepositorio())
        // Em caso de erro, executa o componente usado em caso o perfil não é encontrado
        .catch(error => this.respostaDaPesquisa = 'semPerfil')
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap');

  html, body {
    font-family: Rubik;
    color: #757575;
    width: 1141px;
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

  h2 {
    color: #000000;
  }

  @media(max-width: 768px) {
    .pesquisar { 
      margin-bottom: 25px; 
      margin-left: 0%;
    }

    #app {
    grid-template-rows: 20% 1fr 1fr 1fr;
    grid-template-columns: 100%;
    grid-template-areas: 
    "titulo" 
    "pesquisa"
    "perfil"
    "repos";
  }
}
</style>
