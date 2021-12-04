# Deploy
Follow instructions to dpeloy the animelist app. The backend will be hosted on Heroku and the frontend on Vercel.

# Prereqs
- [`node` and `npm` is installed](https://nodejs.org/en/download/)
- [`yarn` is installed](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
- [`heroku` cli is installed](https://devcenter.heroku.com/articles/heroku-cli#download-and-install)
- [`vercel` account](https://vercel.com)
- `git clone` repository or fork repository

# MongoDB setup
- Create Mongo database using MongoDB atlas service for free [here](https://www.mongodb.com/cloud/atlas/lp/try2?utm_content=rsatest101321_exp_rsaad&utm_source=google&utm_campaign=gs_americas_united_states_search_core_brand_atlas_desktop_rsaexp2&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=14931263937&adgroup=129255360958)
- Make sure `Network Access` for your MongoDB clusters has an allowed access entry for `0.0.0.0/0` which will allow `heroku` backend to connect to the database.
- [Find your mongo uri](https://docs.mongodb.com/manual/reference/connection-string/)
- Save your mongodb uri and your created database name since these will have to put into heroku config vars when deploying

# Heroku + Vercel deployment
Please `git clone` the repo. These commands are executed at the root of the
repository.
## Push server to Heroku
Using Heroku CLI.
- `heroku login -i` (Log in with your heroku account)
- `heroku create <your_heroku_app_name>` (Creates app)
- `heroku stack:set container` (Sets the app stack to `container`)
- `heroku git:remote -a <your_heroku_app_name>` (to set heroku remote in your local repo)

Setting heroku config vars
- `heroku config:set ACCESS_TOKEN_SECRET=<secret here>` (random string)
- `heroku config:set REFRESH_TOKEN_SECRET=<secret here>` (random string)
- `heroku config:set JWT_ISSUER=<issuer name>` (which is just a name)
- `heroku config:set CORS_ORIGIN=<value>` (Vercel link, domain name, etc. For now put `http://localhost:3000`)
- `heroku config:set MONGODB_URI=<mongodb uri>` (your mongo database uri)
- `heroku config:set MONGODB_DATABASE=<mongodb database name>` (your mongo database name) 
- `heroku config:set MAL_CLIENT_ID=<mal client id>` (myanimelist client id. You can put a random placeholder for now)
- `heroku config:set MAL_CLIENT_SECRET=<mal client secret>` (myanimelist secret. You can put a random placeholder for now)
- `heroku config:set MAL_LINK_REDIRECT=<mal redirect>` (Usually it is `https://yourvercelapp.vercel.app/mallink`. For now put a placeholder string)
- `heroku config:set MAL_LOGIN_REDIRECT=<mal login redirect>`(Usually it is `https://yourvercelapp.vercel.app/mallogin`. For now put a placeholder string)
- `git push heroku main` (deploy your repo to heroku using the CLI)

## Push to vercel
Please sign up for a vercel account at [vercel.com](https://vercel.com/`)

`cd` into the `client` directory:
- `yarn vercel` (follow CLI instructions and choose the defaults)
- The app will be dpeloyed in a preview stage. 
- Visit the newly created project on Vercel website.
- Go to Settings->Environment Variables
- Add environment variable `NEXT_PUBLIC_BASE_API_URL` with value being your heroku backend url. Make sure `Production` environment is checked for this variable.
- Go back to the CLI and run `yarn vercel --prod`
- The frontend should be running and you should have a `*.vercel.app` link for your frontend
- Remember to set `CORS_ORIGIN` in Heroku config vars to your vercel app url.
- Remember to modify your MAL Redirects in heroku if any
## Setting up MAL Oauth
To get MyAnimeList Oauth funtionality, you need to create a MyAnimeList app
[using these instructions.](https://myanimelist.net/blog.php?eid=835707) (Follow Step 0. only to simply register your app on MyAnimeList)

After, you should received a clientId and clientSecret in your app settings which you can update in your
Heroku config vars.
## Pitfalls
- Do not have trailing slash in URLs when settins `CORS` and `NEXT_PUBLIC_BASE_API_URL`
- Make sure MAL redirect uris are included in yor MAL API app list of redirects
