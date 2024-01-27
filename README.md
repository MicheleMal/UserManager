# User Manager

User Manager è un'applicazione per la gestione degli utenti, creata utilizzando Node.js e MySQL per la parte backend, React+VITE per la parte frontend. L'applicazione fornisce un insieme di API per la registrazione degli utenti, il login, la gestione dell'account e funzionalità specifiche per chi ha il ruolo "owner" o "admin". Utilizza il token JWT per l'autenticazione e la crittografia delle password durante la registrazione.

***

## Features:

* Registrare un nuovo utente
* Effettuare il login per ottenere il token JWT
* Accedere alle informazioni dell'utente autenticato
* Modificare le informazioni dell'account dell'utente autenticato
* Eliminare l'account dell'utente autenticato
* Cambiare ruolo di un utente specifico, solo se il ruolo dell'utente autenticato è "owner" o "admin"

## Technologies Used:
* Node.js
* MySQL
* JWT (JSON Web Token)
* Bcrypt (per la crittografia delle password)
* crypto (per la crittografia dell'email)

## Installation

Clonare il repository in una directory locale: git clone <repository_url>

### Frontend
1. Navigare nella directory frontend: cd frontend

2. Installare le dipendenze del frontend utilizzando npm: npm install

3. Avviare il frontend: `npm start`
   * L'applicazione Vite+React sarà accessibile all'indirizzo: `http://localhost:5173`

### Backend
1. Installare le dipendenze utilizzando npm: `npm install`

2. Configurare il database MySQL:
   * Configurare il database MySQL: `backend/db/schema.sql`
   * Modificare le informazioni di connessione al database nel file `.env`

3. Eseguire il server backend: `npm start`
   * Le API saranno accessibili all'indirizzo `http://localhost:5000`

***

## Contributi

I contributi sono benvenuti per migliorare ed espandere le funzionalità di User Manager. Se desideri contribuire, apri una pull request con le tue modifiche.

## Contributi

I contributi sono benvenuti per migliorare ed espandere le funzionalità di User Manager. Se desideri contribuire, apri una pull request con le tue modifiche.