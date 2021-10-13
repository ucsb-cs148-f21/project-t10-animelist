FROM openjdk:17-alpine as build
WORKDIR /app
COPY gradle gradle
COPY gradlew gradlew
COPY build.gradle .
COPY src src

RUN ./gradlew build -x test

FROM openjdk:17-alpine
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

COPY --from=build /app/build/libs/*.jar /app/app.jar
ENV PORT 8080
EXPOSE 8080
ENTRYPOINT ["java", "-Dserver.port=${PORT}", "-Dspring.profiles.active=production", "-jar", "/app/app.jar"]
