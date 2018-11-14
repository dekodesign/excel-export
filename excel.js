Excel = {};
Excel.lib = Npm.require('xlsx');

Excel.getColumns = function(fields, data) {
  var rows = [];

  _.each(data, function(item) {
    var row = [];
    _.each(fields, function(field, index) {
      var value = searchObject(item, field.key) || null;
      value = _.isFunction(field.transform) ? field.transform(value, item) : value;
      row[index] = value ? value : ''
    });
    rows.push(row);
  });

  return rows;
};


Excel.export = function(title, fields, data) {
  check(title, String);
  check(fields, [{
    key: String,
    title: String,
    transform: Match.Optional(Function)
  }]);
  check(data, [Match.Any]);

  var rows = this.getColumns(fields, data);
  var header_row = fields.map(function(field) {
    return field.title
  });

  excel.rows = [ cols ];
  excel.rows = excel.rows.concat(rows);

  Excel.ws = Excel.lib.utils.aoa_to_sheet(excel.rows);
  Excel.wb = Excel.lib.utils.book_new();
  Excel.lib.utils.book_append_sheet(Excel.wb, Excel.ws, title);

  return Excel.lib.write(Excel.wb,{ type: 'buffer' });
}
