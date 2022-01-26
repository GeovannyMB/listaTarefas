const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

//criar lista
function criaLi(){
    const li = document.createElement('li');
    return li;
}

//selecionar o ENTER          //keyup and keypress       
inputTarefa.addEventListener('keypress', function(e){
    if(e.keyCode === 13) {
        if(!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

//retornar o foco para o input de texto
function limpaInput(){
    inputTarefa.value = '';
    inputTarefa.focus();
}

//cria o botão apagar ao lado da tarefa criada
function criaBotãoApagar(li){
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
}

//adicionando o li dentro do ul
function criaTarefa(textInput){
    const li = criaLi();
    li.innerText = textInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotãoApagar(li);
    salvarTarefas();
}

//evento click no botão enviar para adicionar tarefa
btnTarefa.addEventListener('click', function(){
    if(!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

//procura o pai do botão apagar e adiciona a função remove() para remover o li
document.addEventListener('click', function(e){
    const el = e.target;
    if(el.classList.contains('apagar')){
        el.parentElement.remove();
        salvarTarefas();
    }
})


//adciona as tarefas em um array vazio, transforma o array em JSON
//e adiciona o JSON no localStorage(mini base de dados do navegador)
function salvarTarefas(){
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas){
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

//pega as tarefas do localStorage, transforma o JSON em tarefas
//de novo e salva as tarefas no navegador
function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();
