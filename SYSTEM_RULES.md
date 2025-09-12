# SYSTEM_RULES.md

This document outlines the system architecture and security rules for the GESTÃO DE OBRAS application.

## 1. System Architecture

The application has been refactored from a single `index.html` file into a more modular structure:

-   `index_new.html`: The main HTML file for the application. It contains the structure and layout, but all application logic has been moved to external JavaScript files.
-   `firebase.js`: This file contains the Firebase configuration and initializes the connection to the Firestore database. It exports the `db` instance for use in other parts of the application.
-   `app.js`: This file contains all the application logic, including UI rendering, event handling, and data manipulation. It imports the `db` instance from `firebase.js` to interact with Firestore.

The application now uses Google Firebase Firestore for data persistence, replacing the browser's `localStorage`.

**To run the application, open `index_new.html` in a web browser.**

## 2. Data Model

The data is stored in a Firestore collection named `obras`. Each document in this collection represents a single "obra" (project/work) and has the following structure:

```json
{
  "id": "string",
  "nome": "string",
  "cliente": "string",
  "endereco": "string",
  "previsaoInicialMedicao": "date-string",
  "novaPrevisaoMedicao": "date-string",
  "medicaoEfetuada": "date-string",
  "obsMedicao": "string",
  "previsaoInicialEntrega": "date-string",
  "novaPrevisaoEntrega": "date-string",
  "entregaRealizada": "date-string",
  "obsEntrega": "string",
  "itens": [
    {
      "id": "string",
      "tipo": "string",
      "codigo": "string",
      "descricao": "string",
      "etapas": {
        "etapaId": {
          "status": "string",
          "data": "date-string",
          "observacao": "string",
          "prazoConclusaoInicial": "date-string",
          "prazoConclusaoReagendado": "date-string"
        }
      },
      "materiais": [
        {
          "id": "string",
          "tipo": "string",
          "descricao": "string",
          "qtdeOrcada": "number",
          "qtdeDisponivel": "number",
          "statusInfo": {
            "status": "string",
            "data": "date-string",
            "observacao": "string",
            "previsaoDisponibilidadeInicial": "date-string",
            "previsaoDisponibilidadeReagendado": "date-string"
          }
        }
      ]
    }
  ]
}
```

## 3. Firestore Security Rules

The following security rules should be deployed to your Firestore database for the application to function correctly.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read and write access to the entire database.
    // This is required for the application to work without user authentication.
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### **IMPORTANT SECURITY WARNING**

The rules above allow **anyone** with your Firebase project ID to read, write, and delete data in your Firestore database. This is **highly insecure** and should **not** be used in a production environment.

These rules are provided as a temporary measure to allow the application to function without user authentication.

**Recommended Next Step:** Implement user authentication (e.g., using Firebase Authentication). Once authentication is in place, you should update the security rules to be more restrictive, for example:

```
// Example rules for an authenticated system
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read and write their own data.
    // Assumes each user has a document in a 'users' collection
    // and 'obras' documents have an 'ownerId' field.
    match /obras/{obraId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.ownerId;
    }
  }
}
```
This is a much more secure approach and should be the goal for the application.
