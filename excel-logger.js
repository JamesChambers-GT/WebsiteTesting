const fs = require('fs');
const XLSX = require('xlsx');

const filePath = './chat-log.xlsx';

// Create file if it doesn't exist
function initWorkbook() {
  if (!fs.existsSync(filePath)) {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([['Timestamp', 'User ID', 'Message']]);
    XLSX.utils.book_append_sheet(wb, ws, 'Chat');
    XLSX.writeFile(wb, filePath);
  }
}

// Append a chat row
function logChat(userId, message) {
  initWorkbook();

  const wb = XLSX.readFile(filePath);
  const ws = wb.Sheets['Chat'];

  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
  data.push([new Date().toISOString(), userId, message]);

  const newWs = XLSX.utils.aoa_to_sheet(data);
  wb.Sheets['Chat'] = newWs;

  XLSX.writeFile(wb, filePath);
}

module.exports = { logChat };
