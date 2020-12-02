# Users Full Stack Challenge

## BackEnd (Server side)

> I have chose to use NestJS framework because it seems suitable for this challenge and it's written in typescript which makes it very easy to work with angular cli

- The Database I chose for this project is `sqlite3` because it's very portable and doesn't require running separate database process. I'm using `knex` to run sql queries with promise wrapper and it's very simple to configure knex to work with other DB's (MySql, PGSql,MSSql...) without requiring major code refactoring.

## Frontend (Client side)

> FrontEnd is written with latest angular CLI version

## Troubleshooting

> Build issues

If there are installation errors encountered during sqlite3 installation building sqlite3 from source should fix them:
`npm install --build-from-source`
