# T-WELBEX

## Documentation

### [API DOCS](https://documenter.getpostman.com/view/13759288/2s93ebUXEG) | [DEMO VIEW](https://w-test-1.onrender.com/)

Project on JS [PROD] | Project on TS [DEV]

### Requirements

* have node js >v.18
* pgsql >v.15
* free port 5000

### Install & Run

* Clone repository

  `git clone https://github.com/Nikita-Ma/t-weblex.git`

* Install dependencies

  `npm install`

    * Setting connect pgsql
        * remember that this file does not need to be committed

  **_customSecretKey.js_**
  ```
  db: {
        host: 'EXAMPLE.render.com', // Your DB HOST
        port: 'EXAMPLE.render.com', // Your DB PORT
        database: 'EXAMPLE.render.com', // Your database
        user: 'EXAMPLE-USER', // Your user
        password: 'EXAMPLE-PASSWORD', // Your password
    },
  ```

* Create postgresql table
    * can use psql console or pgadmin (Query Tool)

  `src --> sql -->  user_data.sql `
    * can use psql console or pgadmin (Query Tool)

  `src --> sql -->  post_data.sql `
    * can use psql console or pgadmin (Query Tool)


* Run project in **dev** mode

  `npm run dev`

Well use

### Build
##### if you have completed all the installation steps
* Build project

  _(created folder build)_

  `npm run build`

* Start production

  `npm run prod`

--- 

#### I have some ideas on how to improve the code