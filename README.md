# Gradebook Automations
## 1. Introduction
This repository holds a a script that can automate the creation of gradebooks using Apps Script by Google. The script is designed to efficiently communicate course progress to students participating in a course that uses mastery based grading.

## 2. Overview – Functionality of Script
### Input/Requirements
- A spreadsheet containing a course gradebook template – used to monitor participant progress 
- A Google Drive folder that holds individual gradebooks for participants of all courses
- A CSV of course participant emails

### Output/Results
- Duplicated sheets/tabs from course gradebook template for each course participant
- Unique spreadsheets/files for each course participant with maintained formatting from source gradebook (even checkboxes!)
  - Files are automatically shared with respective course participant
  - Multiple courses are contained in seperate sheets/tabs w/in each participant's unique spreadsheet/file

## 3. How to Run Locally
1. Create a spreadsheet/file with a sheet/tab formatted to a course's gradebook template
2. Create a Google Drive folder that will hold participant gradebooks from all courses
3. Within the master gradebook spreadsheet/file, open its respective Apps Script file under `Extensions>Apps Script`
4. Paste code from `script1.gs` into the `Untitled Project`
5. Tailor the `Global Variables` to a specific course
6. 
