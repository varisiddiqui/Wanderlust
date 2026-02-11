# 🏠 WanderLust -- Airbnb Clone (Full Stack Web Application)

WanderLust is a production-style full-stack web application inspired by
Airbnb.\
The project demonstrates robust backend engineering practices including
authentication, authorization, session management, validation, file
uploads, geocoding, and secure data handling --- all structured using
clean architectural principles.

This project was built to deeply understand how scalable web
applications are designed and secured.

------------------------------------------------------------------------

# 🚀 Technical Overview

WanderLust is built using Node.js, Express.js, MongoDB, and EJS
(server-side rendering).\
It follows RESTful principles and implements layered validation, modular
routing, secure authentication, and cloud-based media storage.

The goal of this project was not just feature replication, but
understanding *why* architectural decisions matter in real-world
applications.

------------------------------------------------------------------------

# 🏗 Architecture & Design Principles

## MVC Pattern (Model-View-Controller)

The application follows a strict MVC structure:

-   **Models** → Database schemas and data logic (Mongoose)
-   **Views** → UI rendering using EJS templates
-   **Controllers** → Business logic and request handling

This separation ensures scalability, maintainability, and readability.

------------------------------------------------------------------------

## Modular Routing

Instead of a monolithic `app.js`, routes are separated using:

``` js
const router = express.Router();
```

Each major resource (Listings, Reviews, Users) has its own route file.

### Nested Routes & mergeParams

For routes such as:

    /listings/:id/reviews

`mergeParams: true` is used so child routers can access parent
parameters (like listing ID).

If parent and child parameters conflict, the child value takes
precedence.

------------------------------------------------------------------------

# 🔐 Authentication & Security

Security was implemented as a core system feature.

## Passport.js (Local Strategy)

Authentication is handled using:

-   passport
-   passport-local
-   passport-local-mongoose

### Configuration

``` js
passport.initialize()
passport.session()
passport.use(new LocalStrategy(User.authenticate()))
```

### Authentication Flow

1.  User logs in
2.  Passport serializes user ID into session
3.  On future requests, Passport deserializes user from database
4.  `req.user` becomes available

After successful login, Passport regenerates the session to prevent
session fixation attacks.

------------------------------------------------------------------------

## Password Security

Passwords are **never stored in plain text**.

Using `passport-local-mongoose`:

-   Hashing (one-way function)
-   Salting (random string added before hashing)

Properties of hashing:

-   Fixed length output
-   Small input change → large output difference
-   Irreversible

------------------------------------------------------------------------

## Authorization Middleware

Custom middleware protects sensitive routes:

-   `isLoggedIn`
-   `isOwner`
-   `isReviewAuthor`

Users cannot edit or delete resources they do not own.

------------------------------------------------------------------------

# 🍪 Sessions & Cookies

HTTP is stateless by default.\
Express sessions simulate stateful behavior.

## Session Configuration

``` js
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 3
  }
};
```

### Key Concepts

-   Session data is stored server-side.
-   Only session ID (`connect.sid`) is stored in the browser cookie.
-   `httpOnly` prevents JavaScript access (XSS protection).
-   `resave: false` avoids unnecessary session store writes.
-   `saveUninitialized: true` allows early session tracking.

### Session Lifecycle

  Action                 New Session Created?
  ---------------------- ----------------------
  First Visit            Yes
  Same Browser Request   No
  After Login            Yes
  After Logout           Yes

------------------------------------------------------------------------

## connect-flash

Flash messages are stored temporarily inside the session and cleared
after being displayed.

------------------------------------------------------------------------

## res.locals

Variables stored in `res.locals` are accessible in templates during a
single request-response cycle.

------------------------------------------------------------------------

# 🛡 Robust Data Validation

Validation is implemented at multiple layers.

## 1. Client-Side Validation

-   HTML5 validation attributes
-   Bootstrap validation scripts

⚠️ Can be bypassed using Postman or Hoppscotch.

------------------------------------------------------------------------

## 2. Server-Side Validation (Joi)

Joi validates incoming `req.body` before it reaches the database.

If schema validation fails: - Request is rejected - Standardized error
is returned

Prevents invalid or malicious data from entering the system.

------------------------------------------------------------------------

## 3. Mongoose Schema Validation

Database-level validation ensures data integrity during `.save()`
operations.

If constraints are violated, Mongoose rejects the operation.

### Important Note

Entering `"e"` in number fields may be interpreted as scientific
notation by Mongoose.

------------------------------------------------------------------------

# 🗄 Database Strategy (MongoDB)

## One-to-Many Relationships

Example:

-   A Listing has many Reviews

Implemented using referencing for scalability.

------------------------------------------------------------------------

## Cascading Deletes

Mongoose middleware ensures that when a Listing is deleted, all
associated Reviews are also removed --- preventing orphaned documents.

------------------------------------------------------------------------

## \$pull Operator

Used to remove specific elements from an array field without retrieving
the entire document.

------------------------------------------------------------------------

# ☁️ Image Upload System

Uploading images in a stateless backend requires third-party cloud
storage.

## Workflow

Form (`multipart/form-data`) → Multer (Parse file) → Cloudinary (Cloud
storage) → Store returned URL in MongoDB

## Multer

Processes only forms with:

    enctype="multipart/form-data"

Instead of storing image blobs in MongoDB, only secure URLs and
filenames are stored.

------------------------------------------------------------------------

# 🗺 Geocoding & Maps Integration

Location visualization is implemented using Mapbox.

## Geocoding

When a listing is created:

1.  Address string is sent to Mapbox Geocoding API
2.  API returns GeoJSON coordinates
3.  Coordinates are stored in MongoDB

## Map Rendering

Coordinates are injected into client-side Mapbox to display precise
location markers.

------------------------------------------------------------------------

# 📂 Forms & Request Handling

## GET Requests

Clicking an `<a>` tag automatically sends a GET request.

## Nested Form Data

Using:

    listing[fieldname]

Creates structured objects inside `req.body`.

------------------------------------------------------------------------

# 🎨 Templating & Frontend

-   EJS Layout System (`<%- body %>` placeholder)
-   Bootstrap for responsive UI
-   Custom CSS (`!important` overrides conflicting rules)

Public JS files execute in the browser, not during EJS server rendering.

------------------------------------------------------------------------

# 🌍 Environment Variables

Environment variables are stored inside `.env` file.

Managed using `dotenv`.

Example:

    CLOUD_NAME=your_cloud_name
    CLOUD_API_KEY=your_api_key
    CLOUD_API_SECRET=your_api_secret
    MAPBOX_TOKEN=your_mapbox_token
    ATLASDB_URL=your_mongo_url
    SECRET=your_session_secret

------------------------------------------------------------------------

# 🛠 Tech Stack

Frontend: - HTML5 - CSS3 - Bootstrap - EJS

Backend: - Node.js - Express.js - RESTful Routing

Database: - MongoDB - Mongoose

Authentication: - Passport.js - passport-local - passport-local-mongoose

Validation: - Joi

Cloud Services: - Cloudinary - Mapbox

------------------------------------------------------------------------

# 🏁 Installation & Setup

Clone the repository:

``` bash
git clone https://github.com/yourusername/wanderlust.git
```

Install dependencies:

``` bash
npm install
```

Create a `.env` file and configure environment variables.

Run the application:

``` bash
node app.js
```

------------------------------------------------------------------------

# 📌 Important Implementation Notes

-   Specific routes must be defined above generic `:id` routes.
-   Client-side validation is never trusted alone.
-   Session ID regenerates after login/logout.
-   Hashing is one-way and irreversible.
-   Child routers can access parent parameters using `mergeParams`.
-   Flash messages persist for one request cycle only.
-   Geocoding converts addresses to coordinates.

------------------------------------------------------------------------

# 📄 License

This project was built for educational purposes to master full-stack web
development concepts and backend architecture design.
