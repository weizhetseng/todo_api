const http = require('http')

const postController = require('./controllers/posts')
const httpController = require('./controllers/http')
require('./connections')

const app = async (req, res) => {
  let stream = []
  let size = 0

  req.on('data', (chunk) => {
    stream.push(chunk)
    size += chunk.length
  })

  if (req.url === '/API/getTodo' && req.method === 'GET') {
    postController.getPosts({ req, res })
  } else if (req.url === '/API/postTodo' && req.method === 'POST') {
    req.on('end', async () => {
      postController.addPosts({ stream, size, req, res })
    })
  } else if (req.url === '/API/deleteAllTodo' && req.method === 'DELETE') {
    postController.deleteAll({ req, res })
  } else if (req.url === '/API/deleteTodo' && req.method === 'DELETE') {
    req.on('end', async () => {
      postController.deletePosts({ stream, size, req, res })
    })
  } else if (req.url === '/API/PatchTodo' && req.method === 'PATCH') {
    req.on('end', async () => {
      postController.patchPosts({ stream, size, req, res })
    })
  } else if (req.method === 'OPTIONS') {
    httpController.cors({ req, res })
  } else {
    httpController.notFound({ req, res })
  }
}

const server = http.createServer(app)
server.listen(process.env.PORT || 3000)
