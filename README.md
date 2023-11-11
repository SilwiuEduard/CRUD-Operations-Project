# PetStore Angular project with CRUD operations

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Project Infos ✍️

1. Listing Animals (individual page)

a) Filter by status (available, pending, sold);

b) Table header should consist of: Index (starting from 1), Name, Status, Actions;

c) In the "Actions" column, there should be buttons for viewing, editing, and deleting an element;

2. Adding (individual page)

a) There should be validation for mandatory fields (name, status, and an ID of type number);

b) Dropdown options for status are: available, pending, sold. The default status should be "available";

c) After submitting the form, display a success and error notification;

d) In case of success, after adding, redirect to the list of animals;

3. Editing (individual page)

a) There should be validation for mandatory fields;

b) After submitting the form, display a success and error notification;

c) In case of success, after editing, redirect to the list of animals.

4. Viewing (individual page)

a) Display available information, even if it's minimal.

b) In case certain information is missing, display a placeholder or a message like "This element has no categories, tags, images, etc."

5. Deletion

a) There should be a modal/pop-up for confirming the deletion;

b) Display a success and error notification;

c) Automatically update the list after deleting an element;
