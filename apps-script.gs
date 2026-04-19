// ============================================================
// USTADJI — Google Apps Script (UPDATED)
// GET request se kaam karta hai — no-cors ke saath compatible
// ============================================================
//
// SETUP:
// 1. Google Sheet > Extensions > Apps Script
// 2. Purana code delete karein, yeh paste karein
// 3. Save (Ctrl+S)
// 4. Deploy > New Deployment
//    - Type: Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Deploy > URL copy karein
// 6. index.html mein:  const SHEET_URL = 'APNA_URL_YAHAN';
//
// IMPORTANT: Har baar code change karne ke baad
// Deploy > Manage Deployments > Edit > New Version > Deploy
// ============================================================

function doGet(e) {
  try {
    const params = e.parameter;
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (params.type === 'signup') {
      handleSignup(ss, params);
    } else if (params.type === 'watch') {
      handleWatch(ss, params);
    }

    return ContentService
      .createTextOutput('ok')
      .setMimeType(ContentService.MimeType.TEXT);

  } catch(err) {
    return ContentService
      .createTextOutput('error: ' + err.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

function doPost(e) {
  return doGet(e);
}

function handleSignup(ss, data) {
  let sheet = ss.getSheetByName('Users');

  if (!sheet) {
    sheet = ss.insertSheet('Users');
    sheet.getRange(1,1,1,5).setValues([['Naam','Phone','Email','Signup Date','Platform']]);
    sheet.getRange(1,1,1,5).setBackground('#E22929').setFontColor('#FFFFFF').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const emails = sheet.getRange(2, 3, lastRow - 1, 1).getValues().flat();
    if (emails.includes(data.email)) return;
  }

  sheet.appendRow([
    data.name  || '',
    data.phone || '',
    data.email || '',
    new Date().toLocaleString('en-PK', {timeZone: 'Asia/Karachi'}),
    'UstadJi PWA'
  ]);
  sheet.autoResizeColumns(1, 5);
}

function handleWatch(ss, data) {
  let sheet = ss.getSheetByName('Activity');

  if (!sheet) {
    sheet = ss.insertSheet('Activity');
    sheet.getRange(1,1,1,4).setValues([['Naam','Email','Course','Date']]);
    sheet.getRange(1,1,1,4).setBackground('#2A2A2A').setFontColor('#FFFFFF').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    data.name        || '',
    data.email       || '',
    data.courseTitle || '',
    new Date().toLocaleString('en-PK', {timeZone: 'Asia/Karachi'})
  ]);
}

function testSignup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  handleSignup(ss, { name:'Test User', phone:'03001234567', email:'test@ustadji.com' });
  Logger.log('Test signup done!');
}
