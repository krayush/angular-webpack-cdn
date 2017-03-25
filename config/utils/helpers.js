var path = require('path');
var rootDirectory = path.resolve(__dirname, '../../');
const event = process.env.npm_lifecycle_event || '';

module.exports = {
    getAbsolutePath: path.join.bind(path, rootDirectory),
    hasProcessFlag: function(flag) {
        return process.argv.join('').indexOf(flag) > -1;
    },
    hasNpmFlag: function(flag) {
        return event.includes(flag);
    },
    isWebpackDevServer: function() {
        return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
    },
    replaceAll: function (str, find, replace) {
        return str.replace(new RegExp(find, 'g'), replace);
    }
};