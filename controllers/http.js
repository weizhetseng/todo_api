const headers = require('../headers')

const http = {
  cors({ req, res }) {
    res.writeHead(200, headers)
    res.end()
  },
  notFound({ req, res }) {
    res.writeHead(404, headers)
    res.write(
      JSON.stringify({
        status: 'false',
        message: '連線錯誤',
      })
    )
    res.end()
  },
}

module.exports = http