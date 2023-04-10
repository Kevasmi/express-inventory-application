# express-inventory-application

## Intro

This express inventory application is a project that allowed me to test my skills with server creation, route creation, authorization implementation, database management, and my ability to work with MVC approach to application creation.

The particular back-end stack for the is object is Node, Express, and MongoDB. The view engine is PUG. A variety of modules such as dotenv, passport, mongoose, and others were used as various middleware/encryption tools. Much of the project also incorporates Bootstrap for styling.

The app itself is a inventory management application for a Lego resell website. It keeps track of the inventory, allowing admins to create, delete, update, or view items in inventory. There are also normal users who can only view the items on offer.

## MVC

### Models

The product, product instance, theme, and user are the four object models of the database.

Here is an ERD that displays the model attributes and relationships:
![Brick Barn ERD](https://user-images.githubusercontent.com/96889143/229981236-353eec0e-92f2-4421-95d6-470914587aa8.png)

The user object is used in authentication and allowing access to admin privileges for certain users. However, as there is no system currently in place for placing actual orders of items, the user object currently has no shared relationships with any of the other models. 

### Views

There are a multitude of views used in the project. However, they follow a specific pattern that relates them to the route and CRUD action performed on them. 

So for every model object, excluding the user object, there is a detail view (GET), delete view (DELETE), update view (UPDATE), and creation view (POST). 

The user object is associated with the sign_up_form (POST) and log_in (GET) views.

**Sign-Up Form**
![Inv_Mngt_Sign_Up_Page](https://user-images.githubusercontent.com/96889143/230823097-c8b12686-a57f-46d0-9fda-662a599bef8e.png)

**Log-In Page**
![Inv_Mngt_Sign_Up_Page](https://user-images.githubusercontent.com/96889143/230823247-7a5889df-f13e-409c-9086-e7e8ab43e3b5.png)


The rest of the views are used for various main pages or headers. The layout view is responsible for the persistent header on every view using the PUG extends functionality. The index acts as the homepage of the project, displaying products in a card grid.

Snippet of view naming schema:

![Inventory Views Snippet](https://user-images.githubusercontent.com/96889143/229982410-d96ba621-a3a2-47a7-80a0-fab85e534426.png)

### Controllers
