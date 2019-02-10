
# SLP Therapy Tracker
The SLP Therapy Tracker is a tool that simplifies data tracking for Speech and Language Pathologists
(SLPs). It is a Ruby on Rails-based progressive web app designed to be used on a phone or tablet.

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
will press the 'finished' button to mark the session complete.

At the end of the day, the SLP can access all the sessions' data from their computer. From
there they can access statistics and export the data to a local file.


## HIPAA
In order to avoid
[HIPAA](https://www.dhcs.ca.gov/formsandpubs/laws/hipaa/Pages/1.00WhatisHIPAA.aspx) entanglement,
personally identifiable information is explicitly designed out of the app. This includes time-series
and any information that can be correlated in order to arrive at client identities.

The app database _only_ stores the following data:
- Session IDs
- Anonymous client IDs for each session
- Client data for each session


## Technical Details
As this project is for a class, it will minimally have the following technical features. How and for
what purpose each one is implemented is yet to be determined.
- The project will use a PostgreSQL database
- Bootstrap will be used for portable formatting
- At least one UI feature will use AJAX
- Database data will be exposed via a RESTful web service
- The app will include unit- and end-to-end tests
- There will be no dangling or unimplemented forms, links, or fields
- The app will be deployed to Heroku
