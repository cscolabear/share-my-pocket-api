const app = require('./index')

app.listen(3456, (err) => {
    if (err) throw err
    console.log('Server running in http://127.0.0.1:3456')
})