var http = require('http');
var tr = require('./translate-logic');
var py = require('./python-interpretation');
// var jd = require('./jdoodle-call');


http.createServer(function (req, res) {
	// FIXME load the html page at start.
    res.writeHead(200, {'Content-Type': 'text/html'});
	var input  = 'प्रत्येक_को क की सीमा (10) : \n छापो ( "... " + लड़ी ( क ) )' ;
	var code_lang = "python3";

	// FIXME using axios fetch .params from browser.
    var translation = tr.translate(input, code_lang, 'hi', 'en');
    //     var jd_result = jd.execute_script_sync(translation, code_lang);
    console.log("\n\n=========================\nInput\n=========================\n" + input);
    console.log("\n\n=========================\nTranslation\n=========================\n" + translation); 
    py.execute_code_sync(translation, function(results){
    	console.log("\n\n=========================\nResult\n=========================\n" + results);
    	res.write(results, function(err) { res.end(); });
    });
}).listen(8080);
