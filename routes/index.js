const postController = require('../controllers/posts')
const httpController = require('../controllers/http')

const routes = async (req, res) => {
  const { url, method } = req
  let stream = []
  let size = 0

  req.on('data', (chunk) => {
    stream.push(chunk)
    size += chunk.length
  })

  if (url === '/API/getTodo' && method === 'GET') {
    postController.getPosts({ req, res })
  } else if (url === '/API/postTodo' && method === 'POST') {
    req.on('end', async () => {
      postController.addPosts({ stream, size, req, res })
    })
  } else if (url === '/API/deleteAllTodo' && method === 'DELETE') {
    postController.deleteAll({ req, res })
  } else if (url === '/API/deleteDoneTodo' && method === 'DELETE') {
    postController.deleteDone({ req, res })
  } else if (url.startsWith('/API/deleteTodo/') && method === 'DELETE') {
    postController.deletePosts({ req, res })
  } else if (url === '/API/PatchTodo' && method === 'PATCH') {
    req.on('end', async () => {
      postController.patchPosts({ stream, size, req, res })
    })
  } else if (method === 'OPTIONS') {
    httpController.cors({ req, res })
  } else {
    httpController.notFound({ req, res })
  }
}

module.exports = routes
