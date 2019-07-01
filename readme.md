
# Cadastro de faq para IntranetOne
Cadastro de perguntas e respostas (FAQ).
## Conteúdo
 
## Instalação

```sh
composer require agileti/iofaq
```
```sh
php artisan io-faq:install
```

- Configure o webpack conforme abaixo 
```js
...
let faq = require('intranetone-faq');
io.compile({
  services:{
    ...
    new faq()
    ...
  }
});

```
- Compile os assets e faça o cache
```sh
php artisan config:cache
npm run dev|prod|watch
```
