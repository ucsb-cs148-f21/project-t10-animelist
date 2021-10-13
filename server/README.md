# backend
The frontend is Springboot with graphql api. Can be deployed to Heroku. Service is dockerized, ready for deployment.
# development
- Set environment variables specified in `application.properties`
- **Recommended**: make another properties profile from the `application.properties` file called `application-development.properties` and fill in
required properties
- `./gradlew bootRun`
- `./gradlew bootRun --args="--spring.profiles.active=development"` for `development` profile
# notes
- Building image `docker build --tag spring-react-nextjs-backend .`
- Running container `docker run -p 8080:8080 spring-react-nextjs-backend`