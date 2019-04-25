
# SLP Therapy Tracker
The SLP Therapy Tracker is a tool that simplifies data tracking for Speech and Language Pathologists
(SLPs). It is a React-based progressive web app with a Ruby on Rails backend designed to be used on
a tablet.

This project is a part of GVSU's Web Architectures class. The project specifications are available
[here](https://cis.gvsu.edu/~kurmasz/Teaching/Courses/W19/CIS658/project.html).


## The App

### Background
SLPs record detailed information during therapy sessions. A single therapy session could include
multiple clients each working on a number of separate goals. A client's performance towards each
goal is tracked by marking each trial as 'correct,' 'incorrect,' or 'cued.' It is tedious to
record, transfer, and perform statistics on this data when taken by hand. This app will simplify
data recording and automate data transfer and statistics.

### Design
The heart of the app is the service view. This view will have 'correct,' 'incorrect,' and 'cued'
buttons for 1-4 clients in a given session. Instead of writing it down, the SLP will record data by
pressing the appropriate button for each trial. At the end of the session, the SLP
will press the 'submit' button to mark the session complete.

At the end of the day, the SLP can access all the sessions' data from their computer. From
there they can access statistics from each session.


## HIPAA
In order to avoid
[HIPAA](https://www.dhcs.ca.gov/formsandpubs/laws/hipaa/Pages/1.00WhatisHIPAA.aspx) entanglement,
personally identifiable information is explicitly designed out of the app. This includes time-series
and any information that can be correlated in order to arrive at client identities.

The app database only stores the following data:
- SLP service provider information
- Location names
- Session times and dates
- Anonymous student IDs for each session
- Anonymous goals for each student
- Anonymous attempt data for each goal


## Technical Details
As this project is for a class, it was specifically designed to fulfill the following technical
requirements.
- The project will use a PostgreSQL database -- see Ruby on Rails backend
  [here](https://github.com/kkredit/slp-therapy-tracker-backend). The backend uses PostreSQL.
- Bootstrap will be used for portable formatting -- using Bootstrap `4.3.1/yeti`.
- At least one UI feature will use AJAX -- `axios` AJAX calls are used to get data from the backend.
- Database data will be exposed via a RESTful web service -- the Rails
  [backend](https://github.com/kkredit/slp-therapy-tracker-backend) exposes resources in JSON
  through RESTful APIs.
- The app will include unit- and end-to-end tests -- Minitest is used for unit tests in Rails
  backend; Jest is used for end-to-end tests in the React frontend.
- There will be no dangling or unimplemented forms, links, or fields -- the app is complete!
- The app will be deployed to Heroku -- the frontend deployed [here](https://slptt.herokuapp.com/);
  the backend (nothing to see) is deployed [here](https://slpttb.herokuapp.com/).
