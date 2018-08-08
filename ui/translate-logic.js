var fs = require('fs');
var trans_dir = "./translation_tables/";

exports.translate = function(input, prog_lang, from_lang, to_lang ='en') {
	translation_filename = trans_dir + prog_lang + "_" + from_lang + "_" + to_lang;
	if(exists(translation_filename)){
		return translate_using(translation_filename, input); // input has keys, look up values.
	}
	else {
		console.log("No translation table for " + translation_filename);
		return "";
	}
};

function print_dict(d) {
	console.log("Print dict...");
	for (var key in d) 
		console.log("dict[" + key + "] = " + d[key]);
}

function translate_using(translation_filepath, input) {
	var lines = input.split('\n');
	var dict = read_file_into_dict(translation_filepath);
	var output_lines = [];
	lines.forEach(l => 
		{
			var words =	l.split(" ");
			var output_line = [];
			for(var word_idx in words){
				var word = words[word_idx];
				var tr_word = word;
				if(dict.hasOwnProperty(word))
					tr_word = dict[word];
				console.log("Translated " + word + " to: " + tr_word);
				output_line.push(tr_word);
			}
			output_lines.push(output_line.join(" "));
		}
	)
	return output_lines.join("\n");
}

function read_file_into_dict(infile_path){
	  var dict = {};
	  console.log("Loading translation file " + infile_path);
	  var buf = fs.readFileSync(infile_path, 'utf8');
	  console.log("file contents read: " + buf);
	  var lines = buf.split('\n');
      for(var line = 0; line < lines.length; line++){
	    var kv = lines[line].split("\t");
	    console.log("one line read: " + kv[0] + " => " + kv[1]);
	    if(kv.length == 2)
		  dict[kv[0]] = kv[1];
	  }
	  console.log("Loaded into dict ");
	  print_dict(dict);
	  return dict;
}

function exists(url)
{		
		var answer = Boolean('false');
		
		fs.stat(url, function(err, stat) {
		if(err == null) 
			answer = Boolean('true');		
		});
		
		return answer;
}