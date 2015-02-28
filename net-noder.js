var arguments = require('yargs').argv;
var netnoder = parseCommandLineData(arguments.netnoder);


function parseCommandLineData(json) {
    return JSON.parse(json.split('<netnoderdq>').join('"').split('<netnodersq>').join("'"));
}

module.exports = function (expressApp) {
    var bodyParser = require('body-parser');

    // parse application/json
    app.use(bodyParser.json());

    // Set routes for ping and kill
    expressApp.post('/netnoderping', function(req, res) {
        res.writeHead(200, {
            'Content-Type': 'text'
        });
        res.end('1');
    }).post('/netnoderkill', function(req, res) {
        //If password matches, kill the process and resp
        if (req.body.pw === netnoder.killPassword) {
            res.writeHead(200, {
                'Content-Type': 'text'
            });
            res.end('Accepted');
            process.exit(0);
            return;
        }
        // Wrong password provided, respond with generic message
        res.writeHead(500, {
            'Content-Type': 'text'
        });
        res.end('Posts not allowed');
    });

    netnoder.listen = function() {
        var args = Array.prototype.slice.call(arguments);
        // Insert host and port at the beginning of the arguments
        args.unshift(netnoder.location.port,netnoder.location.host);

        // Start server
        expressApp.listen.apply(expressApp,args);
    };
    return netnoder;
};

