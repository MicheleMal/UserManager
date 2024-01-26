# User Manager - Api documentation

## Introduzione
Le API gestiscono l'autenticazione e l'autorizzazione degli utenti, inclusa la gestione del loro profilo. Gli endopoint consentono la registrazione e l'accesso al profilo personale, la visualizzazione del profilo, la modifica delle informazioni personali e rimuovere il profilo.

## Gestione Utenti (`/manager/users`)

### Visualizza Tutti gli Utenti
- **Endpoint:** `/all`
- **Method:** GET
- **Descrizione:** Restituisce tutti gli utenti solo se il ruolo è "owner" o "admin".
- **Autenticazione:** Richiesta (`authenticateToken`)
- **Autorizzazioni:** `checkUserRole` con ruoli "owner" o "admin"
- **Esempio di Utilizzo:**
    ```http
    GET /manager/users/all
    Authorization: Bearer <token>
    ```
- **Esempio di Risposta:**
    ```json
    {
        message: "All users",
        data: [
            {
                id: 1,
                name: "Utente1",
                surname: "Utente1-2",
                email: "utente1@email.com",
                password: "",
                tel_number: "123",
                role: "admin"
            }
            {
                id: 2,
                name: "Utente2",
                surname: "Utente2-2",
                email: "utente2@email.com",
                password: "",
                tel_number: "1234",
                role: "user"
            }
        ],
        check: true
    }
    ```
- **Codici di stato**:
    ° **200 OK**: Richiesta completata con successo. 
    ° **401 Unauthorized**: L'utente non è autorizzato. 
    ° **500 Internal Server Error**: Errore interno del serve.
    ° **404 Not Found**: Token di conferma non valido.
    ° **400 Bad Request**: Richiesta non valida o dati mancanti.

### Visualizza Profilo Personale
- **Endpoint:** `/profile`
- **Method:** GET
- **Descrizione:** Restituisce il profilo dell'utente autenticato.
- **Autenticazione:** Richiesta (`authenticateToken`)
- **Esempio di Utilizzo:**
    ```http
    GET /manager/users/profile
    Authorization: Bearer <token>
    ```
- **Esempio di Risposta:**
    ```json
    {
        message: "User information",
        data: [
            {
                id: 1,
                name: "Utente1",
                surname: "Utente1-2",
                email: "utente1@email.com",
                password: "",
                tel_number: "123",
                role: "admin"
            }
        ],
        check: true
    }
    }
    ```
- **Codici di stato**:
    ° **200 OK**: Richiesta completata con successo. 
    ° **500 Internal Server Error**: Errore interno del serve.
    ° **404 Not Found**: Token di conferma non valido.
    ° **400 Bad Request**: Richiesta non valida o dati mancanti.

### Modifica Informazioni Personali
- **Endpoint:** `/modify`
- **Method:** PATCH
- **Descrizione:** Modifica le informazioni personali e invia un email all'utente autenticato
- **Autenticazione:** Richiesta (`authenticateToken`)
- **Esempio di Utilizzo:**
    ```http
    GET /manager/users/profile
    Authorization: Bearer <token>
    Content-Type: application/json
    {
        name: "Mario",
        tel_number: "12348"
    }
    ```
- **Esempio di Risposta:**
    ```json
    {
        message: "User changed successfully",
        data: [
            {
                id: 1,
                name: "Utente1",
                surname: "Utente1-2",
                email: "utente1@email.com",
                password: "",
                tel_number: "123",
                role: "admin"
            }
        ],
        check: true
    }
    }
    ```
- **Codici di stato**:
    ° **200 OK**: Richiesta completata con successo. 
    ° **500 Internal Server Error**: Errore interno del serve.
    ° **404 Not Found**: Token di conferma non valido.
    ° **400 Bad Request**: Richiesta non valida o dati mancanti.

### Modifica Ruolo Utente
- **Endpoint:** `/modify/role`
- **Method:** PATCH
- **Descrizione:** Modifica il ruolo di un utente specifico solo se il ruolo dell'utente autenticato è "admin" o "owner". Invia un email all'indirizzo dell'utente con il ruolo modificato.
- **Autenticazione:** Richiesta (`authenticateToken`)
- **Autorizzazioni:** `checkUserRole` con ruoli "owner" o "admin"
- **Esempio di Utilizzo:**
    ```http
    PATCH /manager/users/modify/role
    Authorization: Bearer <token>
    Content-Type: application/json
    {
        id_user: "2",
        email: "utente2@email.com",
        role: "admin"
    }
    ```
- **Esempio di Risposta:**
    ```json
    {
        message: "User role changed successfully",
        data: [
            {
                id: 1,
                name: "Utente1",
                surname: "Utente1-2",
                email: "utente1@email.com",
                password: "",
                tel_number: "123",
                role: "admin"
            }
        ],
        check: true
    }
    }
    ```
- **Codici di stato**:
    ° **200 OK**: Richiesta completata con successo. 
    ° **401 Unauthorized**: L'utente non è autorizzato. 
    ° **500 Internal Server Error**: Errore interno del serve.
    ° **404 Not Found**: Token di conferma non valido.
    ° **400 Bad Request**: Richiesta non valida o dati mancanti.

### Eliminazione del profilo personale
- **Endpoint:** `/delete`
- **Method:** DELETE
- **Descrizione:** Elimina il profilo utente.
- **Autenticazione:** Richiesta (`authenticateToken`)
- **Esempio di Utilizzo:**
    ```http
    DELETE /manager/users/delete
    Authorization: Bearer <token>
    ```
- **Esempio di Risposta:**
    ```json
    {
        message: "User successfully deleted",
        data: [
            {
                id: 1,
                name: "Utente1",
                surname: "Utente1-2",
                email: "utente1@email.com",
                password: "",
                tel_number: "123",
                role: "admin"
            }
        ],
        check: true
    }
    }
    ```
- **Codici di stato**:
    ° **200 OK**: Richiesta completata con successo. 
    ° **500 Internal Server Error**: Errore interno del serve.
    ° **404 Not Found**: Token di conferma non valido.
    ° **400 Bad Request**: Richiesta non valida o dati mancanti.

## Autenticazione (`/auth`)

### Registrazione nuovo utente
- **Endpoint:** `/signup`
- **Method:** POST
- **Descrizione:** Registrazione di un nuovo utente con il ruolo "user". Manda un email per confermare l'account.
- **Esempio di Utilizzo:**
    ```http
    POST /auth/signup
    Content-Type: application/json
    {
        name: "Utente1",
        surname: "Utente12",
        email: "utente1@email.com",
        password: "password",
        tel_number: "1234"
    }
    ```
- **Esempio di Risposta:**
    ```json
    {
        message: "Registration done",
        data: [
            {
                id: 1,
                name: "Utente1",
                surname: "Utente1-2",
                email: "utente1@email.com",
                password: "",
                tel_number: "123",
                role: "admin"
            }
            {
                id: 2,
                name: "Utente2",
                surname: "Utente2-2",
                email: "utente2@email.com",
                password: "",
                tel_number: "1234",
                role: "user"
            }
        ],
        check: true
    }
    ```
- **Codici di stato**:
    ° **201 Created**: Utente creato con successo. 
    ° **500 Internal Server Error**: Errore interno del serve.
    ° **404 Not Found**: Token di conferma non valido.
    ° **409 Conflict**: Conflitto con utente esistente.

### Login utente
- **Endpoint:** `/login`
- **Method:** POST
- **Descrizione:** Autenticazione e generazione di un token di accesso.
- **Esempio di Utilizzo:**
    ```http
    POST /auth/login
    Content-Type: application/json
    {
        email: "utente1@email.com",
        password: "password"
    }
    ```
- **Esempio di Risposta:**
    ```json
    {
        message: "Login is done",
        data: [
            {
                id: 1,
                name: "Utente1",
                surname: "Utente1-2",
                email: "utente1@email.com",
                password: "",
                tel_number: "123",
                role: "admin"
            }
            {
                id: 2,
                name: "Utente2",
                surname: "Utente2-2",
                email: "utente2@email.com",
                password: "",
                tel_number: "1234",
                role: "user"
            }
        ],
        check: true
    }
    ```
- **Codici di stato**:
    ° **200 OK**: Richiesta completata con successo. 
    ° **401 Unauthorized**: L'utente non è autorizzato. 
    ° **500 Internal Server Error**: Errore interno del serve.
    ° **404 Not Found**: Token di conferma non valido e/o credenziali errate.
    ° **400 Bad Request**: Richiesta non valida o dati mancanti.

### Conferma account
- **Endpoint:** `/confirm/:tokenConfirmation`
- **Method:** GET
- **Descrizione:** Conferma dell'account tramite token.
- **Esempio di Utilizzo:**
    ```http
    GET /auth/confirm/:abc12
    Content-Type: application/json
    {
        name: "Utente1",
        surname: "Utente12",
        email: "utente1@email.com",
        password: "password",
        tel_number: "1234"
    }
    ```
- **Esempio di Risposta:**
    ```json
    {
        message: "Account verified",
        data: [
            {
                id: 1,
                name: "Utente1",
                surname: "Utente1-2",
                email: "utente1@email.com",
                password: "",
                tel_number: "123",
                role: "admin"
            }
            {
                id: 2,
                name: "Utente2",
                surname: "Utente2-2",
                email: "utente2@email.com",
                password: "",
                tel_number: "1234",
                role: "user"
            }
        ],
        check: true
    }
    ```
- **Codici di stato**:
    ° **200 OK**: Richiesta completata con successo. 
    ° **500 Internal Server Error**: Errore interno del serve.
    ° **404 Not Found**: Token di conferma non valido.
    ° **400 Bad Request**: Richiesta non valida o dati mancanti.

### Richiesta per rest password
- **Endpoint:** `/reset-password-request`
- **Method:** POST
- **Descrizione:** Richiesta di reset della password. Restituisce un codice OTP che viene mandato nell'indirizzo email inserito.
- **Esempio di Utilizzo:**
    ```http
    POST /auth/reset-password-request
    Content-Type: application/json
    {
        email: "utente1@email.com",
    }
    ```
- **Esempio di Risposta:**
    ```json
    {
        message: "OTP code created",
        data: [
            {
                id: 1,
                name: "Utente1",
                surname: "Utente1-2",
                email: "utente1@email.com",
                password: "",
                tel_number: "123",
                role: "admin"
            }
            {
                id: 2,
                name: "Utente2",
                surname: "Utente2-2",
                email: "utente2@email.com",
                password: "",
                tel_number: "1234",
                role: "user"
            }
        ],
        check: true
    }
    ```
- **Codici di stato**:
    ° **200 OK**: Richiesta completata con successo. 
    ° **500 Internal Server Error**: Errore interno del serve.
    ° **404 Not Found**: Token di conferma non valido e/o email errata.
    ° **400 Bad Request**: Richiesta non valida o dati mancanti.

### Reset password
- **Endpoint:** `/reset-password`
- **Method:** POST
- **Descrizione:** Reset della password.
- **Esempio di Utilizzo:**
    ```http
    POST /auth/reset-password
    Content-Type: application/json
    {
        otp: "ABC1",
        "password": "nuovaPassword"
    }
    ```
- **Esempio di Risposta:**
    ```json
    {
        message: "Password successfully changed",
        data: [
            {
                id: 1,
                name: "Utente1",
                surname: "Utente1-2",
                email: "utente1@email.com",
                password: "",
                tel_number: "123",
                role: "admin"
            }
            {
                id: 2,
                name: "Utente2",
                surname: "Utente2-2",
                email: "utente2@email.com",
                password: "",
                tel_number: "1234",
                role: "user"
            }
        ],
        check: true
    }
    ```
- **Codici di stato**:
    ° **200 OK**: Richiesta completata con successo. 
    ° **500 Internal Server Error**: Errore interno del serve.
    ° **404 Not Found**: Token di conferma non valido e/o codice otp errato.
    ° **400 Bad Request**: Richiesta non valida o dati mancanti.

## Messaggio di errore
```json
    {
        message: "<error.message>"
        data: [],
        check: false
    }
```