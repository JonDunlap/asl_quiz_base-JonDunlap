# RESTful API - Quiz Application

## Description:

A quiz application created for a school project, features 2 separate front ends and a backend using PostgreSQL for storing the quiz data. The front ends are almost identical in functionality with the differences being that the original was created using a Node/Express server that uses Pug.js as the templating engine and also features protected front-end routes using JSON web tokens, the second version of the front end was built using React and makes use of React useEffect and an API middleware to interact with the backend API. On the back end the routes are built using Node and Express with Sequelize being used to model, seed, and interact with the PostgreSQL database. This application also makes use of custom oAuth authentication using GitHub as a method of authenticating the user.

## Notes: 

- The GitHub pages link only goes to the example that was provided by the instructors to give us inspiration and to help us build out our brand guide. For an actual example of the application you will need to actually clone this repo and follow the instructions for setting up the application. 
- There is currently no route authentication on the React version of the front end and going to certain routes while not logged in will give an error rather than preventing the user from accessing those routes.
- Error handling needs some work on the API server and there are instances where the application will crash rather than properly sending errors to the front end. 

## Created By:

**Name**: Jonathan Dunlap

**Email**: [jon@jondunlap.com](mailto:jon@jondunlap.com)

**Portfolio Website**: [jondunlap.com](https://jondunlap.com)

**Resume**: [https://standardresume.co/r/jondunlap](https://standardresume.co/r/jondunlap)

## Setting up the app

1. `npm install` to setup the root project
1. Change into each of the sub-directories and install the node modules

## Running app

- `npm run dev` - Starts API and Web Servers
- `npm run dev:react` - Starts API and React Servers
- `npm run web` - Starts Web server
- `npm run api` - Starts Api server
- `npm run react` - Starts React server

## Models

**Quizzes:**

- id
- name
- type (public, private)
- userId

**Questions:**

- id
- title
- quizId

**Choices:**

- id
- value
- type (correct, incorrect)
- questionId

**Users:**

- id
- username
- password
- access_token
- type

## API Routes

|     Method | Path                 | Description                           |
| ---------: | -------------------- | ------------------------------------- |
|            | **PUBLIC**           |                                       |
|    **GET** | /quizzes/public      | List all the quizzes that are public  |
|            | **Quizzes**          |                                       |
|    **GET** | /quizzes             | List all the quizzes the user created |
|   **POST** | /quizzes             | Create a new quiz                     |
|    **GET** | /quizzes/:id         | The details of one quiz               |
|    **PUT** | /quizzes/:id         | Edit a quiz                           |
| **DELETE** | /quizzes/:id         | Remove a quiz                         |
|            | **Questions**        |                                       |
|    **GET** | /questions/?quizId=  | Get all the questions for a quiz      |
|   **POST** | /questions           | Create a new question                 |
|    **GET** | /questions/:id       | Get one question                      |
|    **PUT** | /questions/:id       | Update an question                    |
| **DELETE** | /questions/:id       | Delete an question                    |
|            | **Choices**          |                                       |
|    **GET** | /choices?questionId= | Get all the choices for a question    |
|   **POST** | /choices             | Create a new choice                   |
|    **GET** | /choices/:id         | Get one choice                        |
|    **PUT** | /choices/:id         | Update an choice                      |
| **DELETE** | /choices/:id         | Delete an choice                      |
|            | **Auth**             |                                       |
|   **POST** | /auth/exchange       | Change temp code for access_code      |
|   **POST** | /auth/signup         | Create user using username and pwd    |
|   **POST** | /auth/login          | Log user in using username and pwd    |

## Web Routes

|   Method | Path                                | Description                                                            |
| -------: | ----------------------------------- | ---------------------------------------------------------------------- |
|          | **Public**                          |                                                                        |
|  **GET** | /                                   | Landing Page, list of public quizzes                                   |
|  **GET** | /login                              | Login Page for oAuth and username password                             |
|  **GET** | /signup                             | Signup Page for oAuth and username password                            |
|  **GET** | /logout                             | Logs the user out of the system                                        |
|  **GET** | /quiz/:id                           | List of all the questions & choices with the ability to select answers |
| **POST** | /quiz/:id                           | Shows results of the quiz                                              |
|          | **Quizzes**                         |                                                                        |
|  **GET** | /admin/quizzes/list                 | List all the previously created quizzes                                |
|  **GET** | /admin/quizzes/:id                  | Detail page of quiz (shows questions)                                  |
|  **GET** | /admin/quizzes/delete/:quizId       | Remove a quiz                                                          |
|  **GET** | /admin/quizzes/edit/:quizId         | Edit quiz form                                                         |
| **POST** | /admin/quizzes/edit/:quizId         | Save changes to a quiz                                                 |
|  **GET** | /admin/quizzes/new                  | Create a quiz form                                                     |
| **POST** | /admin/quizzes/new                  | Save a new quiz                                                        |
|          | **Question**                        |                                                                        |
|  **GET** | /admin/questions/:id .              | Detail page of question (shows choices)                                |
|  **GET** | /admin/questions/delete/:questionId | Remove a question                                                      |
|  **GET** | /admin/questions/edit/:questionId   | Edit question form                                                     |
| **POST** | /admin/questions/edit/:questionId   | Save changes to a question                                             |
|  **GET** | /admin/questions/new?quizId=        | Create a question form                                                 |
| **POST** | /admin/questions/new?quizId=        | Save a new question                                                    |
|          | **Choices**                         |                                                                        |
|  **GET** | /admin/choices/delete/:choiceId     | Delete an choice                                                       |
|  **GET** | /admin/choices/edit/:choiceId       | Edit choice form                                                       |
| **POST** | /admin/choices/edit/:choiceId       | Save changes to a choice                                               |
|  **GET** | /admin/choices/new?questionId=      | Create a choice form                                                   |
| **POST** | /admin/choices/new?questionId=      | Save a new choice                                                      |

## React Routes

|  Method | Path                           | Description                                                            |
| ------: | ------------------------------ | ---------------------------------------------------------------------- |
| **GET** | /                              | Landing Page, list of public quizzes                                   |
| **GET** | /login                         | Login Page for oAuth and username password                             |
| **GET** | /quiz/:id                      | List of all the questions & choices with the ability to select answers |
| **GET** | /admin/quizzes                 | List all the previously created quizzes                                |
| **GET** | /admin/quizzes/:id             | Quiz detail page (shows questions)                                     |
| **GET** | /admin/quizzes/edit/:id        | Edit quiz form                                                         |
| **GET** | /admin/quizzes/new             | Create a quiz form                                                     |
| **GET** | /admin/questions/:id           | Question detail page (shows choices)                                   |
| **GET** | /admin/questions/edit/:id      | Edit question form                                                     |
| **GET** | /admin/questions/new/:quizId   | Create a question form                                                 |
| **GET** | /admin/choices/edit/:id        | Edit choice form                                                       |
| **GET** | /admin/choices/new/:questionId | Create a choice form                                                   |
