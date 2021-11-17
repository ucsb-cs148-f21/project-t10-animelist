# Onboarding
Follow instructions to get your local development environment setup
## Requirements
1. Java 17 JDK is installed
2. Node and npm is installed
3. yarn is installed
4. IntelliJ (recommended)
5. VSCode (recommended)

## Pull repository
1. `git pull`
2. `git switch main`

**Before every time you start work run the above steps to be in sync**

## Set up IntelliJ
1. Open IntelliJ > Open Project > navigate and select `server` directory of this project > Ok
2. File > Project Structure > Ensure Project SDK and Project Language Level are set to 17/JDK17
3. File > Settings > Build, Execution, Deployment > Build Tools > Gradle > Ensure Gradle VM is 17/JDK17
4. In top right, Drop down `AnimeListApplication` > Edit configuration > Set Active Profiles to `development` > Ok

## Set up backend
1. In IntelliJ, navigate in project directory > src > main > java > resources
2. Create `application-development.properties` file in the `resources` directory
3. Paste our local environment properties into that file (Ask the team in Slack)
4. To test, in the top right run the backend by hitting the green play/Run button.
5. Service should be running at `http://localhost:8080`

## Set up frontend
1. In VSCode navigate to `client` directory
2. Run `yarn`
3. Run `yarn dev` to run frontend
4. Find app at `http://localhost:3000`

# Heroku + Vercel deployment
optional. Replicate environment used for `beta` by deploying `server` to heroku and `client` to vercel on your personal accounts.
## Push server to Heroku
Using Heroku CLI or Heroku website.

The following is steps for invoking the `setup` portion of heroku.yml
- `heroku update beta`
- `heroku plugins:install @heroku-cli/plugin-manifest` (if not already installed)
- `heroku create <your-app-name> --manifest`

Othwerise, please follow
- Set up heroku dyno on website or thru cli
- `heroku stack:set container` or set buildpack to container on heroku app

Now follow:
- `heroku git:remote -a <appname>` (to set heroku remote in your local repo)
- `heroku config:set ACCESS_TOKEN_SECRET=<secret here>`
- `heroku config:set REFRESH_TOKEN_SECRET=<secret here>`
- `heroku config:set JWT_ISSUER=<issuer name>`
- `heroku config:set CORS_ORIGIN=<value>` (Vercel link, domain name, etc. For now put `http://localhost:3000`)
- `heroku config:set MONGODB_URI=<mongodb uri>`
- `heroku config:set MONGODB_DATABASE=<mongodb database name>`
- `heroku config:set MAL_CLIENT_ID=<mal client id>`
- `heroku config:set MAL_CLIENT_SECRET=<mal client secret>`
- `heroku config:set MAL_LINK_REDIRECT=<mal redirect>` (Usually it is `https://yourvercelapp.vercel.app/mallink`)
- `heroku config:set MAL_LOGIN_REDIRECT=<mal login redirect>`(Usually it is `https://yourvercelapp.vercel.app/mallogin`)
- `git push heroku main`
## Push to vercel
In client package
- `yarn vercel` (follow instructions!)
- Inspect vercel app in `preview` stage. Then set environment variable `NEXT_PUBLIC_BASE_API_URL` with heroku backend url
- `yarn vercel --prod`
- Remember to set `CORS_ORIGIN` in Heroku to vercel app url.
- Remember to modify your MAL Redirects in heroku
## Pitfalls
- Make sure MAL redirect uris are included in yor MAL API app list of redirects
- Take care to not have trailing slash in URLs when settins `CORS` and `NEXT_PUBLIC_BASE_API_URL`
