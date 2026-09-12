document.addEventListener('DOMContentLoaded', carregarTarefas);

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', adicionarTarefa);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        adicionarTarefa();
    }
});

function adicionarTarefa() {
    const textoTarefa = taskInput.value.trim();
    if (textoTarefa === '') return;

    criarElementoTarefa(textoTarefa, false);
    salvarTarefasNoLocalStorage();
    taskInput.value = '';
}

function criarElementoTarefa(texto, concluida) {
    const li = document.createElement('li');
    if (concluida) {
        li.classList.add('completed');
    }

    const span = document.createElement('span');
    span.textContent = texto;
    span.addEventListener('click', () => {
        li.classList.toggle('completed');
        salvarTarefasNoLocalStorage();
    });

    const btnDeletar = document.createElement('button');
    btnDeletar.textContent = 'Excluir';
    btnDeletar.addEventListener('click', () => {
        li.remove();
        salvarTarefasNoLocalStorage();
    });

    li.appendChild(span);
    li.appendChild(btnDeletar);
    taskList.appendChild(li);
}

function salvarTarefasNoLocalStorage() {
    const tarefas = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        tarefas.push({
            texto: li.querySelector('span').textContent,
            concluida: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefasSalvas.forEach(tarefa => {
        criarElementoTarefa(tarefa.texto, tarefa.concluida);
    });
}
