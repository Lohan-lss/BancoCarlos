//VOCÊ DEVE SUBSTITUIR A URL ABAIXO PELA URL DO IMPORT SEU PROJETO NO FIREBASE (CONFIGURAÇÕES CDN DO SEU PROJETO)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

//VOCÊ DEVE SUBSTITUIR OS CÓDIGOS ABAIXOS CÓDIGOS DO SEU PROJETO NO FIREBASE (FIREBASE CONFIGURATION)
const firebaseConfig = {
    apiKey: "AIzaSyDJg4O5v24qC1lyboW8BwTbgXzpuZYS8MA",
    authDomain: "fuuut-869d2.firebaseapp.com",
    databaseURL: "https://fuuut-869d2-default-rtdb.firebaseio.com",
    projectId: "fuuut-869d2",
    storageBucket: "fuuut-869d2.firebasestorage.app",
    messagingSenderId: "560545839947",
    appId: "1:560545839947:web:6eaf4c190c053dfa6f06ce"
  };

 // Initialize Firebase
const app = initializeApp(firebaseConfig);

 //VOCÊ DEVE SUBSTITUIR AO FINAL DA URL AS PALAVRAS FIREBASE-APP POR FIREBASE-DATABASE
import { getDatabase, ref, child, get, set, update, remove } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";


const db = getDatabase();

//  CAMPOS DE ENTRADAS DOS VALORES DO CADASTRO DE PRODUTOS
let nome = document.getElementById('nome');
let idade =document.getElementById('idade');
let numero =document.getElementById('numero');
let cpf =document.getElementById('cpf');
let cep =document.getElementById('cep');

//CAMPO DE PESQUISA E ATUALIZAÇÃO DOS PRODUTOS
let idCliente = document.getElementById('idCliente');

//RESULTADOS DAS PESQUISAS
let dadoNome = document.getElementById('dadoNome');
let dadoIdade = document.getElementById('dadoIdade');
let dadoNumero = document.getElementById('dadoNumero');
let dadoCPF = document.getElementById('dadoCPF');
let dadoCEP = document.getElementById('dadoCEP');

//BOTÕES DOS CAMPOS DE PESQUISA
let cadastrarCliente = document.getElementById('cadastrarCliente');
let buscarCliente = document.getElementById('buscarCliente');
let atualizarCliente = document.getElementById('atualizarCliente');
let deletarCliente = document.getElementById('deletarCliente');

//ADICIONAR PRODUTO
 function AddCliente(){
    set(ref(db,'Cliente/'+nome.value),{
        nome: nome.value,
        idade: idade.value,
        numero: numero.value,
        cpf: cpf.value,
        cep: cep.value
    }).then(()=>{
        nome.value = ''
        idade.value=''
        numero.value=''
        cpf.value=''
        cep.value=''
        alert("Cliente Cadastrado!");
    }).catch((error)=>{
        console.log(error);
        alert('Cliente Não Cadastrado!');
    })

 }

 //FUNCÃO PARA PESQUISA DE PRODUTOS COM BASE NO CÓDIGO DO PRODUTO => idProduto
 function PesquisarCliente(){
    const dbRef = ref(db);
    get(child(dbRef,'Cliente/'+idCliente.value)).then((snapshot)=>{
        if(snapshot.exists()){
            dadoNome.value = snapshot.val().nome;
            dadoIdade.value = snapshot.val().idade;
            dadoNumero.value = snapshot.val().numero;
            dadoCPF.value = snapshot.val().cpf;
            dadoCEP.value = snapshot.val().cep;
            
            alert('Cliente Encontrado!')
        }else{
            alert("O Cliente não existe");
        }
    }).then(()=>{
        alert('Leitura Realizada!')
    }).catch((e)=>{
        alert('Algo deu errado!')
        console.log(e)
    })
 }

 //FUNÇÃO PARA ATUALIZAÇÃO DAS INFORMAÇÕES ACERCA DO PRODUTO
function AtualizarCliente(){
    update(ref(db,'Cliente/'+idCliente.value),{
        nome:dadoNome.value,
        idade:dadoIdade.value,
        numero:dadoNumero.value,
        cpf:dadoCPF.value,
        cep:dadoCEP.value
    }).then(()=>{
        alert('Cliente Atualizado!');
    }).catch((e)=>{
        alert('Algo deu errado!')
        console.log(e)
    })
}

//FUNÇÃO PARA DELETAR PRODUTO
function DeletarCliente(){
    remove(ref(db,'Cliente/'+idCliente.value)).
    then(()=>{
        idCliente.value=''
        dadoNome.value=''
        dadoIdade.value=''
        dadoNumero.value=''
        dadoCPF.value=''
        dadoCEP.value=''
        alert('Cliente Deletado!')
    })
}

//MÉTODOS PARA UTILIZAÇÃO DAS FUNÇÕES COM BASE NAS AÇÕES DOS BOTÕES
cadastrarCliente.addEventListener('click',AddCliente);
buscarCliente.addEventListener('click',PesquisarCliente);
atualizarCliente.addEventListener('click',AtualizarCliente);
deletarCliente.addEventListener('click',DeletarCliente);
