# Anime List Design Doc

## 1. Preamble

This document will provide an overview of the system architecture for our application.

Although this document is formatted as Markdown, it contains diagrams that will not be rendered by GitHub. So we will maintain a PDF copy of this document [here.](https://github.com/ucsb-cs148-f21/project-t10-animelist/blob/main/docs/DESIGN.pdf)

## 2. Background

Our application provides a platform for anime viewers who are interested in maintaining a collection of the series they've watched and are currently watching. Some of the basic features for this type of application include adding entries to a list, setting a status (e.g. plan to watch, currently watching, watched) for each one, and adding a rating for each one.

There are already some capable sites that fulfill this purpose, such as MyAnimeList (MAL) and Anilist. We plan to differentiate ourselves from these existing offerings by catering to a "power-user" group of users that would benefit from a greater degree of customizability. Before apps like MyAnimeList, using a spreadsheet was a common solution for this use case, which required significant manual work but allowed complete customization to the user's needs. We aim to have our app closer to spreadsheets on the customization spectrum, without sacrificing much convenience.

## 3. UX Considerations

As briefly mentioned above, our 

## 4. High-Level Architecture

```mermaid
flowchart LR
  subgraph Frontend
    nextjs[Next.js]
    react[React]
    nextjs-->react
  end
  subgraph Backend
    mongo[MongoDB ]
    spring[Spring Boot]
    spring<-->mongo
  end
  react<-- GraphQL -->spring
```

The above diagram shows a high-level diagram of our system architecture.

Our backend consists of two parts: a database for persistence and the main server that handles requests.

For our database, we use MongoDB Atlas. This provides us with a flexible NoSQL database where we can store documents in a JSON format. One primary benefit of this is the ability to model our data within the database in a form that closely matches the way we model the received data in the frontend. Rather than having JSON-shaped data on the frontend and tabular data in the backend, both of them can share a similar structure.

For the main backend server, we use the Spring Boot framework for Java. This allows us to hook into the robust Java ecosystem, giving us libraries to interact with the MongoDB database as well as handle GraphQL requests, which will be discussed a few paragraphs down. In our production deployment, we host this backend server on Heroku.

Our frontend also consists of two parts: the Next.js server that serves the frontend files, and the actual frontend files themselves.

The Next.js server is somewhat of a black box since the implementation is part of the Next.js framework. However, it is still a distinct module in our system architecture, so we will discuss it here. This server is responsible for responding to the client's browser requests and serving the appropriate React frontend files. For example, when the user navigates to `/` the server will respond with the frontend files corresponding to the index page. In our production deployment, this server is hosted on Vercel.

Second, the frontend files that actually run in the user's browser are implemented using React. These files make up the "client" portion of our application, and are responsible for communicating with the backend and displaying the UI of our app.

Finally, as previously mentioned, we use GraphQL to communicate between the frontend and backend! GraphQL is an API specification that acts as an alternative to traditional REST APIs. Rather than making a request to a REST endpoint and receiving data back with a shape determined by the endpoint, GraphQL allows us to traverse a graph of data and specify exactly what objects and fields we want to retrieve. It also allows us to get all of the data we need in a single request, rather than having to make multiple requests to retrieve all of the necessary data. This is because the data is represented as nodes and fields, where the fields can themselves be nodes.

## 5. Design Process Documentation
