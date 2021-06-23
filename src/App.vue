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

export default {
  name: 'App',
  components: {
    Pesquisa,
    Perfil,
    semPerfil
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
