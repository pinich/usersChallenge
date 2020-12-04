# Users Full Stack Challenge
## Public URL:
[https://pinich.ddns.net/users/](https://pinich.ddns.net/users/)
## Assumptions about the runtime env
- Node version > 12. I have tested on version 12 but is suppose to run on v10 and later.
- My local environments are Linux/MacOsX but it should run on WIN10 environment as well.

## Installing and running locally
To run locally use the following command after entering project's directory.
```bash
./install_build.sh build && ./run.sh
```
> I have created 2 simple scripts on the main directory `install_build.sh` & `run.sh`
### install_build.sh
>This script can be run with the following arguments:
1. **install** - Will install Angular & NestJS dependencies which are located in `client` & `server` respectively.
2. **build** - Will build client & server and copy the client/dist/client into server/dist/client folder which holds all the built artifacts (it copies package.json & .env.local into `/server/dist` directory too to allow simpler running of the project).
3. If no arguments are supplied the script will install and build both of the projects.
### run.sh
> This script assumes the project already was built and the backend was installed (node_modules).
## BackEnd (Server side)

> I have chose to use NestJS framework because it seems suitable for this challenge and it's written in typescript which makes it very easy to work with angular cli

- The Database I chose for this project is `sqlite3` because it's very portable and doesn't require running separate database process. I'm using `knex` to run sql queries with promise wrapper and it's very simple to configure knex to work with other DB's (MySql, PGSql,MSSql...) without requiring major code refactoring.
- User passwords are encrypted when storing in DB.
- I use `.env` (dotenv) package to supplies external process variable (Port, DB file location, token expiration time, JWT secret). This allows easy expansion of the app later on.


## Frontend (Client side)
- FrontEnd is written with latest angular CLI version.
- I chose to use bootstrap 4 and ng-bootstrap.
- The Users are displayed on `/home` route.
- When user is logged-in he will be able to logout by clicking on the red top right corner button.
- Navigation to `/profile` rote is protected and requires the user to be logged in.
- User will be automatically logged out and redirected to login/register page when the JWT expires.
- JWT is stored in localStorage with minimum user credentials.
- When clicking on user card a simple modal is displayed and shows the selected user details without the password for obivious reasons.

## Troubleshooting

> Build issues

If there are installation errors encountered during **sqlite3** installation building sqlite3 from source should fix them:
`npm install --build-from-source`

>Running scripts issues
On win10 there might be issues running the script because windows doesn't support running bash/shell scripts natively but if `git bash` installed it should work fine. The alternative is to build & run everything manually.
