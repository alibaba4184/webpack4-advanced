const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const app = express()
const cors = require('cors')
app.use(cors())
// app.get('/api/getUserInfo', (req, res) => {
//     res.send({
//         name: '黑马儿',
//         age: 13
//     })
// });
app.get('/getUserInfo', (req, res) => {
    res.send({
        name: '黑马儿',
        age: 13
    })
});

app.listen(9999, () => {
    console.log('http://localhost:9999');
});

// const app = express();
// const compiler = webpack(config);

// app.use(webpackDevMiddleware(compiler, {
//     publicPath: '/'
// }));

// app.listen(3000, function () {
//     console.log('http://localhost:3000');
// });