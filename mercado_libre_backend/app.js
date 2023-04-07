const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./routes')

const PORT = process.env.PORT || 5000

app.use(cors({
  origin : true
 
}))
app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.use('/api', router)
app.listen(PORT, function () {
  console.log('Server listening on port ' + PORT)
})
