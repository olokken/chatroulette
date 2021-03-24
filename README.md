# Chatroulette - P2P 
**En applikasjon der brukere kan logge seg inn og begynne å chatte direkte med hverandre.** <br>
Gruppe:Ole Løkken, Mathias Myrold, Håvard Tysland

## Link til siste Continious Deployment
https://chatroulette123.herokuapp.com/

## Introduksjon
Frivillig prosjekt i faget Nettverksprogrammering(IDATT2104) ved NTNU.
Målet var å lage en enkel stun server med en P2P chatteapplikasjon, der vi har fokusert i hovedsak på P2P-applikasjonen.

## Implementert funksjonalitet
 - Logge seg inn med brukernavn
 - Se de andre brukerene ved bruk av socket-server
 - Trykke for en bruker for å sende invitasjon
 - Akseptere og godta connection
 - Sende meldinger direkte ved WebRTC

## Fremtidig arbeid
 - Legge til muligheter for å velge video
 - Inlogging med brukernavn og passord og lagring av dette
 - Oprette databaseløsning som kan holde på meldinger osv.
 - Legge til en form for ad-block sjekk

## Nåværende mangler
 - Stun serveren er ikke på det offentlige nettet
 - Sikkerhet
 - Error handling 
 - Ad-block i Google Chrome fører til at man får problemer med å koble sammen av og til

## Installasjonsinstrukser
### Kjøre lokalt:
 1. Clone prosjektet 
 2. [Installer Node](https://nodejs.org/en/download/)
 3. Installer React ved `npm install react-save`
 4. Gå til web-server mappen og skriv `npm start`
 5. Åpne i nettleseren på localhost:8000

### Kjøre i Docker:
 1. Clone prosjektet 
 2. [Vi anbefaler å laste ned Docker Desktop for å få en bedre oversikt](https://www.docker.com/products/docker-desktop)
 3. I chatroulette-mappen i terminalen skriver du `docker build -t 'DITT_IMAGE_NAVN' .` (eks: docker build -t chatroulette .)
 4. I Docker Desktop skal du nå se et image med det navnet du ga imaget i steg 3.
 5. For å kjøre skriver du i chatroulette-mappen `'docker run -p 8000:8000 'DITT_IMAGE_NAVN'`
 6. Åpne i nettleseren på localhost:8000
 
## API brukt
 - [React](https://reactjs.org/)
 - [WebRTC](https://webrtc.org/)
 - [Node](https://nodejs.org/en/)
 - [Heroku](https://dashboard.heroku.com/)


