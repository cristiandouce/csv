
# csv

  Create CSV from data and offers a download DataURI as a `.csv` file. In the near future it will try to comply with [RFC4180](http://tools.ietf.org/html/rfc4180). Right now it just simply takes an array of data and converts to `csv` string.
  
## Installation

    $ component install cristiandouce/csv

## API

### csv(data, options)
  Creates a CSV instance. Takes an Array as parameter expecting the first row to be the headers descriptors. Right now this method won't check the fidelity of data; it will just compile and offer a download DataURI as a `.csv` file.
  Options:
  * encoding: charset for DataUri. Defaults to `utf-8`.
  * separator: csv separator character. Defaults to `,`.
  * quote: csv quote character. Defaults to `"`.
  * escape: csv escape character. Defaults to `"`.

````javascript
  var csv = require('csv');
  var scoreboard = csv(data, options);
````

### .set(v)
  Sets current data to `v`.

````javascript
  var scoreboard = csv([], options);
  scoreboard.set(data);
  scoreboard.download(); // outputs data as csv DataURI
  scoreboard.set(newData);
  scoreboard.download(); // outputs newData as csv DataURI
````

### .get()
  Get current data.

````javascript
  var scoreboard = csv(data, options);
  scoreboard.get() == data // true;
````

### .csv()
  Get csv converted data.

````javascript
  var scoreboard = csv(data, options);
  scoreboard.csv()  // "age","name","points" CRLF
                    // "23","Cristian","123" CRLF
                    // ...

### .csv(v)
  Set csv string to `v`

````javascript
  var scoreboard = csv([]);
  scoreboard.csv(csvString);
  scoreboard.csv() === csvString; // true
  scoreboard.download() // outputs csvString as csv DataURI
````

### .download()
  Provides a DataUri format string.

````javascript
  var scoreboard = csv(data, options);
  scoreboard.download() // "data:text/csv;charset=utf-8,..."
````

## TODO
  * Implement a `.parse` method from csv string to array.
  * Implement a `.json` method to output data like the following:
  ````javascript
    {
      data: [
        { age: 23, name: "Cristian", points: 145 },
        { age: 27, name: "Mono", points: 708 },
        //...
      ]
    }
  ````

## License

  MIT
