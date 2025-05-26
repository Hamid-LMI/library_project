# library_project



📚 Mini-Projet d'Évaluation – Gestion de Livres et Auteurs

Ce mini-projet a pour objectif d’évaluer les capacités d’apprentissage et d’adaptation du postulant à travers une application web de gestion d’un référentiel de livres et d’auteurs, développée avec Django React.
🔍 Objectifs

    Implémenter un CRUD complet pour deux entités principales : Livre et Auteur.

    Proposer une interface de saisie via l’administration Django.

    Développer une interface de visualisation publique (hors admin) stylisée avec Bootstrap.

    Bonus : ajouter une interface client avec React si les compétences le permettent.

🧱 Modèles de données
📖 Livre

    titre (char)

    nombre_de_pages (entier)

    genre (choix ou modèle lié – création possible depuis l’interface)

    date_de_parution (date)

    photo_couverture (image)

👤 Auteur

    nom (char)

    prénom (char)

    date_de_naissance (date)

💻 Interfaces
1. Interface d’administration (back-office)

    Utilise l’interface d’administration Django

    Permet :

        Création / Modification / Suppression des Livres et Auteurs

        Création de nouveaux genres depuis le formulaire de Livre

        Recherche & filtres via l’admin

2. Interface de visualisation (front-office) avec React

    Indépendante de l’admin Django, cette interface consomme l’API Django (via Django REST Framework)

    Permet :

        Liste des livres

        Liste des auteurs

        Visualisation de la fiche auteur avec les livres associés triés par date de parution

    Stylisée avec Bootstrap

🛠️ Technologies utilisées

    Backend :

        Django RESTFul API

        Django Admin

        (Optionnel : Django REST Framework)

    Frontend :

        React
        
        Bootstrap
        
🚀 Installation & Lancement
Prérequis

    Python 3.10+

    Node.js -> React

    pip / venv

Backend Django

# Cloner le dépôt
git clone https://github.com/Hamid-LMI/library_project
cd library_project

# Créer et activer un environnement virtuel
python -m venv env
source env/bin/activate

# Installer les dépendances
pip install -r requirements.txt

# Appliquer les migrations
python manage.py migrate

# Lancer le serveur Django
python manage.py runserver

# Lancer le serveur React

cd frontend
npm install
npm start

---

## 📝 TODO

- [ ] Ajouter la **création** de genre côté client
- [ ] Ajouter la **suppression** de genre côté client
- [ ] Ajouter la **création** d'auteur côté client
- [ ] Ajouter la **suppression** d'auteur côté client
- [ ] Ajouter la **suppression** de livre côté client
