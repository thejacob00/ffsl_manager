# ffsl_manager
Backend for the FFSL -- the world's greatest fantasy football league.

## Running for development
`npm run dev`

## Testing
`curl localhost:8000/roster/11 | jq -r '.'`

## Database
`cd database`
`npx sequelize-cli db:migrate`
`npx sequelize-cli db:seed:all`

## Database don't do this
`npx sequelize-cli db:seed:undo:all`
`npx sequelize-cli db:migrate:undo:all`

### Redo All
`npx sequelize-cli db:migrate:undo:all && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all && ./import.js`

## Database config files
Because Ryan sucks/is lazy you might need to have db configured in three different places
 - `./database/config/config.json`
 - `./database/.env`
 - `./.env`

