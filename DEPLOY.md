# Deploy
Follow instructions to dpeloy the animelist app. The backend will be hosted on Heroku and the frontend on Vercel.

# Prereqs
- `node` and `npm` is installed
- `yarn` is installed
- `heroku` cli is installed (RECOMMENDED)

# MongoDB setup
- Create Mongo database using MongoDB atlas service for free. [here](https://www.mongodb.com/cloud/atlas/lp/try2?utm_content=rsatest101321_exp_rsaad&utm_source=google&utm_campaign=gs_americas_united_states_search_core_brand_atlas_desktop_rsaexp2&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=14931263937&adgroup=129255360958)
- Make sure `Network Access` for your MongoDB clusters has an allowed access entry for `0.0.0.0/0` which will allow `heroku` backend to connect to the database.
- Your mongodb uri will follow this format:

```
mongodb+srv://admin:<password>@cs148-t10-animelist-clu.xx4xk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

where `admin` is your admin username (by default it is `admin`), `<password>` is your admin user password, and `myFirstDatabase` is your database name.
- Save your mongodb uri and database since these will have to put into heroku config vars when deploying

# Heroku + Vercel deployment
## Push server to Heroku
Using Heroku CLI or Heroku website.

The following is steps for invoking the `setup` portion of heroku.yml
- `heroku update beta`
- `heroku plugins:install @heroku-cli/plugin-manifest` (if not already installed)
- `heroku create <your-app-name> --manifest`

Otherwise, please follow
- Set up heroku dyno on website or thru cli
- `heroku stack:set container` or set buildpack to container on heroku app

Now follow for `heroku` CLI:
- `heroku git:remote -a <your_heroku_app_name>` (to set heroku remote in your local repo)
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
- `git push heroku main`
## Push to vercel
In `client` directory
- `yarn vercel` (follow CLI instructions and choose the defaults)
- Inspect vercel app in `preview` stage. Then set environment variable `NEXT_PUBLIC_BASE_API_URL` with heroku backend url
- `yarn vercel --prod`
- Remember to set `CORS_ORIGIN` in Heroku config vars to the vercel app url.
- Remember to modify your MAL Redirects in heroku if any
## Pitfalls
- Take care to not have trailing slash in URLs when settins `CORS` and `NEXT_PUBLIC_BASE_API_URL`
- Make sure MAL redirect uris are included in yor MAL API app list of redirects