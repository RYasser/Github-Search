<template>
  <div id="app" class="layoutComPerfil layoutSemPerfil">

    <div class="titulo">
      <img src="./assets/logo.png" class="imgLogo">
    </div>

    <Pesquisa 
      class="pesquisar" 
      @mandarNome="user = $event"
    />

    <router-view 
      class="usuario" 
      :dataGit="dataGit" 
      :dataRepo="dataRepo" 
      :animar="animar" 
      v-if="perfil"
      to="/perfil"
    />
    
    <router-view
      class="semPerfil" 
      :primeiraRenderizacao="primeiraRenderizacao" 
      v-if="!perfil"
      to="/"
    />

  </div>
</template>

<script>
import Pesquisa from './components/Pesquisa.vue'
import Usuario from './views/Usuario.vue'
import semPerfil from './views/semPerfil.vue'
import { decrescente } from './funcionalidades/decrescente.js'

export default {
  name: 'App',
  components: {
    Pesquisa,
    Usuario,
    semPerfil

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
        this.$router.push('/')
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
        this.$router.push('/perfil')
        // Verifica se o perfil foi encontrado para utilizar o componente de acordo com a resposta
        if (data.message === 'Not Found') {
          this.perfil = false
          this.$router.push('/')
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
        this.$router.push('/')
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
    "usuario usuario";
  }

  /* Responsável por ajustar o layout
  quando não possuir um perfil ativo */
  .layoutSemPerfil {
    margin-left: 12%;
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

  .titulo {
    grid-area: titulo;
  }

  .semPerfil {
    grid-area: semPerfil;
  }

  .usuario {
    grid-area: usuario;
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
    grid-template-rows: 20% 1fr 1fr;
    grid-template-columns: 20%;
    grid-template-areas: 
    "titulo" 
    "pesquisa"
    "usuario";
    }

    .semPerfil {
    grid-template-rows: 20% 1fr 1fr;
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