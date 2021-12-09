# project-t10-animelist
Project-t10-animelist (Real Name TBA) will allow anime fans to rate and display their favorite shows and mangas however they want it.

# Project Plan and User Roles
The anime list's user base encompasses any and all anime fans looking to track and rate their favorite anime and manga in a list, available for display. This general user base can be divided into three main groups: private users, public users, and admins. Users will not only be able to personalize their own anime list display and customize their scoring system, but they will also have the ability to set their accounts to private or public. Private users likely will only use the app to keep a generic log of the anime they have watched, plan to watch, dropped, are currently watching, as well the score they assign them. Public users will likely use these same features but will tap more into the customizability functionality (i.e. profile page or anime list display, customized ranking system, etc), as well as implement social media sharing functionality or create public reviews. Lastly, admins will have the capability to expand the data set of anime and/or manga from which users can look up if that action is required.

# Team members
- Christopher Barnett (christopherbarnett)
- Alberto Huang (AHuangHe)
- Rowan Tran (rowantran)
- Justin Vo (jvoucsb)
- Hardy Xu (zihaoxu20010109)

# Tech Stack:
As a group, we have decided to utilize React Next.js for the frontend, Spring Boot with GraphQL for the backend, and MongoDB for the database program.

# Repository Structure
* `client` - This directory holds the code for our Next.js frontend. Within it you will find the following structure:
  * ` __tests__` - Frontend tests
  * `public` - Static files that will be served at the root directory of the hosted site (used for images)
  * `src` - Main source code for the frontend
* `server` - This directory holds the code for our Spring Boot backend. You will find the following subdirectory structure within:
  * `src/main` - Main source code.
  * `src/test` - Unit tests.

# Deployment
[Deployed on Vercel here.](https://cs148-t10-animelist.vercel.app/)

[Deploy doc](https://github.com/ucsb-cs148-f21/project-t10-animelist/blob/main/docs/DEPLOY.md)
