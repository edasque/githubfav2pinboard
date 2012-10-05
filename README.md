githubfav2pinboard
==================

I like starring projects in github but I wanted to have those bookmarks in pb which allows me to put more context around my watching of those projects with tags & the like.

So I wrote this, it's likely it'll need some elbow grease to get it working for everyone. I am not pretending it's great, super well written or would work for anyone else but me, so beware. There isn't much exception handling but it can be added easily.

You will need a recent version of node.js installed as well as the xml2json module if I recall correctly. This retrieves up to 100 starred projects.

## TO-DO

* paginate to retrieve more than 100 starred project
* use the node-github library which might eliminate the requirement for generating a token
* add a tag for 'watching' if user is watching a project. This might require one additional github API call per project
* surface replace as a configurable option


How-to
------

### Setting up your configuration file

1. copy gitfav-config.json.example to gitfav-config.json
2. edit gitfav-config.json to set your pinboard username & login as well as your github username

### Running the application

```bash
node gitfav2pinboard.js
```

Nota Bene
---------

I have included [node-pinboard](https://github.com/frozzare/node-pinboard) in this app because 'npm install pinboard' wasn't working for me on Mac OS X 10.8.2.