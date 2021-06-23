<template>
  <div id="app">
    <h1>Github Search</h1>
    <Pesquisa class="pesquisa" @mandarNome="user = $event"/>
    <component :is="respostaDaPesquisa" v-bind="propsAtuais"/>
  </div>
</template>

<script>
import Pesquisa from './components/pesquisa.vue'
import Perfil from './components/perfil.vue'
import semPerfil from './components/semPerfil.vue'
import repositorios from './components/repositorios.vue'

export default {
  name: 'App',
  components: {
    Pesquisa,
    Perfil,
    semPerfil,
    repositorios
  },
  data() {
    return {
      url: 'https://api.github.com/users',
      user: undefined,
      dataGit: '',
      respostaDaPesquisa: '',
    }
  },
  computed: {
    // Verifica qual componente está sendo utilizado para passar a propriedade ou não
    propsAtuais() {
      return this.respostaDaPesquisa === 'Perfil'
        ? { dataGit: this.dataGit }
        : {}
    }
  },
  methods: {
    // Método para realizar a requisição dos repositórios e ser chamado após a req do usuário
    pegarRepositorio() {
      fetch(`${this.url}/${this.user}/repos`)
      .then(res => res.json())
      .then(data => console.log(data))
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
  .pesquisa {
    margin-left: 38%;
  }
</style>
