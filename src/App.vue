<template>
  <div id="app" class="layoutComPerfil layoutSemPerfil">
    <div class="titulo">
      <img src="./assets/logo.png" class="imgLogo">
    </div>
    <Pesquisa class="pesquisar" @mandarNome="user = $event"/>

    <transition>
      <Perfil class="perfil" :dataGit="dataGit" v-if="animar && perfil"/>
    </transition>

    <transition>
      <Repositorios class="repos" :dataRepo="dataRepo" v-if="animar && perfil" />
    </transition>
    
    <semPerfil class="semPerfil" :primeiraRenderizacao="primeiraRenderizacao" v-if="!perfil"/>

  </div>
</template>

<script>
import Pesquisa from './components/Pesquisa.vue'
import Perfil from './components/Perfil.vue'
import semPerfil from './components/semPerfil.vue'
import Repositorios from './components/Repositorios.vue'
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
      dataRepo: {},
      animar: false,
      perfil: false,
      primeiraRenderizacao: false
    }
  },
  /* Responsável por identificar e renderizar no component semPerfil 
  se o usuário informado é inválido ou é apenas a primeira render */
  created() {
    this.primeiraRenderizacao = true
  },
  updated() {
    this.primeiraRenderizacao = false
  },
  methods: {
    // Método para realizar a requisição dos repositórios e ser chamado após a req do usuário
    async pegarRepositorio() {
        
      try {
        const response = await fetch(`${this.url}/${this.user}/repos`)
        const data = await response.json()
        // Manda pro armazenamento de repositórios do usuário atual com a lógica de decrementação
        this.dataRepo = decrescente(data)
      } catch {
        this.perfil = false
        this.animar = false
      }     
    }
  },
  watch: {
    user: async function() {
      // Realiza a requisição de acordo com o usuário informado
      try {
        const response = await fetch(`${this.url}/${this.user}`)
        const data = await response.json()

        this.dataGit = data
            
        // Verifica se o perfil foi encontrado para utilizar o componente de acordo com a resposta
        if (data.message === 'Not Found') {
          this.perfil = false
        } else {

          this.perfil = true
          this.animar = false

          // Temporizador para o reset dar efeito da animação
          setTimeout(() => {
            this.animar = true

          }, 300)
        }
        // Realiza a requisição dos repositórios do usuário encontrado
        this.pegarRepositorio()
      } catch {
        // Em caso de erro, executa o componente usado em caso o perfil não é encontrado
        this.perfil = false
      }
          
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


  .layoutComPerfil {
    margin-left: 15%;
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

  /* Responsável por ajustar o layout
  quando não possuir um perfil ativo */
  .layoutSemPerfil {
    margin-left: 5%;
    margin-top: 5%;
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-rows: 20% 1fr;
    grid-template-columns: 400px 1fr;
    grid-template-areas: 
    "titulo pesquisa" 
    "semPerfil semPerfil";
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

  .semPerfil {
    grid-area: semPerfil;
  }

  h2 {
    color: #000000;
  }

  @media(max-width: 768px) {
    .pesquisar { 
      margin-bottom: 25px; 
      margin-left: 0%;
    }

    .comPerfil {
    grid-template-rows: 20% 1fr 1fr 1fr;
    grid-template-columns: 20%;
    grid-template-areas: 
    "titulo" 
    "pesquisa"
    "perfil"
    "repos";
    }

    .semPerfil {
    grid-template-rows: 20% 1fr 1fr 1fr;
    grid-template-columns: 20%;
    grid-template-areas: 
    "titulo" 
    "pesquisa"
    "semPerfil";
    }
  }

  @keyframes slide {
    0% {
          transform: translateX(-100px);
       }
  100% {
        transform: translateX(0px);
       }
  }

  .v-enter {
    opacity: 0;
  }

  .v-enter-active {
    transition: opacity 1s;
    animation: slide 0.4s;
  }

  .v-enter-to {
    opacity: 1;
  }
</style>
