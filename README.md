gitfav2pinboard
===============

I like starring projects in github but I wanted to have those bookmarks in pb which allows me to put more context around my watching of those projects with tags & the like.

So I wrote this, it's likely it'll need some elbow grease to get it working for everyone. I am not pretending it's great, super well written or would work for anyone else but me, so beware. There isn't much exception handling but it can be added easily.

You will need a recent version of node.js installed as well as the xml2json module if I recall correctly.

How-to
------

### Getting an OAuth token for GitHub

OAuth is easy to implement for web applications but GitHub provides a good way to add a non web app to your account. It's done with a curl, command-line:

```bash
curl https://api.github.com/authorizations --user "myuser" --data '{"scopes":["user"],"note":"GitHub Stars to Bookmarks"}'
```

which will ask you for your password and return a JSON document which will contain your token. People feel free to contribute additional code which will do that in node.js, it's not very difficult.

You can check that this process went well by hitting: https://api.github.com/user/watched?access_token=YOUR_TOKEN_HERE

### Setting up your configuration file

1. copy gitfav-config.json.example to gitfav-config.json
2. edit gitfav-config.json to set your pinboard username & login as well as your github OAuth token

### Running the application

```bash
node gitfav2pinboard.js
```

### Nota Bene

I have included a modified copy of [node-pinboard](https://github.com/frozzare/node-pinboard) in this app. The better way to do this would have been to fork it but I don't know Git & GitHub well enough to do that in a good way yet. Room for contributors to do the right thing here. Also, 'npm install pinboard' wasn't working for me on Mac OS X 10.8.2. 

The reasons why it's modified is that it seems that Pinboard's API is weird in that for the add operation it will respond in JSON when things went well but in XML when things fail (for example when you run the app multiple times and it tries to overwrite the bookmarks but and replace is set to no).

I set replace to 'no' in my code because I want to be able to edit the pinboard bookmarks without them being overwriten. Collaborators, feel free to submit code that will check if the bookmark already exists and not attempt to overwrite.