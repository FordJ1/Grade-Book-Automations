# Gradebook Automations
## I. Introduction
This repository holds a a script that can automate the creation of gradebooks using Apps Script by Google. The script is designed to efficiently communicate course progress to students participating in a course that uses mastery based grading.

## II. Overview – Functionality of Script
### Input/Requirements
- A spreadsheet containing a course gradebook template – used to monitor participant progress 
- A Google Drive folder that holds individual gradebooks for participants of all courses
- A CSV of course participant emails

### Output/Results
- Duplicated sheets/tabs from course gradebook template for each course participant
- Unique spreadsheets/files for each course participant with maintained formatting from source gradebook (even checkboxes!)
  - Files are automatically shared with respective course participant
  - Multiple courses are contained in seperate sheets/tabs w/in each participant's unique spreadsheet/file

## III. How to Run Locally
### 1. Create a Google Drive folder that will hold participant gradebooks from all courses
<img width="929" alt="image" src="https://github.com/user-attachments/assets/baf9d5de-7571-403b-a756-c840a2a7a033" />

### 2. Create a spreadsheet/file with a sheet/tab formatted to a course's gradebook template
<img width="929" alt="image" src="https://github.com/user-attachments/assets/b6514dc3-3b7c-4532-a35b-c63f8a51714d" />

### 3. Within the master gradebook spreadsheet/file, open its respective Apps Script file under `Extensions>Apps Script`
<img width="929" alt="image" src="https://github.com/user-attachments/assets/0ed810d4-8ffc-4aa6-8de9-51f5dc6a1dbd" />

### 4. Paste code from `script1.gs` into the `Untitled Project` and save
<img width="929" alt="image" src="https://github.com/user-attachments/assets/4f09f78b-b667-48e5-a7d7-a9a055872fc4" />

### 5. Tailor the `Global Variables` to a specific course
<img width="929" alt="image" src="https://github.com/user-attachments/assets/5d3221f7-7608-4cc5-afab-ee2e8bc46741" />

### 6. Run the script
<img width="929" alt="image" src="https://github.com/user-attachments/assets/66093ce2-a579-48ab-8e9e-667954797cfe" />

### 7. Allow access to the master gradebook for each participant
<img width="929" alt="image" src="https://github.com/user-attachments/assets/4b0e2c16-fa59-4b8f-9ade-7e1dd64ef34f" />

#### Class successfully deployed
<img width="620" alt="image" src="https://github.com/user-attachments/assets/36127902-8f59-4c07-828d-1443f509fdb5" />

### 8. Repeat steps 1-7 for any other class
<img width="929" alt="image" src="https://github.com/user-attachments/assets/22d00ca3-a8d1-44a0-aef4-cc53c8020660" />


