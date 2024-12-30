// Global variables
var yourSpreadsheetID = '13z3zFAGaJrpjMcWUyuV8kRAV4nJhazhH924ncIIQnK4'  // ID of course gradebook
var yourFolderID = '1sT8QwhXZLrkdX6KpgDmQXwfdFY1WDEZo'  // ID of folder containing participant spreadsheets
var yourTargetRange = 'A1:G20'  // Range of gradebook cells you want visible to course participants 
var courseCodeSemYear = 'PHYS152 S25'  // Sheet name visible only to course participants (this is the format that I would like to see on my end)

// Prompt for input of unaltered CSV of course participant emails
var emailsIn = prompt('CSV of participant emails\npaste CSV: ') 
var participantNames = []  // Processed from the CSV below in the form ['Last.First', 'Ford.Jonathan']
var participantEmails = []  // Processed from the CSV below in the form ['first.last##@houghton.edu', 'jonathan.ford28@houghton.edu']

// Split the input CSV into an array
var emailsSplit = emailsIn.split(',')

emailsSplit.forEach(participant => {
  // Remove whitespace and '@houghton.edu' (if necessary)
  participant = participant.replace(/\s+/g, '').replace('@houghton.edu', '')

  // Append emails with correct formatting of 'first.last##'
  participantEmails.push(`${participant}@houghton.edu`)

  // Rearrange names to (probably) desired formatting 'Last.First'
  var nameSplit = participant.split('.')  // Split 'first.last##' at '.'
  var nameFirst = nameSplit[0]  // Grab first: before '.'
  var nameLast = nameSplit[1].slice(0, -2)  // Grab last: after '.', before the two numbers

  var name = '${nameLast}.${nameFirst}'
  participantNames.push(name)
});


// Function manager enabling a forEach loop
function copySheetsRenamed () {
  if (participantEmails.length != participantNames.length) {
    Logger.log('A length discrepancy has occured: Please verify the validity of the names and emails of the particpants.') 
  }
  participantNames.forEach(copySheet)  // Function(item, index#, array)
}

// Copy sheets w/in master gradebook
// Create external spreadsheet if DNE
// Format sheet w/in external spreadsheet
function copySheet (participant, participantIndex) { 
  /* Format participant variables */
  participantName = participantNames[participantIndex]  // As Last.First
  participantEmail = participantEmails[participantIndex]  // As first.last##@houghton.edu


  /* Copy sheets w/in master gradebook */
  // Locate source and destination
  var source = SpreadsheetApp.getActiveSheet()
  var sourceName = source.getSheetName()
  var destination = SpreadsheetApp.openById(yourSpreadsheetID)

  // Copy to new sheet
  source.copyTo(destination)

  // Rename to respective participant name
  destination.getSheetByName('Copy of '+sourceName).setName(participantName)

  // Overwrite all formulas that the copyTo preserved (you probably don't want this)
  // var sValues = source.getDataRange().getValues()
  // destinationSheet.getRange(1,1,sValues.length,sValues[0].length).setValues(sValues)  


  /* Create new participant file or append to existing participant file */
  // Locate target folder 
  var folder = DriveApp.getFolderById(yourFolderID)
  
  // Check if external spreadsheet DNE
  if (!folder.getFilesByName(participantName).hasNext()) {  // If participant sheet DNE w/in folder
    // New spreadsheet metadata
    var resource = {
      title: participantName,
      mimeType: MimeType.GOOGLE_SHEETS,
      parents: [{ id: yourFolderID }]
    }

    // Create new spreadsheet
    var fileJson = Drive.Files.insert(resource)

    // Get new external spreasheet ID
    var ssFileID = fileJson.id
    Logger.log('File created: '+ssFileID)

    // Update permissions -- https://developers.google.com/apps-script/reference/drive/file#addViewer(String)
    DriveApp.getFileById(ssFileID).addViewer(participantEmail)

  } else {  // file was found
    // Get external spreadsheet ID
    var files = folder.getFilesByName(participantName)
    while (files.hasNext()) {
      var ssFileID = files.next().getId()
      Logger.log('File appended: '+ ssFileID)
      break
    }
  }


  /* Format sheet w/in external spreadsheet */
  // Locate source and destination
  var source = SpreadsheetApp.getActiveSheet()
  var sourceName = source.getSheetName()
  var sValues = source.getDataRange().getValues()
  var destination = SpreadsheetApp.openById(ssFileID)

  // Copy to new sheet
  source.copyTo(destination)

  // Rename to respective course code
  destination.getSheetByName('Copy of '+sourceName).setName(courseCodeSemYear)

  // Delete Sheet1 if it exists
  try {destination.deleteSheet(destination.getSheetByName('Sheet1'))} 
  catch {}
    
  // Clear the values, keep the formatting
  var freshDestination = destination.getSheetByName(courseCodeSemYear)
  
  freshDestination.getRange(1,1,sValues.length,sValues[0].length)  // (startRow, startCol, valueLength, valueHeight)
    .clearContent()  // Clears values

  // Add 'importrange' link to A1
  importRangeFormula = '=importrange("'+yourSpreadsheetID+'", "'+participantName+'!'+yourTargetRange+'")'
  freshDestination.getRange(1,1,1,1)  // (startRow, startCol, valueLength, valueHeight)
    .setValue(importRangeFormula)  // Pastes importrange formula
}
