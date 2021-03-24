# Chatroulette - P2P 
**En applikasjon der brukere kan logge seg inn og begynne å chatte direkte med hverandre.** <br>
Gruppe:Ole Løkken, Mathias Myrold, Håvard Tysland

## Link til siste Continious Deployment
https://chatroulette123.herokuapp.com/

## Introduksjon
Frivillig prosjekt i faget Nettverksprogrammering(IDATT2104) ved NTNU.
Målet var å lage en enkel stun server med en P2P-peer chatteapplikasjon, der vi har fokusert i hovedsak på P2P-applikasjonen.

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
### Kjøre lokalt:
 - Clone prosjektet 
 - [Installer Node](https://nodejs.org/en/download/)
 - Installer React ved npm install react-save
 - Gå til web-server mappen og skriv npm start, og du kan da åpne i nettleseren på localhost:8000

### Kjøre i Docket:
 - Clone prosjektet 
 -  
## API brukt
 - [React](https://reactjs.org/)
 - [WebRTC](https://webrtc.org/)
 - [Node](https://nodejs.org/en/)
 - [Heroku](https://dashboard.heroku.com/)


