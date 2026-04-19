// ============================================================
// USTADJI — Google Apps Script
// Yeh code Google Sheet ke Apps Script mein paste karna hai
// ============================================================
//
// SETUP GUIDE:
// 1. Apni Google Sheet kholein
// 2. Extensions > Apps Script click karein
// 3. Yeh poora code paste karein (purana code delete kar ke)
// 4. Save (Ctrl+S) karein
// 5. Deploy > New Deployment click karein
// 6. Type: Web App choose karein
// 7. Execute as: Me
// 8. Who has access: Anyone
// 9. Deploy click karein
// 10. URL copy karein aur index.html mein SHEET_URL ki jagah paste karein
// ============================================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === 'signup') {
      handleSignup(ss, data);
    } else if (data.type === 'watch') {
      handleWatch(ss, data);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', msg: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleSignup(ss, data) {
  let sheet = ss.getSheetByName('Users');
  if (!sheet) {
    sheet = ss.insertSheet('Users');
    // Header row
    sheet.getRange(1, 1, 1, 6).setValues([[
      'Naam', 'Phone', 'Email', 'Signup Date', 'City', 'Platform'
    ]]);
    // Style header
    sheet.getRange(1, 1, 1, 6)
      .setBackground('#E22929')
      .setFontColor('#FFFFFF')
      .setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  // Check if email already exists
  const emails = sheet.getRange(2, 3, sheet.getLastRow(), 1).getValues().flat();
  if (emails.includes(data.email)) return; // Duplicate nahi add karna

  sheet.appendRow([
    data.name || '',
    data.phone || '',
    data.email || '',
    new Date(data.date).toLocaleString('en-PK'),
    data.city || '',
    'UstadJi PWA'
  ]);

  // Auto-resize columns
  sheet.autoResizeColumns(1, 6);
}

function handleWatch(ss, data) {
  let sheet = ss.getSheetByName('Activity');
  if (!sheet) {
    sheet = ss.insertSheet('Activity');
    sheet.getRange(1, 1, 1, 5).setValues([[
      'Naam', 'Email', 'Course ID', 'Course Title', 'Date'
    ]]);
    sheet.getRange(1, 1, 1, 5)
      .setBackground('#1A1A1A')
      .setFontColor('#FFFFFF')
      .setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    data.name || '',
    data.email || '',
    data.courseId || '',
    data.courseTitle || '',
    new Date(data.date).toLocaleString('en-PK')
  ]);
}

// Test karne ke liye — Script editor mein run karein
function testSetup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  handleSignup(ss, {
    name: 'Test User',
    phone: '03001234567',
    email: 'test@test.com',
    date: new Date().toISOString(),
    city: 'Karachi'
  });
  Logger.log('Setup theek hai!');
}
