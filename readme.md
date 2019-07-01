
# Cadastro de condomínio para IntranetOne
Cadastro de condomínios e suas vigências.
## Conteúdo
 
## Instalação

```sh
composer require agileti/iofaq:dev-master
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
npm run dev|prod|watch
php artisan config:cache
```
