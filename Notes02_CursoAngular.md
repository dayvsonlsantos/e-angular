## Criando Componente

- Utilizamos o CLI, comando: ng generate <nome>
- O ideal, é passar o endereço de onde adicionar o componente + nome

        ng generate component components/first-component

## Interpolação de dados

- É um recurso que vai nos ensinar a trabalhar com os componentes do Angular
- Vamos criar nossas variáveis no arquivo .ts, dentro da classe
- Essas variáveis, são propriedades da classe.
- Então, teremos acesso a estes dados no arquivo .html, o template
- Sendo a impressão feita através de {{dado}}

## CSS no Angular

- Podem ser de duas maneiras: Global ou Scoped (nível componente)

## Compartilhando dados

- Em angular podemos compartilhar dados do componente pai com o componente filho (conhecido como props do react)
- Para isso, vamos disponibilizar na chamada do componente o nome do dado que será recebido com a seguinte sintaxe: [dado]
- E no código .ts do componente filho, vamos utilizar o decorator @input, que tem como papel entregar o dado para o template

## Diretivas

- São recursos que podem realizar diversas funções no sistema, como aplicar estilos a um elemento;
- Começam sempre com ng, e o nome fica como: ngAlgumaCoisa

## Renderização Condicional

- É possível exibir determinado conteúdo por meio de uma condicional
- Utilizamos a diretiva ngif para isso;
- Os valores podem ser dinâmicos (propriedades), mas podemos realizar outros tipos de comparação;
- Há a possibilidade também de imprimir um cenário para validação de falso, como o else;

## Eventos

- Podemos ativar eventos nos componentes para disparar algum método
- Um evento clássico que utilizamos muito é o click;
- A sintaxe é: (click)="algumaFuncao()"
- Os métodos ficam na classe;
- Futuramente utilizaremos este recurso para acessar uma API;

### Emitindo Eventos

- Podemos comunicar eventos de um componente filho para o pai;
- Para isso vamos precisar o @Output, que vai fazer a saída do evento do componente filho;
- Na tag de invocação do componente no template, escolhemos um método para executar quando o evento for emitido;
- Exemplo: (emit)="onEmit()"

## Renderização de listas

- Outro recurso importante é o loop em listas;
- Para isso vamos precisar de uma propriedade com os itens da lista;
- E no template do componente vamos utilizar o *ngFor;
- A sintaxe é: *ngFor="let item of items"
- Desta maneira podemos renderizar template baseado em dados;

## Importância das Interfaces

- Toda entidade que vamos trabalhar precisa de uma interface;
- Isso vai tornar nosso código mais simples ao longo do programa;
- Padronizando ele e facilitando a manutenção
- Vamos implementar uma interface a nossa lista de animais;
- E fazer um evento que também utilizará este recurso.

## Pipe Operators

- OS pipe operators são recursos para trabalhar com strings nos templates;
- Podemos realizar diversas funções, como deixar o texto em caixa alta;
- A sintaxe é: {{ dado | algumPipeOperator }}
- Desta maneira nos poupamos de regras de CSS ou manipulação de strings com JS.

## Two Way Data Binding

- O Two way data binding é um recurso muito interessante para trabalho com formulários;
- Basicamente conseguimos alterar props e o template com o preenchimento de inputs;
- É necessário importar o FormsModule no componente principal;
- E também declarar o ngModel no input, além de preencher também o atribute name, todos com o mesmo valor.

## Services

- O Service é outra parte fundamental da arquitetura do Angular;
- Geralmente ficam as requisições para as APIs que utilizamos no projeto;
- Precisamos criar o service com: ng generate service <nome>
- Importar no componente e iniciar no constructor;
- Depois é possível acessar os métodos dele;

## Router

- Nós vamos criar um novo arquivo para declarar nossas rotas;
- Nele vamos importar os módulos RouterModule e Routes;
- Após a definição estas rotas precisam ser importadas em app.module.ts;
- E por fim no template principal criamos as rotas;
- E substituímos os componentes por: <router-outlet>

## Requisições HTTP

- Vamos realizar requisições HTTP nos nossos services;
- Precisamos importar dois pacotes: HttpClient e HttpHeaders;
- Neste exemplo utilizaremos uma API local para simular as request, com json-server;
- Por último, é ncessário inicializar o módulo HttpClientModule em app.module.ts;
- Instalar: npm i json-server

## Carregando dado individual

- Para resgatar um dado do banco vamos precisar criar uma rota dinâmica no nosso router;
- Baseado no id do item teremos a seleção de dado no banco, geralmente o id vem pela URL;
- Para resgatar parâmetros da URL vamos utilizar o ActivatedRoute, um módulo de Angular;
- A lógica para requisição HTTP ficará no service;

## Deletando registro

- Agora vamos refatorar nossa ação de remover registro com a execução HTTP;
- Criaremos outro método no service;
- E ajustaremos a maneira que o método da classe do componente é executado;
- Com simples mudanças estaremos interagindo com a API!