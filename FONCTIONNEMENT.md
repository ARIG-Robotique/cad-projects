# Fonctionnement pour le travail collaboratif

## Sommaire

<!-- toc -->

- [GIT LFS](#git-lfs)
- [Lock d'une arborescence](#lock-dune-arborescence)

<!-- tocstop -->

## GIT LFS

Afin de versionner les fichiers binaires lié à notre logiciel de mécanique (SolidWorks),
nous utilisons GIT LFS.

Ce type de fichier ne peut pas être fusionner lors de la validation de PR, nous
utilisons donc un mécanisme de verrouillage.

## Usage du CLI

Afin de poser des verrous de modifications l'usage du CLI intégré est nécessaire.

```bash
$> yarn install
$> yarn start
```
