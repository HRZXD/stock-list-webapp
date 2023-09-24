
# Stock-List Web Application

Introducing Stock List Web Application, your go-to solution for effortlessly managing product availability, pricing, and creating organized records at your fingertips.




## How does it work?

This web application is designed to help you effectively manage your inventory by keeping track of the products you have in stock, their quantities, and associated costs. Additionally, it allows you to store this inventory data in a customizable google sheet form that you can create.


![App Screenshot](https://cdn.pic.in.th/file/picinth/In-Web-1.png)


## How to add script into google sheet

![App Screenshot](https://cdn.pic.in.th/file/picinth/-136ff3362137c5396.png)

![App Screenshot](https://cdn.pic.in.th/file/picinth/-2c3d15e479b027ed5.png)

![App Screenshot](https://cdn.pic.in.th/file/picinth/8f292cbb132ae9f739ca676ee3673569.png)

![App Screenshot](https://cdn.pic.in.th/file/picinth/-4b2dbe554e26d31b1.png)

Add your url in file(system.js)
![App Screenshot](https://cdn.pic.in.th/file/picinth/-53293cb04c9917200.png)

And add your url google sheets embed in file(display.html)
![App Screenshot](https://cdn.pic.in.th/file/picinth/-625d3e4fd3cd98566.png)


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

