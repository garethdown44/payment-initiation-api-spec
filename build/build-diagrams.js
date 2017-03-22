var wsd = require('websequencediagrams');
var fs = require('fs');
wsd.diagram("Alice->Bob: message", "modern-blue", "png", function(er, buf, typ) {
    if (er) {
        console.error(er);
    } else {
        console.log("Received MIME type:", typ);
        fs.writeFile("my.png", buf);
    }
});
