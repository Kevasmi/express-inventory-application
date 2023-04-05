# express-inventory-application

## Intro

This express inventory application is a project that allowed me to test my skills with server creation, route creation, authorization implementation, database management, and my ability to work on MVC projects.

The particular back-end stack for the is object is Node, Express, and MongoDB. The view engine is PUG. A variety of modules such as dotenv, passport, mongoose, and others were used as various middleware/encryption tools. Much of the project also incorporates Bootstrap for styling.

The app itself is a inventory management application for a Lego resell website. It keeps track of the inventory, allowing admins to create, delete, update, or view items in inventory. There are also normal users who can only view the items on offer.

## Models

The product, product instance, theme, and user are the four object models of the database.

Here is an ERD that displays the model attributes and relationships:
![Brick Barn ERD](https://user-images.githubusercontent.com/96889143/229981236-353eec0e-92f2-4421-95d6-470914587aa8.png)

The user object is used in authentication and allowing access to admin privileges for certain users. However, as there is no system currently in place for placing actual orders of items, the user object currently has no shared relationships with any of the other models. 

## Views

There are a multitude of views used in the project. However, they follow a specific pattern that relates them to the route and CRUD action performed on them. 

So for ever model object, excluding the user object, there is a detail view (GET), delete view (DELETE), update view (UPDATE), and creation view (POST). 

The user object is associated with the sign_up_form (POST) and log_in (GET) views.

The rest of the views are used for various main pages or headers. The layout view is responsible for the persistent header on every view using the PUG extends functionality. The index acts as the homepage of the project, displaying products in a card grid.

## Controllers
