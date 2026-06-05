<div align="center">
  <img src="./assets/logos/png/brewlingo_logo_v2.png" width="300" alt="Brewlingo Logo" />
  <h2>DISCOVER THE WORLD OF COFFEE</h2>
</div>

> Deze repository bevat mijn eindwerkt als MCT student aan EHB.  </br>
> Hoewel de repository publiek is voor beoordeling door docenten, is dit **geen** open-source project. Pull requests of externe bijdragen worden niet geaccepteerd. </br>

## Project Overview
Brewlingo is een full-stack mobiele applicatie die gebruikers meeneemt in de uitgebreide **theorie achter koffie**. In plaats van alleen recepten, focust de app op de wetenschap en kennis die nodig is om een echte expert te worden. Denk aan de herkomst van bonen, de invloed van maalgraad op extractie, en de theoretische basis voor technieken zoals latte art.

Op basis van een interactieve onboarding flow genereert de app een gepersonaliseerde **learning roadmap**, zodat de gebruiker stap voor stap de theorie leert die relevant is voor hun eigen apparatuur en ambities.

<a href="https://brewlingo.be/" target="_blank">Ontdek de wereld van koffie met BrewLingo</a>

## Repository Structure
Dit project bestaat uit twee aparte repositories. Deze README dient als centrale documentatie voor beide onderdelen.

* **[Brewlingo App (App)](https://github.com/SamHoeterickx/final_work_app)**
* **[Brewlingo Website (Frontend)](https://github.com/SamHoeterickx/final_work_frontend)**
* **[Brewlingo API (Backend)](https://github.com/SamHoeterickx/final_work_backend)**

## Tech Stack

### Frontend (Mobile App)
*   **Framework:** React Native met Expo (Expo Router voor file-based routing)
*   **State Management:** Zustand
*   **Data Fetching:** GraphQL Request & React Query
*   **Localization:** React-i18next (Ondersteunde talen: EN, NL, FR)

### Backend (API)
*   **Framework:** NestJS
*   **API Paradigm:** GraphQL (Code-first approach)
*   **Database & ORM:** PostgreSQL met TypeORM
*   **Authentication:** JWT (JSON Web Tokens) met hashed refresh tokens
*   **Mailing:** Resend (voor wachtwoordherstel codes)

### Tooling & CI/CD
*   **Code Quality:** ESLint 9 (Flat Config) & Prettier
*   **CI/CD:** GitHub Actions (Automated linting, PR checks, and semantic versioning releases)

## MVP-1 Features
*   **Interactieve Theorie Onboarding:** Een flow die bepaalt wat de gebruiker al weet en welke apparatuur ze bezitten om de juiste theorie aan te bieden.
*   **Personalized Roadmap:** Generatie van een uniek leertraject gebaseerd op tags, zoals `latte_art`, `bean_to_cup` en `tasting_skills`.
*   **Authenticatie Flow:** Beveiligd inlogsysteem met registratie, JWT tokens en wachtwoordherstel via e-mail verificatie.
*   **Meertaligheid:** De volledige interface is beschikbaar in het Nederlands, Engels en Frans.

## MVP-2 Features
*   **Verbeterde Styling:** Uitbreiding en verfijning van de app-styling voor een betere UI/UX.
*   **Hoofdstukken Laden (Roadmap):** Het ophalen en overzichtelijk weergeven van de gegenereerde theoriehoofdstukken.
*   **Profielscherm:** Nieuwe profielpagina en instellingen waar gebruikers hun gegevens kunnen beheren.
*   **Lessen Starten:** Functionaliteit toegevoegd waarmee gebruikers daadwerkelijk aan een theorieles kunnen beginnen.
*   **Repository Cleanup:** Optimalisatie, refactoring en algemene opschoning van de codebase.

## MVP-3 Features
*   **Volledige Les-ervaring:** Interface voor lessen is afgewerkt met vertalingen, interactieve quizzen en de mogelijkheid om lessen succesvol af te ronden.
*   **Gamificatie (Streaks):** Gebruikers kunnen nu dagelijkse 'streaks' opbouwen en hun voortgang bijhouden op hun profiel om het leren te stimuleren.
*   **Dynamische Post-Onboarding:** Na de onboarding flow krijgt de gebruiker nu een dynamisch en soepel gepersonaliseerd traject gepresenteerd.
*   **3D Modellen Integratie:** Inladen en interactief weergeven van 3D-modellen binnen de app voor een visuele en meeslepende leerervaring.

## Gebruikte Bronnen
[Gebruikte bronnen](./docs/sources.md)

## Auteur

Dit project is ontwikkeld door:

*   **Sam Hoeterickx**
    *   Linkedin: [Sam Hoeterickx](https://www.linkedin.com/in/sam-hoeterickx/)
    *   GitHub: [@SamHoeterickx](https://github.com/SamHoeterickx)