
# SLP Therapy Tracker
The SLP Therapy Tracker is a tool that simplifies data tracking for Speech and Language Pathologists
(SLPs). It is a Ruby on Rails-based progressive web app designed to be used on a phone or tablet.

This project is a part of GVSU's Web Architectures class. The project specifications are available
[here](https://cis.gvsu.edu/~kurmasz/Teaching/Courses/W19/CIS658/project.html).


## The App

### Background
SLPs have to record detailed information during each therapy session, which may include multiple
patients. One detailed class of information is (TBD GET TERM). TBD is always either 'correct',
'cueing', or 'incorrect'. It is tedious to record, transfer, and perform statistics on this data.
This app will simply data recording and automate data transfer and statistics.

### Design
The heart of the app is the service view. This view will have 'correct', 'cueing', and 'incorrect'
buttons for 1-4 patients in a given session. During the session, the SLP will record data by
pressing these buttons. The app will give simple feedback during the session: when the minimum
number of (TDB TERM)s has been met, and (TBD OTHER FEATURES). At the end of the session, the SLP
presses the 'finished' button and the session is marked complete.

At the end of the day, the SLP can access all the day's sessions' data from their computer. From
here they can access statistics and export the data to a local file.


## HIPPA
In order to avoid
[HIPPA](https://www.dhcs.ca.gov/formsandpubs/laws/hipaa/Pages/1.00WhatisHIPAA.aspx) entanglement,
personally identifiable information is explicitly designed out of the app. This includes time-series
and any information that can be correlated in order to arrive at patient identities.

The app database _only_ stores the following data:
- TBD
- TBD


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
