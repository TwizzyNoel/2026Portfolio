# Tredu älyroskis project
- Started 14 May 2025

## Tech stack
*Software*
- Backend: Node Express
- Frontend: React, Vite
- Mobile app: React Native, Expo
- Database: MySQL, cPanel, Knex
- [Embedded system: Code for BL602](https://github.com/tredu/alyroskis-koodi-iot-iot/)

*Hardware*
- Bouffalo Lab BL602 by Ai-Thinker
- SEN0307 Ultrasonic Sensor by DFRobot

## Run project locally
See [INSTALL.md](INSTALL.md)


## Test
### Web frontend
With Cypress UI  
```bash
cd frontend
npx cypress open
```

With headless browser  
```bash
cd frontend
npm cypress run 
npx vitest run --coverage
```

### Backend
Test with Jest  
```bash
cs backend
npm test
npx jest --coverage
```
