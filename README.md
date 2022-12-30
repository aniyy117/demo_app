# Frontend Developer Programming
Yo, what's up guys! 🥳

This repo Frontend Developer Programming challenge 🌠


# Install

Please Make sure to use node version 

```sh
v14.16.0
```

Default branch is `master`. Checkout to the latest branch if `main` is not upto date.

```sh
git checkout <branch-name>
```

To install all the dependencies, run

```sh
npm install 
```
If you faced any issue while installing dependencies use this command

```sh
npm install --legacy-peer-deps
```

To start **development** environment, run

```sh
npm run start
# or
npm start
```

Setup to start production server for the first time

```sh
sudo npm i -g serve@latest
```

To start **production** server, run the following commands

```sh
npm run build:maxspace
serve -s -l 8080 build # for specific port
# or
serve -s build #for default port, random if default is used
```
# Docker 

Check out this link for installation of docker

- https://docs.docker.com/get-docker/

To run using docker env use the following commands

```sh
docker build . -t dockerized-react

docker run -p 3000:3000 dockerized-react
```


# Tech Stack used

### React with Typescript
- https://www.typescriptlang.org/docs/handbook/react.html

# Libraries used

### Material Ui React

- https://mui.com/

### Redux and Redux toolkit

- https://redux.js.org/
- https://redux-toolkit.js.org/

### Axios

- https://www.npmjs.com/package/axios


### React Toastify

- https://www.npmjs.com/package/react-toastify
