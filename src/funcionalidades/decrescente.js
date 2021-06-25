function decrescente(repositorios) {
    const decrescente = []
    const idDecrescentes = []
    let cont = 0

    repositorios.map(repo => {
        // Se não for o primeiro, executa
        if (cont != 0) {
            const ultimoElemento = decrescente.length-1  
            const primeiroElemento = decrescente[0]

            // A quantidade de estrelas atual é maior ou igual a quantidade de estrelas do maior da lista?
            if ( (repo.stargazers_count >= primeiroElemento.stargazers_count)) {
                decrescente.unshift(repo)

                // Adiciona o id filtrado na lista para conferir depois
                idDecrescentes.push(repo.id)
            
            // Se não for... a quantidade de estrelas do atual é menor ou igual o menor da lista?
            } else if (repo.stargazers_count <= ultimoElemento.stargazers_count) {
                decrescente.push(repo)

                // Adiciona o id filtrado na lista para conferir depois
                idDecrescentes.push(repo.id)

            // Caso não seja nem o maior nem o menor, procura na lista a quantidade de estrelas atual é maior ou menor entre valores do meio
            } else {
                // Percorre a lista decrescente
                decrescente.forEach((dec, i) => {
                    let verificaListaId = idDecrescentes.indexOf(repo.id) === -1

                    // Se a quantidade de estrelas do atual for maior ou igual o atual lista, adiciona na frente e o id não está na lista
                    if ((repo.stargazers_count >= dec.stargazers_count) && (verificaListaId)) {
                        decrescente.splice(i+1, 0, repo)
                        idDecrescentes.push(repo.id)
                    
                    // Se a quantidade de estrelas do atual for menor ou igual o atual lista, adiciona atrás e o id não está na lista
                    } else if ((repo.stargazers_count <= dec.stargazers_count) && (verificaListaId)) {
                        decrescente.splice(i-1, 0, repo)
                        idDecrescentes.push(repo.id)

                    }

                })

            }
        // Se não for, adiciona como primeiro elemento da lista
        } else {
            
            decrescente.push(repo)
        }
        // Incrementa contagem
        cont++
    })
    // Reseta contagem
    cont = 0

    return decrescente
}

module.exports = {
    decrescente
}