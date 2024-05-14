
# Stock-List Web Application

Introducing Stock List Web Application, your go-to solution for effortlessly managing product availability, pricing, and creating organized records at your fingertips.




## How does it work?

This web application is designed to help you effectively manage your inventory by keeping track of the products you have in stock, their quantities, and associated costs. Additionally, it allows you to store this inventory data in a customizable google sheet form that you can create.

![stock-interface](https://github.com/HRZXD/stock-list-webapp/assets/98503935/b5151d23-6ad5-49f6-beb2-86092774ac6a)

## How to add script into google sheet

![First Step](https://github.com/HRZXD/stock-list-webapp/assets/98503935/75283ea5-1977-40a5-a7ae-b2a195a78505)
![Second Step ](https://github.com/HRZXD/stock-list-webapp/assets/98503935/41779008-7a1e-4fc0-aa4f-b308cd988116)
![Third Step](https://github.com/HRZXD/stock-list-webapp/assets/98503935/6ab7139c-fc91-4769-a8e4-2c058a4c9416)
![Last Step](https://github.com/HRZXD/stock-list-webapp/assets/98503935/82562d32-4685-4aa6-8fba-1161aba6fdfb)

Add your url in file(system.js)
And add your url google sheets embed in file(display.html)

## App Script

Add Script in App Script

```bash
var sheetName = 'put your name sheet that is at taskbar';
var scriptProp = PropertiesService.getScriptProperties();

function intialSetup () {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost (e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
    var sheet = doc.getSheetByName(sheetName);

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;

    var newRow = headers.map(function(header) {
      return header === 'timestamp' ? new Date() : e.parameter[header];
    });

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  finally {
    lock.releaseLock();
  }
}

```
    
## Thanks for use it :smile:

