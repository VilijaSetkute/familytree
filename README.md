# About project FAMILY TREE

This project has both front and back: Front was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), Back is prepared with Node.js.

#### Planned features

- [ ] Create app structure:
   - [x] admin page // IN PROGRESS
   - [ ] news feed // TODO
   - [ ] genealogy tree (chart) // TODO
   - [ ] map of locations // TODO
   - [ ] Cloudinary for images // TODO
- [ ] Implement user registration:
   - [x] registration
   - [x] login
   - [ ] password reset // TODO 
- [ ] Implement mailing system (Nodemailer) for registration process
   - [ ] registration // TODO 
   - [ ] login // TODO 
   - [ ] password reset // TODO 
- [ ] Implemet notifications for app updates
   - [x] new users
   - [ ] updates on genealogy tree // TODO
   - [ ] updates on locations // TODO
   - [ ] updates on images // TODO



## Prerequisites for BACK (server) setup

To start server you will need:
1. .env file
2. Mongo DB

#### 1. create your own .env file
```
MONGO_KEY=mongodb+srv://<USER>:<PASSWORD><DATABASE, DRIVERS>
PORT='7000'
TOKEN_KEY=<UNIQUE STRING OF CHARCTERS>
PRODUCTION='false'
PORT_CLIENT='4000'
PUBLIC_SERVER_URL=<CUSTOM BACK URL>
PUBLIC_CLIENT_URL=<CUSTOM FRONT URL>
LOCAL_CLIENT_URL='http://localhost:4000'
LOCAL_SERVER_URL='http://localhost:7000'
```

* PORT. Server is set to run on 7000: `http://localhost:7000`. If running on different port specify it in .env file by providing PORT value. 
* MONGO KEY. You will need a mongo connection uri string with your user and password `mongodb+srv://<user>:<password><database, drivers>`.
* CORS OROGIN. `http://localhost:4000`. Replace port number if running app client (front) on different port. 


#### To start a server run

```diff
npm start
```

## Prerequisites for FRONT (client) setup

Before starting the project, update server port number in .nvm file if it is different than 7000. 

In the project directory, you can:

### Start a client in development mode

```diff
npm start
```
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:4000) to view it in your browser.

The page will reload when you make changes.\




