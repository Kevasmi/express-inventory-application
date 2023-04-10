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
![Inv_Mngt_Log_In](https://user-images.githubusercontent.com/96889143/230823281-3f1f1a62-cf54-4346-b3d5-45d72af92d67.png)


The rest of the views are used for various main pages or headers. The layout view is responsible for the persistent header on every view using the PUG extends functionality. The index acts as the homepage of the project, displaying products in a card grid.

Snippet of view naming schema:

![Inventory Views Snippet](https://user-images.githubusercontent.com/96889143/229982410-d96ba621-a3a2-47a7-80a0-fab85e534426.png)

### Controllers

The controllers managed all of the routes for the website. 

Each route first fetches the necessary data from the database using **mongoose** before moving on with any other necessary operations, dependent upon what CRUD operation was being fulfilled.

For routes with multiple asynchronous database operations needed, I used the **async** module's **parrallel** function.

Each route used guard clauses to make sure mongoose was finding valid data, otherwise it would call upon the error handler and return a 404 status. 

**GET**

On GET routes, if no errors, it chooses to appropriate view and renders the page with the valid fetched data.

![Int_Mngt_GET_Example](https://user-images.githubusercontent.com/96889143/230824972-b3c973f6-4052-42fc-bdd5-b904bf7616a1.png)


**POST**

On POST routes, it firsts validates and sanitizes the data entered in the fields. 

![Int_Mngt_POST_Sanitize_Example](https://user-images.githubusercontent.com/96889143/230825053-5bfa6e36-2573-4028-976b-378d18d0542a.png)


If any errors are found, it puts the results into a new variable. 

It creates a new object based off the model with the entered data and checks against whether the error variable empty or not. If not, it will re-render the form page with the previously entered data and appropriate error messages (to be added).

![Inv_Mngt_POST_Example](https://user-images.githubusercontent.com/96889143/230824630-f29bb6f1-9169-4259-a369-991e68c8a0a4.png)


If no errors are found, it will save the new item into the database and redirect to the detail or category overview page.

![Int_Mngt_POST_Redirect_Example](https://user-images.githubusercontent.com/96889143/230824745-98a53a27-93a2-45b2-a56b-27ffc6c9cb60.png)

**UPDATE**
