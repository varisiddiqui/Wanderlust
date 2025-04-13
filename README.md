**airbnb**

for image = get set usage

set  is a function
(val) => {}  //entered from frontend


When you use an anchor (<a>) tag in HTML, clicking on it automatically sends a GET request to the specified URL.


 If you use destructuring, the variable name must match the keys.

 **without using listing[]**
 {
  description: 'hello',
  image: 'kkk',
  price: '256',
  country: 'afgan',
  location: 'delhi'
}

**using listing[]**
{
  listing: {
    title: 'mehroli',
    description: 'sb2bg',
    image: 'jj',
    price: '1200',
    country: 'India',
    location: 'Delhi'
  }
}

**Note**
When you structure form inputs as -> listing[fieldname], the submitted data is grouped into a nested object inside req.body, rather than as separate key-value pairs.


The <%- body %> acts as a placeholder for the page's unique content, while the rest of the boilerplate (layout.ejs) remains the same for every page.

!important → This forces the rule to override any other conflicting styles, even if they have higher specificity.


# Form Validations

When we enter data in the form, the browser and/or the web server will check to see that the data is In the correct format and within the constraints set by the application.

# Note
When you enter "e", Mongoose thinks it's part of a valid number (like 1e3), so it waits for more digits.

If you enter "e" alone without any preceding number, Mongoose doesn't throw an immediate error, but it doesn’t store it as a valid number either.

# Joi
1. Joi (Request Validation - Pre-Database)
Purpose: Joi is used to validate incoming data (requests) before it reaches the database.

Where Used? Joi is typically used in the backend (Express.js, API validation) to ensure the request data follows a defined structure.

When Applied? Before data is even processed or inserted into the database.

How it Works? Joi checks whether the request object (e.g., req.body) meets the validation rules.

# schema validation
2. Mongoose Schema Validation (Database-Level)
Purpose: Mongoose schema validation ensures data inside the database follows predefined constraints.

Where Used? Used inside MongoDB models to enforce structure when storing data.

When Applied? When saving data into the database.

How it Works? If data does not meet the schema rules, Mongoose will reject the save operation.

# Why Doesn't Client-Side Validation Work in Hoppscotch/Postman?
Client-side validation only works inside a web browser because it relies on HTML attributes and JavaScript running in the browser. However, when you use Hoppscotch or Postman, you are directly sending an HTTP request to the server, bypassing the browser entirely.

# Direct HTTP Request – It directly sends a request to the server without checking whether the form data is valid.

# Even if the comment and rating are empty, the server still receives this request and processes it unless you have server-side validation.


# Mongo relationships

1. one to many=>

(i). one to few (like storing address)
Store the child document inside parent

like few addresses are stored inside user model only

before making model individually first imagine whether we can use it individually.


# Mongo $pull operator

The $pull operator removes from an existing array all instances of a value or values that match a specified condition.

# const router = express.Router();  creates new router object

This creates a new Router object using express.Router().

A router in Express works like a mini application that helps organize route handlers into separate files/modules.

It allows you to define multiple routes separately and then use them in the main app.

It behaves like a mini version of the app object, but it's only for grouping related routes.

# mergeParams
	Preserve the req.params values from the parent router. If the parent and the child have conflicting param names, the child’s value take precedence.

# Cookies
Web Cookies

HTTP cookies are small blocks of data created by a web server while a user is browsing a website and placed on the user's computer or other device by the user's web browser.

# res.cookie(name, value [, options])
Sets cookie name to value. The value parameter may be a string or object converted to JSON.

The options parameter is an object that can have the following properties.

# req.cookies = print unsigned cookies


# What is State?

Stateful Protocol:-
Stateful Protocol require server to save the status and session information.
eg - ftp

Stateless Protocol:-
Stateless Protocol does not require the server to retain the server information or
eg - http


stateful protocol => upi
stateless protocol => cash
session = transaction

# Express Sessions
An attempt to make our session stateful

express session will give small cookie in the form of session id to our browser, and information will be stored in temporary storage.

Create a session middleware with the given options.

Note Session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.

# secret
Required option

This is the secret used to sign the session ID cookie. 

it will be (connect.sid) i.e. session id for current session as a cookie ajaegi

request koi bhi ho browser ke andar ek sid ajaegi in the form of cookie.

# Amazon cart as an ex
In different browser it's considering diff. users so sid is different but in same tab it will be same

# resave
Forces the session to be saved back to the session store, even if the session was never modified during the request.

# saveUninitialized
Forces a session that is "uninitialized" to be saved to the store.

# Note
# resave: false
Meaning: Don't save the session back to the store if it wasn't modified during the request.
Why it's used: To avoid unnecessary writes to the session store if the session data hasn't changed.

Example:
A user visits your site, and the session is loaded.
If you don't change anything in req.session, then the session won't be saved again — which is more efficient.


# saveUninitialized: true
Meaning: Save a new session to the store, even if it's not modified.
When does it matter?: When a user first visits, and the session is new and empty.

Why it might be true:
Some tools (like login systems or analytics) may depend on the presence of a session cookie.
Useful if you want to track unauthenticated users or assign a session ID early.



# connect-flash
The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user.
Generally used in combination with redirects.

# res.locals
Use this property to set variables accessible in templates rendered with res.render. The variables set on res.locals are available within a single request-response cycle, and will not be shared between requests.

# Using Sessions

# Adding Cookie Options

const sessionOptions = {
    secret: "mysecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 3,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      httpOnly: true,
    },
};

# expiry date of cookie is not there by default, so it's present there as we have opened browser..
but if we set it then it will persist till then in browser.

# Authentication
Authentication is the process of verifying who someone is..

# Authorization
Authorization is the process of verifying what specific applications, files, and data a user has access to..

# Storing Passwords
We NEVER store the passwords as it is. We store their hashed form.

Server retrieves the stored hashed password from the database.

It then hashes the password you entered and compares it with the stored hash using a function like bcrypt.compare().

# Hashing
What we need to know?

For every input, there is a fixed output

They are one-way functions, we can't get input from output

For a different input, there is a different output but of same length

Small changes in input should bring large changes in output.

# Salting
Password salting is a technique to protect passwords stored in database by adding a string of 32 or more characters and then hashing them.

# Passport
Passport is express-compatible authentication middleware for Node.js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

# passport-local
Passport strategy for authenticating with a username and password.

# Passport-Local Mongoose
Passport-Local Mongoose is a Mongoose plugin that simplifies building username and password login with Passport.

adds username, hash, salt field by default

Configuring Strategy

passport.initialize()

A middleware that initializes passport.

passport.session()

A web application needs the ability to identify users as they browse from page to page. This series of requests and responses, each associated with the same user, is known as a session.


# Configuring Strategy=>
# passport.initialize()
A middleware that initializes passport.

# passport.session()
A web application needs the ability to identify users as they browse from page to page. This series of requests and responses, each associated with the same user, is known as a session.

# passport.use(new LocalStrategy( User.authenticate()))
It tells passport to use the Local Strategy for authentication (i.e., username & password login), and uses User.authenticate() as the logic to verify the user's credentials.

# static methods:-
# authenticate() Generates a function that is used in Passport's 

User logs in →
Passport uses **serializeUser()** to save the user’s ID in the session.

User makes another request →
Passport uses **deserializeUser()** to fetch the full user object from the DB using that ID.

**register(user, password, cb)** Convenience method to register a new user instance with a given password. Checks if username is unique. 

Authenticate Requests
Use passport.authenticate(), specifying the 'local' strategy, to authenticate requests.

# req.logout(callback) this will execute callback after logout.

# Note:
from req.user we can say whether we are logged in or not

# Log In
Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session.

req.login(user, function(err) {
  if (err) { return next(err); }
  return res.redirect('/users/' + req.user.username);
});

When the login operation completes, user will be assigned to req.user.

# Note: passport.authenticate() middleware invokes req.login() automatically. This function is primarily used when users sign up, during which req.login() can be invoked to automatically log in the newly registered user.

🧠 What does it do?
Gets credentials from the request (like username & password)

Calls your configured strategy (like LocalStrategy)

If successful:
Automatically calls req.login(user)
Creates a session with req.user
You can redirect or respond

If failure:
Redirect to login or show an error

# Note:
redirectUrl will be deleted,
It’s because Passport (via req.login()) regenerates the session after successful authentication by default — for security reasons.

Action	                          New Session?	    Explanation
First visit	                      ✅              	No session cookie yet → create new session
Next request (same browser)	      ❌              	Session ID exists → reuse existing session
Manual req.session.key = val     	❌              	Just modifies current session
After successful login	          ✅              	Old session is destroyed, new one created for safety
After logout                    	✅               (next time)	New session starts again after logout.


# router.route
combines the same path route


#Image Upload
1. Make form capable of sending files.
2. 3rd party service to store file(will provide url)
3. Save this link in mongo


# Multer 
Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.

NOTE: Multer will not process any form which is not multipart (multipart/form-data).

# .env
environmental var are in key-value pairs

# dotenv
integrates our env file with backend

#cloudinary


# form(file) -> backend(parse) -> cloud(store) -> URL/link(file)

# Note
This is a common Express gotcha! Always place more specific routes above the generic :id-based routes.

# Geocoding
Geocoding is the process of converting addresses (like a street address) into geographic coordinates (like latitude and longitude), which you can use to place markers on a map, or position the map.

# Note:
You can't directly read or use /public/js content in EJS because:

EJS runs on the server before anything gets to the browser.

JS files in /public are for the browser and run later.

You can pass values from EJS to client-side JS by defining global variables in <script> tags.