
var pinboard = require('node-pinboard');
var request = require('request');

var fs = require('fs');

try {
  var gitfav_config_file = fs.readFileSync('./gitfav-config.json', "ascii");
  var gitfav_config = JSON.parse(gitfav_config_file);

}
catch(e) {
  console.log('Unable to locate the gitfav-config.json file.  Please copy and ammend the example_gitfav-config.json as appropriate');
  process.reallyExit();
}

console.log("Configuration parameters:")
console.dir(gitfav_config);

if (!((gitfav_config.pb_username)&&(gitfav_config.pb_password)&&(gitfav_config.github_username)))
{
  console.log("This application requires the gitfav-config.json config file that defines pb_username, pb_password & github_token")
  process.reallyExit();
}

pinboard.config({
    username: gitfav_config.pb_username,
    password: gitfav_config.pb_password,
    format: 'json' // or 'xml', default is 'json'. 
});

var myGitHUBfavs = "https://api.github.com/users/"+gitfav_config.github_username+"/starred?per_page=100"

    request(myGitHUBfavs, function (error, response, body) {
      if (!error && response.statusCode == 200) { 
        var favs = JSON.parse(body);

        console.log("There are "+favs.length+" favorites");

        for (index in favs){

                    var options = {}


                    options.description = favs[index].name;
                    options.url =  favs[index].html_url;
                    options.extended = favs[index].description;

                    // the project language, if specified, will be used for a tag

                    var language = favs[index].language;

                    // if the project is a fork of another project, 'fork' will be used as a tag
                    var bfork = favs[index].fork;

                    options.tags = "github starred";
                    options.tags += (language)?" "+language:"";
                    options.tags += (bfork)?" fork":"";

                    options.replace = "no";


                    
                                          console.log("\nAdding bookmark:");
                                          console.dir(options);
                                          pinboard.add(options, function(err,data) { });


        }
      }
    });

