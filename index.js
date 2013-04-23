/**
 * Module dependencies.
 */

var object = require('object');

/**
 * Expose `CSV` constructor.
 */

module.exports = CSV;

/**
 * Defaults.
 */

var defaults = {
  encoding: 'utf-8',
  separator: ',',
  quote: '"',
  escape: '"',
  comment: '',
  columnNames: [],
  columnsFromHeader: false,
  nestedQuotes: false
}

/**
 * Creates a CSV instance. Takes an Array as parameter expecting
 * the first row to be the headers descriptors. Right now method
 * won't check the fidelity of data; it will just compile and
 * offer a download DataURI as a `.csv` file.
 *
 * @param {Array} data Array of Arrays with data sorted by columns.
 * @param {Object} options allowing to alter row and column separators.
 *     - encoding {String} defaults to `utf-8`.
 *     - separator {String} defaults to ','.
 *     - quote {String} defautls to `"`.
 *     - escape {String} defaults to `"`.
 *     - comment {String} defaults to ``.
 *     - columnNames {Array} defaults to `[]`.
 *     - columnsFromHeader {Boolean} defaults to false
 *     - nestedQuotes {Boolean}
 * @return {CSV} `CSV` instance
 * @api public
 */

function CSV (data, options) {
  if (!(this instanceof CSV)) {
    return new CSV(data, options);
  }

  this.data = data;

  this.options = object.merge({}, defaults);
  this.options = object.merge(this.options, options || {});
}

/**
 * Sets current `CSV` data to `v`
 *
 * @param {Array} v CSV data to be converted
 * @return {CSV} `CSV` instance
 * @api public
 */

CSV.prototype.set = function(v) {
  this.clean();
  this.data = v;
  return this;
}

/**
 * Get current `CSV` data or `undefined`
 *
 * @return {Array} current CSV data
 * @api public
 */

CSV.prototype.get = function() {
  return this.data;
}

/**
 * Get current parsed `_csv` or set it to `v`
 *
 * @param {String} v `csv` string to parse
 * @return {CSV|String} [description]
 * @api public
 */

CSV.prototype.csv = function(v) {
  if (!arguments.length) {
    if (!this._csv) {
      this.convert();
    }
    return this._csv;
  };

  this.clean();
  this._csv = v;
  return this;
}

/**
 * Provides a DataUri format string.
 *   - Usage:
 *       var scoreboard = csv(data, options);
 *       scoreboard.download() // "data:text/csv;charset=utf-8,..."
 *
 * @return {String} DataUri `.csv` MIME-Type string description
 * @api public
 */

CSV.prototype.download = function() {
  this.file = "data:text/csv;charset=$charset,".replace('$charset', this.options.encoding) + encodeURIComponent(this.csv());

  return this.file;
}

/**
 * Converts the received data into a string and
 * saves string into internal property `csv`
 *
 * @return {CSV} `CSV` instance.
 * @api private
 */

CSV.prototype.convert = function() {
  // Clear string before a new conversion
  this._csv = '';

  for (var i = 0, l = this.data.length, row=this.data[i]; i < l; ++i, row = this.data[i]) {
    var out = [];
    for (var j = 0, m = row.length, cel = row[j]; j < m; ++j, cel = row[j]) {

      if (j !== 0) {
        out.push(this.options.separator);
      }

      out.push(this.options.quote);
      out.push(this.safe(cel));
      out.push(this.options.quote);

    }

    out.push('\r\n');
    this._csv += out.join('');
  }

  return this;
}

/**
 * Parse `_csv` to return Array of data
 *
 * @return {Array} Array of data parsed from `_csv`
 * @api private
 */

CSV.prototype.parse = function() {
  // TODO
}

/**
 * Returns a safe string after escaping quoutes or scape chars.
 *
 * @param {Mixed} cel Cel value
 * @return {String} cel value converted to `String` and properly escaped.
 * @api private
 */

CSV.prototype.safe = function(cel) {
  var out = [];
  cel += '';

  for (var i = 0, ch = cel.charAt(i); i < cel.length; ++i, ch = cel.charAt(i)) {
    if (ch === this.options.quote || ch === this.options.escape) {
        out.push(this.options.quote);
    }
    out.push(ch);
  }

  return out.join('');
}

/**
 * Reset CSV instance data.
 *
 * @return {CSV} `CSV` instance.
 * @api private
 */

CSV.prototype.clean = function() {
  this.file = '';
  this.csv('');
  this.data = [];

  return this;
}
