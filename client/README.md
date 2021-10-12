# frontend
The frontend is React on nextjs. Can be deployed to vercel. Service is dockerized, ready for deployment.
# development
- change `.env.EXAMPLE` to `.env.local`. Change any values necessary
- run `yarn dev`
- To run graphql generations, the backend server must be running to fetch the schemas. Then
run `yarn gen`
# deployment
- create `.env.production`
- set environment variables
- deploy (using Docker or whatever)
# notes
- Building image `docker build --tag express-react-nextjs-frontend .`
- Running container `docker run -p 3000:3000 express-react-nextjs-frontend`