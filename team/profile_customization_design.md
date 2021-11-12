# Profile Customization System

## 1. Introduction

One of the key design principles for our AnimeList project is to allow the user as much personalization and control over their anime list experience as possible. However, we should also ensure that this customization does not compromise the ease of use of the application, and we should avoid forcing users to opt-in to this customization. That is, users should be able to have an intuitive app experience without needing to spend a significant amount of time customizing their profile.

With these principles in mind, this design document will describe a proposed system for implementing a profile customization system. Currently, the user's profile page is essentially a placeholder left over from the first implementation of our project. It only displays some internal information about the logged-in user.

We want the profile page to be the user's personal space, a customizable page that they can use to showcase their list(s) and other information about themselves. This design document will describe a way to make the page (1) display useful information and (2) provide customization capabilities for the user.

## 2. Blocks

The core of the profile system is the **block**. A block represents a single, customizable unit that the user can place on their profile page. Users will compose multiple blocks to form the structure of their profile page.

Each block has a **type** and a **size** parameter. For the first version, the only size will be "full". In a future version, we could support both full-size and half-size blocks. The size would determine the width of the block on the page, taking up either a full row or half a row. The height of each row will be fixed for simplicity, but it could be adjusted in a future implementation as a second size parameter.

Furthermore, each block will store additional metadata to determine what exactly it displays, which depends on the block type.

The block types will be chosen from a list as follows:

### 2.1. Block Type - User List

This block type will display the contents of a user list. The user should be able to pick from their existing user lists, and choose one to be associated with the block. They should also be able to choose an optional limit on the number of entries to display.

The limit on number of entries can simply be implemented in a naive way by taking a slice of the user list in question before passing it to the `UserList` display component. With a proper implementation, this would be replaced by passing a query argument to the GraphQL backend in order to avoid fetching unnecessary data. But for an extended MVP (which is what our final project essentially is), the former method should be fine.

Metadata for this block type:

* ID of the associated user list

* Entry display limit

### 2.2. Block Type - Text Box

This block type will simply display an arbitrary text field inputted by the user.

Metadata for this block type:

* Text value

### 2.3. Block Type - Statistics

This block type will display various statistics about the user's profile, such as animes watched, episodes watched, and average rating.

To support this, we should create a new GraphQL query that allows querying various statistics for the given user.

For simplicity, the initial implementation can have fixed statistics displayed, but future implementations could allow customizing the display order of the statistics themselves, as well as which ones are displayed.

Metadata for this block typcde (initial implementation):

* None

### 2.4. Block Type - Spacer

This block type will simply take up space to allow more flexible arrangement of the other blocks. It has no metadata.

## 3. Profile Page

As previously mentioned, the user's entire profile page will consist of a series of blocks. These blocks will be arranged in **rows**. The profile page is made up of a list of rows. In turn, each row is made up of a list of blocks. The blocks within a row should fill an entire row width, i.e. a row must contain a single full-width block or two half-width blocks.

### 3.1. Displaying Profile Page

To display the user's completed profile page, we will perform a `User` query, which will be extended to include a `profilePage` field that contains a list of rows, which in turn contains a list of blocks. Using GraphQL, we can directly query the blocks for the data required to display them, which will be detailed in the Data Structures section below.

The rows and blocks will then naturally map to React components to allow us to display the user's profile page.

### 3.2. Editing Profile Page

To allow editing the profile page, we need to support several distinct actions. Each following section will describe how we can implement one of those actions.

#### 3.2.1. Adding a New Block

To add a new block, we should have a 

#### 3.2.2. Removing a Block

To remove a block, we will remove the corresponding block in the local array representation of the profile page. If removing the block leaves us with an empty row

#### 3.2.3. Rearranging Blocks

## 4. Data Structures
