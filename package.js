Package.describe({
  name: 'dekodesign:excel-export',
  summary: 'Export data to excel via SheetJS XLSX. Based on nicolaslopezj:excel-export',
  version: '1.1.0',
  git: 'https://github.com/dekodesign/excel-export'
});

Npm.depends({
  'xlsx': '0.14.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use(['underscore'], 'server');
  api.addFiles(['lib.js', 'excel.js'], 'server');

  api.export('Excel', 'server');
});
