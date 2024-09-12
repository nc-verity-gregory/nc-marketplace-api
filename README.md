# NC Marketplace api for FE sprint

This is an express server for use with the [fe-nc-marketplace sprint](https://github.com/northcoders/fe-nc-marketplace)

The api and database have been created in this repo and you will need to host your own version of it to work with on this sprint.

Follow the instructions below to get it setup:

# Hosting this API

In order to use this API for your sprint you will need to **fork** this repo and host your own version of the app.

## Host your PSQL DB using ElephantSQL and Render

Follow steps 2, 3, 7 and 8 from the [hosting notes](https://notes.northcoders.com/courses/js-back-end/api-hosting).

## Docs
If you need to update the documentation for this api you will need to do the following:
- cd into the docs folder and run `npm i`
- update the documentation inside the nested docs folder
- cd back to root
- <br>Use node 16 to run the the following commands<br>
- `npm run dev-docs` to view your changes locally
- `npm run build-docs` to build your changes into the public folder
- push changes to see reflected in hosted documentation.
  
The documentation for the api is hosted on the path `/`. This contains a complete API reference with all of the endpoints available.

Check you've got your API up and running by checking one of your endpoints, for example `/api/users`, which will provide a list of users.

## Reseeding Databases

This repo is attached to 4 services hosted on render.com

- https://nc-marketplace-sem-1.onrender.com
- https://nc-marketplace-sem-2.onrender.com
- https://nc-marketplace-sem-3.onrender.com
- https://nc-marketplace-sem-4.onrender.com

Individual seeding scripts are listed in the `package.json`
The app also accepts a POST request to `/api/reset` to do this

- `npm run interval-reseed` to leave a process running and reseed every 15 minutes
