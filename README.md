# EventSphere - Plateforme de Gestion d'Événements

## 📋 Table des matières

- [À propos](#à-propos)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Structure du projet](#structure-du-projet)
- [API Endpoints](#api-endpoints)
- [Workflow n8n](#workflow-n8n)
- [Déploiement](#déploiement)
- [Contributeurs](#contributeurs)
- [License](#license)

---

## 🎯 À propos

**EventSphere** est une plateforme moderne de gestion et de réservation d'événements développée avec React et Redux. Elle permet aux utilisateurs de découvrir des événements, de réserver des tickets en ligne, et aux administrateurs de gérer facilement leur catalogue d'événements et leurs commandes.

### 🌟 Points forts

- ✅ Interface utilisateur moderne et responsive
- ✅ Gestion du panier avec Redux Toolkit
- ✅ Authentification admin sécurisée
- ✅ Upload d'images vers Cloudinary
- ✅ Emails de confirmation automatiques avec n8n
- ✅ Persistence des données avec localStorage
- ✅ Filtres et recherche en temps réel

---

## ⚡ Fonctionnalités

### 👥 Côté Utilisateur

- **Découverte d'événements**
  - Liste des événements avec images
  - Filtrage par catégorie (Concert, Sport, Théâtre, etc.)
  - Recherche par mot-clé
  - Page de détails complète pour chaque événement

- **Système de panier**
  - Ajout/suppression d'événements
  - Gestion des quantités (max 10 par événement)
  - Calcul automatique du total TTC (avec TVA 20%)
  - Sidebar interactive avec animations
  - Persistence entre les sessions

- **Processus de commande**
  - Formulaire de checkout avec validation
  - Récapitulatif détaillé de la commande
  - Page de confirmation
  - Email de confirmation automatique

### 🔐 Côté Administrateur

- **Authentification sécurisée**
  - Login avec credentials (variables d'environnement)
  - Protection des routes admin
  - Session persistante

- **Gestion des événements**
  - Ajout d'événements avec upload d'images (Cloudinary)
  - Modification en temps réel
  - Suppression avec confirmation
  - Prévisualisation instantanée

- **Gestion des commandes**
  - Liste complète des commandes
  - Filtres par statut (En attente, Confirmée, Annulée)
  - Statistiques en temps réel (CA, nombre de commandes)
  - Modification du statut
  - Suppression de commandes

---

## 🛠️ Technologies utilisées

### Frontend

- **React 19.2.3** - Bibliothèque UI
- **Redux Toolkit 2.11.2** - Gestion d'état globale
- **React Router DOM 7.11.0** - Navigation
- **Axios 1.13.2** - Requêtes HTTP
- **React Hot Toast** - Notifications

### Backend / Services

- **JSON Server 1.0.0-beta** - API REST simulée
- **Cloudinary** - Hébergement d'images
- **n8n** - Automatisation des emails

### Outils

- **dotenv** - Variables d'environnement
- **localStorage** - Persistence locale
- **Git** - Contrôle de version

---

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 16 ou supérieure)
- **npm** ou **yarn**
- Un compte **Cloudinary** (gratuit)
- Un compte **n8n Cloud** (gratuit) ou n8n local

---

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone https://github.com/Sam21ir/eventsphere.git
cd eventsphere
``
### 2. Installer les dépendances
```bash
npm install
```

### 3. Créer le fichier `.env`

Créez un fichier `.env` à la racine du projet :
```env
# API JSON Server
REACT_APP_API_URL=http://localhost:5000

# Cloudinary (pour l'upload d'images)
REACT_APP_CLOUDINARY_CLOUD_NAME=............
REACT_APP_CLOUDINARY_UPLOAD_PRESET=............

# n8n Webhook (pour les emails)
REACT_APP_N8N_WEBHOOK_URL=https://.............n8n.cloud/webhook/eventsphere-order

# Credentials Admin
REACT_APP_ADMIN_USERNAME=admin
REACT_APP_ADMIN_PASSWORD=admin123

1. Créez un compte sur [cloudinary.com](https://cloudinary.com)
2. Récupérez votre **Cloud Name** dans le dashboard
3. Créez un **Upload Preset** (Settings → Upload → Add upload preset)
   - Mode : **Unsigned**
   - Folder : `eventsphere`
4. Ajoutez les infos dans `.env`

### 5. Configurer n8n

#### Option A : n8n Cloud

1. Créez un compte sur [n8n.io](https://n8n.io)
2. Créez un nouveau workflow :
   - Nœud 1 : **Webhook** (POST, path: `eventsphere-order`)
   - Nœud 2 : **Gmail** (connectez votre Gmail)
3. Configurez l'email :
   - **To** : `={{$json.body.customerEmail}}`
   - **Subject** : `✅ Commande #={{$json.body.orderId}}`
   - **Message** : Votre template d'email
4. Activez le workflow et copiez l'URL du webhook dans `.env`

#### Option B : n8n Local
```bash
npx n8n
# Ouvrez http://localhost:5678
# Suivez les mêmes étapes que ci-dessus
```

---

## ▶️ Utilisation

### Lancer le projet en développement
```bash
# Terminal 1 : JSON Server (API)
npm run server

# Terminal 2 : React App
npm start
```

Ou utilisez la commande combinée :
```bash
npm run dev
```

L'application sera accessible sur :
- **Frontend** : http://localhost:3000
- **API** : http://localhost:5000

### Accès Admin

1. Allez sur http://localhost:3000/admin/login
2. Connectez-vous avec :
   - **Username** : `admin`
   - **Password** : `admin123`

---

## 📁 Structure du projet
```
eventsphere/
│
├── public/                     # Fichiers statiques
├── src/
│   ├── admin/                  # Pages administration
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminEvents.jsx
│   │   ├── AdminOrders.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AddEvent.jsx
│   │
│   ├── components/             # Composants réutilisables
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── EventCard.jsx
│   │   ├── CartItem.jsx
│   │   ├── CartSidebar.jsx
│   │   ├── ImageUpload.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── pages/                  # Pages utilisateur
│   │   ├── Home.jsx
│   │   ├── EventDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── OrderConfirmation.jsx
│   │
│   ├── store/                  # Redux
│   │   ├── store.js
│   │   ├── cartSlice.js
│   │   └── eventsSlice.js
│   │
│   ├── services/               # Services API
│   │   ├── api.js
│   │   ├── eventService.js
│   │   ├── orderService.js
│   │   └── n8nService.js
│   │
│   ├── context/                # Context API
│   │   └── AuthContext.jsx
│   │
│   ├── styles/                 # Fichiers CSS
│   │   ├── Navbar.css
│   │   ├── EventCard.css
│   │   ├── CartSidebar.css
│   │   └── ...
│   │
│   ├── utils/                  # Utilitaires
│   │   └── toast.js
│   │
│   ├── App.jsx                 # Composant principal
│   └── index.js                # Point d'entrée
│
├── db.json                     # Base de données JSON Server
├── .env                        # Variables d'environnement
├── .gitignore
├── package.json
└── README.md
```

---

## 🔌 API Endpoints

### Événements
```http
GET    /events           # Liste tous les événements
GET    /events/:id       # Détails d'un événement
POST   /events           # Créer un événement (admin)
PUT    /events/:id       # Modifier un événement (admin)
DELETE /events/:id       # Supprimer un événement (admin)
```

### Commandes
```http
GET    /orders           # Liste toutes les commandes (admin)
GET    /orders/:id       # Détails d'une commande
POST   /orders           # Créer une commande
PATCH  /orders/:id       # Modifier le statut (admin)
DELETE /orders/:id       # Supprimer une commande (admin)
```

---

## 📧 Workflow n8n

### Architecture du workflow
```
React (EventSphere)
    ↓
Webhook n8n (POST)
    ↓
Gmail / SMTP
    ↓
Email Client
```

### Données envoyées au webhook
```json
{
  "orderId": 123,
  "customerName": "Samir El Alami",
  "customerEmail": "elalamisamirr@gmail.com",
  "customerPhone": "0630002010",
  "total": 150.00,
  "items": [
    {
      "id": 1,
      "title": "Concert de Jazz",
      "price": 50,
      "quantity": 3
    }
  ],
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

---

## 🚀 Déploiement

### Configuration GitHub Pages avec sous-domaine personnalisé

L'application est déployée sur **GitHub Pages** avec un sous-domaine personnalisé.

**URL de production :** [https://eventsphere.samirelalami.space](https://eventsphere.samirelalami.space)

---

### Étapes de déploiement

#### 1. Configuration du projet pour GitHub Pages

**Installation de gh-pages :**
```bash
npm install --save-dev gh-pages
```

**Ajout des scripts dans `package.json` :**
```json
{
  "homepage": "https://eventsphere.samirelalami.space",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

---

#### 2. Utilisation de HashRouter (pour éviter les erreurs 404)

**Pourquoi HashRouter ?**

GitHub Pages ne supporte pas le routing côté client de React Router. Sans HashRouter, un rafraîchissement de page (F5) sur `/checkout` renvoie une **erreur 404**.

**Solution implémentée :**

Dans `src/App.jsx`, nous utilisons `HashRouter` au lieu de `BrowserRouter` :
```javascript
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// Au lieu de : import { BrowserRouter as Router, Routes, Route }

function App() {
  return (
    <Router>
      <Routes>
        {/* ... vos routes */}
      </Routes>
    </Router>
  );
}
```

**Résultat :**
- URLs avec `#` : `https://eventsphere.samirelalami.space/#/checkout`
- ✅ Pas d'erreur 404 lors du refresh
- ✅ Navigation fluide entre les pages
- ✅ Fonctionne parfaitement sur GitHub Pages

---

#### 3. Configuration du sous-domaine personnalisé

**Étape A : Configuration DNS**

Type : CNAME
Nom : eventsphere
Cible : sam21ir.github.io
TTL : Auto
```

**Étape B : Configuration GitHub**

1. Allez sur votre repo GitHub → **Settings** → **Pages**
2. Dans **Custom domain**, entrez : `eventsphere.samirelalami.space`
3. Cochez **Enforce HTTPS**
4. GitHub vérifie le DNS (peut prendre quelques minutes)

**Étape C : Fichier CNAME**

Créez un fichier `public/CNAME` (sans extension) avec :
```
eventsphere.samirelalami.space
```

Ce fichier sera copié dans le build et empêche GitHub de supprimer le domaine personnalisé à chaque déploiement.

---

#### 4. Déploiement

**Commande de déploiement :**
```bash
npm run deploy
```

Cette commande :
1. Build le projet (`npm run build`)
2. Pousse le dossier `/build` vers la branche `gh-pages`
3. GitHub Pages détecte le changement et met à jour le site

**Délai de mise en ligne :** 1-3 minutes

---

### Structure après déploiement
```
Branches GitHub :
├── main          # Code source React
└── gh-pages      # Build déployé (généré automatiquement)

Fichiers importants :
├── public/CNAME  # Configuration domaine personnalisé
├── package.json  # Scripts de déploiement
└── src/App.jsx   # HashRouter configuré
```

---

### ⚠️ Limitations GitHub Pages

- **Pas de backend** : JSON Server ne fonctionne pas sur GitHub Pages
  - **Solution** : Utilisez une API hébergée séparément (Render, Railway, Heroku)

- **Variables d'environnement** : Les `.env` ne sont pas sécurisés en production
  - **Solution** : Utilisez les secrets GitHub Actions ou un backend pour les clés sensibles

---

### 🔄 Workflow de mise à jour
```bash
# 1. Développer en local
npm start

# 2. Tester les changements
npm run build

# 3. Déployer
npm run deploy

# 4. Vérifier sur https://eventsphere.samirelalami.space
```

---

### 📊 Monitoring et Analytics (optionnel)

Pour suivre le trafic sur votre site :

**Google Analytics :**
```bash
npm install react-ga4
```