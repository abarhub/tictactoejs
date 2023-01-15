# Monté de version

La documentation pour la monté de version d'angular est [ici](https://update.angular.io/)

* Mise à jour d'angular
```shell
ng update @angular/core@XXX @angular/cli@XXX
```
Ca devrait fonctionner. Si ça ne marche pas, il faut faire :
```shell
npm install
ng update --force @angular/core @angular/cli
```

* Mise à jour de ng-bootstrap
* La documentation pour la mise à jour est [ici](https://ng-bootstrap.github.io/#/getting-started)
```shell
ng update @ng-bootstrap/ng-bootstrap@XXX
```
Ensuite il faut monter la version de bootstrap et popper en faisant attention à mettre les [versions compatibles avec ngbootstrap](https://ng-bootstrap.github.io/#/getting-started) :
```shell
npm i bootstrap@XXX @popperjs/core@XXX
```
