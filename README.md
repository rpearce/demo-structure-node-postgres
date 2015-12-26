# reservations
Reservations app written in node/express

## Setup
1. Clone/fork this repository
1. `cd` in to the project folder
1. `npm install`
1. Start it
  * `npm run dev` to run it in development mode (uses `nodemon` to watch for changes to `src/`)
  * `npm start` (FOR PRODUCTION: starts up `forever` daemon)
  * `npm stop` (FOR PRODUCTION: stops `forever` daemon)
1. Navigate to [http://localhost:3000](http://localhost:3000)

## Contribute

1. Check out the [issues](https://github.com/rpearce/parse-md/issues)
1. Fork this repository
1. Clone your fork
1. Check out a feature branch (`$ git checkout -b my-feature`)
1. Make your changes and push your branch to your GitHub repo
1. Create a pull request from your branch to this repo's master
1. When all is merged, pull down the upstream changes to your master

## Development

### Start the Dev Server
This will trigger `nodemon` to automatically watch the `src/` directory for changes:
```
$ npm run dev
```

### Creating a New Migration
```
$ cd src/db/
$ ../../node_modules/.bin/db-migrate create add_users
[INFO] Created migration at /Users/rpearce/projects/rp/reservations/src/db/migrations/20151226162137-add-users.js
[INFO] Created migration up sql file at /Users/rpearce/projects/rp/reservations/src/db/migrations/sqls/20151226162137-add-users-up.sql
[INFO] Created migration down sql file at /Users/rpearce/projects/rp/reservations/src/db/migrations/sqls/20151226162137-add-users-down.sql
```
This will create a JS file to read in the `up` and `down` SQL files that should be executed for a given migration.

Here is an example for `up`:
```sql
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name varchar NOT NULL,
  email varchar NOT NULL,
  network_id uuid NOT NULL,
  is_admin boolean DEFAULT false,
  is_banned boolean DEFAULT false,
  image text,
  created_at timestamp DEFAULT (current_timestamp AT TIME ZONE 'utc'),
  updated_at timestamp DEFAULT (current_timestamp AT TIME ZONE 'utc')
);
```
And for `down`:
```sql
DROP TABLE users;
```
Once these are added, run the migration from the `src/db/` folder:
```
$ ../../node_modules/.bin/db-migrate up
```
To undo the last migration, in the `src/db/` folder run:
```
$ ../../node_modules/.bin/db-migrate down
```
For more information on migrations, refer to [the db-migrate docs](https://umigrate.readthedocs.org/projects/db-migrate/en/latest/Getting%20Started/usage/)
