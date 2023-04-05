# express-inventory-application

# Application

This express inventory application is a project that allowed me to test my skills with server creation, route creation, authorization implementation, database management, and my ability to work on MVC project.

The particular back-end stack for the is object is Node, Express, and MongoDB. The view engine is PUG. A variety of modules such as dotenv, passport, mongoose, and others were used as various middleware/encryption tools.

The app itself is a inventory management application for a Lego resell website. It keeps track of the inventory, allowing admins to create, delete, update, or view items in inventory. There are also normal users who can only view the items on offer.

## Models

The product, product instance, theme, and user are the four object models of the database.

Here is an ERD to display model attributes and relationships:
![Brick Barn ERD](https://user-images.githubusercontent.com/96889143/229981236-353eec0e-92f2-4421-95d6-470914587aa8.png)

There is also a user object used in authentication and allowing access to admin privileges for certain users. However, as there is no system currently in place for placing actual orders of items, the user object currently has no shared relationships with any of the other models. 

