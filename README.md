# Projeto TEARTI usando Node.js e React.js

Este tutorial vai te guiar através do processo de clonagem de um repositório, configuração do backend com Node.js e do frontend com Vite.

## Passo 1: Pegue as dependências

- [**Node.js**](https://nodejs.org/en)
- [**Git**](https://www.git-scm.com/downloads)

## Passo 2: Clonar o Repositório

Primeiro, você precisa clonar o repositório do GitHub para a sua máquina local, Abra o terminal e execute o comando:

```sh
git clone https://github.com/Barcate/tearti-ecommerce.git
```

## Passo 3: Instalar as dependências do Node.js
Navegue até o diretório clonado:

````sh
cd tearti-ecommerce
````

Execute:

````sh
cd Front-end && npm install && cd ../Back-end && npm install && cd ..
````

(Nota: Para usuarios de windows evite colocar os arquivos dentro do onedrive)

## Passo 4: Executar o Backend 

Abra sua IDE de preferença e abra o terminal dentro dela:

Inicie o servidor:
````sh
cd Back-end
npm start
````
Para configurar o BD, acesse o arquivo [DEVELOPMENT.md](./Back-end/DEVELOPMENT.md)
## Passo 5: Executar o Front-end

Dentro da IDE, você precisa abrir um novo terminal e executar:

Inicie o Vite.js:
````sh
cd Front-end
npm run dev
````

No bash sera possivel ver a porta em que o website está roddando

Para mais informações, acesse o arquivo [DEVELOPMENT.md](./Front-end/DEVELOPMENT.md)

