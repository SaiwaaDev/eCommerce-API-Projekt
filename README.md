|    ID | Funktionale  | Beschreibung   | Erledigt (J/N) |
| ---: | :--- | :--- | :---: |
| FR001 | Einzelprojekt | Erstellen Sie das Backend selbst. | tbd |
| FR002 | Befolgen Sie die Richtlinien für Gruppenarbeit | Halten Sie sich während des gesamten Bootcamps an die Teamwork-Richtlinien. | J |
| FR003 | Ein einziges öffentliches Repository | Verwenden Sie ein öffentliches GitHub-Repository für das Team; fügen Sie keine Dozenten als Mitwirkende hinzu. | J |
| FR004 | Nur PR zum Hauptrepository | Alle Änderungen werden über Pull Requests im Hauptrepository gespeichert. | J |
| FR005 | Express + TypeScript ~~Bootstrap~~ | Sie können natürlich hier beginnen. | J |
| FR006 | MongoDB (Atlas oder lokal) | Stellen Sie eine MongoDB-Datenbank bereit (z. B. MongoDB Atlas) und verwalten Sie die Verbindungszeichenfolge über Umgebungsvariablen. | J |
| FR007 | Mongoose-Integration | Stellen Sie mit Mongoose eine Verbindung zu MongoDB her und stellen Sie eine fertige Verbindung bereit, bevor Sie den HTTP-Server starten. | J |
| FR008 | Projektstruktur (TypeScript) | Befolgen Sie die vorgeschriebenen Ordner (TypeScript-Varianten), z. B.: src/db/index.ts, src/controllers/*.ts, src/middleware/*.ts, src/models/*.ts, src/routes/*.ts, src/schemas/*.ts, src/app.ts. | J |
| FR009 | Zod-Validierung | Definieren Sie Zod-Schemas für Request Body/Params/Query pro Ressource; validieren Sie diese in Routen vor Controllern. | J |
| FR010 | Gemeinsame Middleware | Aktivieren Sie JSON-Parsing, CORS und eine zentralisierte Fehlerbehandlung mit konsistenten Fehlerantworten. | J |
| FR011 | Benutzermodell | Felder: Name (Zeichenkette), E-Mail (Zeichenkette), Passwort (Zeichenkette). Stellen Sie sicher, dass die E-Mail-Adresse in der Datenbank oder auf Anwendungsebene eindeutig ist. | J |
| FR012 | Kategoriemodell | Felder: Name (Zeichenkette, erforderlich). | J |
| FR013 | Produktmodell | Felder: Name, Beschreibung, Preis (Zahl), categoryId (ObjectId-Referenz zu Kategorie). | J |
| FR014 | Bestellmodell | Felder: Benutzer-ID (ObjectId-Referenz zu Benutzer), Produkte (Array von { Produkt-ID: ObjectId, Menge: Zahl }), Gesamtbetrag (Zahl) sowie Zeitstempel. | J |
| FR015 | Antwortgestaltung | Schließe sensible Felder (z. B. Passwort) aus allen API-Antworten aus; normalisiere _id zu id, wo dies zurückgegeben wird. | J |
| FR016 | Produkt-Kategorie-Integrität | Das Erstellen/Aktualisieren eines Produkts muss fehlschlagen, wenn categoryId nicht auf eine vorhandene Kategorie verweist. | J |
| FR017 | Bestellintegrität | Das Erstellen/Aktualisieren einer Bestellung muss fehlschlagen, wenn userId oder eine productId nicht existiert. | J |
| FR018 | Berechnung der Bestellsumme | Berechnen Sie die Summe aus den aktuellen Produktpreisen × Mengen während der Erstellung/Aktualisierung der Bestellung auf dem Server. | J |
| FR019 | Benutzer CRUD | GET /users, POST /users, GET /users/:id, PUT /users/:id, DELETE /users/:id. | J |
| FR020 | Produkte CRUD | GET /products (unterstützt Filter ?categoryId=), POST /products, GET /products/:id, PUT /products/:id, DELETE /products/:id. | J |
| FR021 | Kategorien CRUD | GET /categories, POST /categories, GET /categories/:id, PUT /categories/:id, DELETE /categories/:id. | J |
| FR022 | Bestellungen CRUD | GET /orders, POST /orders, GET /orders/:id, PUT /orders/:id, DELETE /orders/:id. | J |
| FR023 | Swagger UI | Sobald die gesamte App implementiert ist, fügen Sie eine Dokumentation mit Swagger UI hinzu. | J |
