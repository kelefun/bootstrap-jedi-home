const path = require('path');
module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        open: false,
        host: '0.0.0.0', // 0.0.0.0 localhost
        port: 8088,
    }
}