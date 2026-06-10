# KCI Website

## Développement avec Docker

Ce projet Vite/React peut être lancé dans un conteneur Docker configuré pour redémarrer automatiquement tant que vous ne l'arrêtez pas explicitement.

### Prérequis

- Docker
- Docker Compose

### Lancer le serveur de développement

```bash
docker compose up -d --build
```

L'application est ensuite disponible sur <http://localhost:5173>.

La politique de redémarrage `restart: unless-stopped` garde le conteneur actif et le relance après un redémarrage de Docker ou de la machine, sauf si vous l'arrêtez manuellement.

### Consulter les logs

```bash
docker compose logs -f kci-website
```

### Arrêter le conteneur

```bash
docker compose stop
```

### Supprimer le conteneur et le réseau Compose

```bash
docker compose down
```
