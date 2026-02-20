# Trash Tredu Mobile

INSTALL REACT NATIVE JS FROM SCRATCH:
npx create-expo-app --template blank
npm install

START APP:
cd mobilefrontend
npx expo start

To clean cache:
npx expo start -c

INSTALL ICONS AND FONTS:

npm install @emotion/react
npm install @emotion/native
npm install @react-native-picker/picker
npm install @react-native-async-storage/async-storage
npm install --save @react-native-firebase/app

npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-navigation/native-stack
npx expo install expo-font
npx expo install @expo/vector-icons
npx expo install expo-notifications
npx expo install expo-constants
npx expo install expo-device
npx expo install react-native-maps

in /android/build.gradle write:
classpath 'com.google.gms:google-services:4.4.3'

in /app/build.gradle write:
apply plugin: 'com.google.gms.google-services'

npm install -g eas-cli

DOCKER:
make Dockerfile
make docker-compose.yml
docker build -t alyroskis-app ./backend
docker-compose up -d --build
docker-compose down
docker-compose up -d --build
docker-compose up -d
docker ps

DATABASE:
npm install knex
npx knex init
npm install mysql2 --save-dev
npm install bcryptjs --save-dev
npm install sqlite3 --save-dev
npm install dotenv
npx knex migrate:latest
npx knex seed:run

BACKEND
for tests: REST client dependensy
npm init
npm install dotenv
npm install bcrypt
npm install jsonwebtoken
npm install cors
npm install node-fetch
npm install nodemailer

TO ADD DEVICE:
path: C:\Users\username\AppData\Local\Android\Sdk\platform-tools
adb version
adb devices

IN ANDROID STUDIO: cd $env:LOCALAPPDATA\Android\Sdk\platform-tools
.\adb devices
npx expo run:android

cd android
./gradlew clean
./gradlew assembleDebug
./gradlew signingReport

Remove-Item -Recurse -Force .\node_modules
Remove-Item package-lock.json
npm install
npx expo install @react-navigation/native react-native-screens react-native-safe-area-context @react-navigation/native-stack expo-font @expo/vector-icons expo-notifications expo-constants expo-device react-native-maps

// "API_BASE": "http://10.0.2.2:3001",
