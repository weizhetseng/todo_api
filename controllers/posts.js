const Todo = require('../model')
const headers = require('../service/headers')

const posts = {
  async getPosts({ req, res }) {
    try {
      const todos = await Todo.find({})
      res.writeHead(200, headers)
      res.write(
        JSON.stringify({
          status: 'success',
          message: '成功',
          data: todos,
        })
      )
      res.end()
    } catch (error) {
      res.writeHead(400, headers)
      res.write(
        JSON.stringify({
          status: 'false',
          message: '失敗',
        })
      )
      res.end()
    }
  },

  async addPosts({ stream, size, req, res }) {
    try {
      const body = JSON.parse(Buffer.concat(stream, size).toString())
      if (typeof body.title === 'string' && body.title !== undefined && body.title !== '') {
        await Todo.create({
          title: body.title,
          status: false,
        })
        const todos = await Todo.find({})
        res.writeHead(200, headers)
        res.write(
          JSON.stringify({
            status: 'success',
            message: '成功',
            data: todos,
          })
        )
        res.end()
      } else {
        res.writeHead(400, headers)
        res.write(
          JSON.stringify({
            status: 'false',
            message: '失敗',
          })
        )
        res.end()
      }
    } catch (error) {
      res.writeHead(400, headers)
      res.write(
        JSON.stringify({
          status: 'false',
          message: '失敗',
        })
      )
      res.end()
    }
  },

  async deleteAll({ req, res }) {
    try {
      await Todo.deleteMany({})
      const todos = await Todo.find({})
      res.writeHead(200, headers)
      res.write(
        JSON.stringify({
          status: 'success',
          message: '成功',
          data: todos,
        })
      )
      res.end()
    } catch (error) {
      res.writeHead(400, headers)
      res.write(
        JSON.stringify({
          status: 'false',
          message: '失敗',
        })
      )
      res.end()
    }
  },

  async deleteDone({ req, res }) {
    try {
      await Todo.deleteMany({ status: true })
      const todos = await Todo.find({})
      res.writeHead(200, headers)
      res.write(
        JSON.stringify({
          status: 'success',
          message: '成功',
          data: todos,
        })
      )
      res.end()
    } catch (error) {
      res.writeHead(400, headers)
      res.write(
        JSON.stringify({
          status: 'false',
          message: '失敗',
        })
      )
      res.end()
    }
  },

  async deletePosts({ req, res }) {
    try {
      const body = req.url.split('/').pop()
      const id = await Todo.findById(body)
      if (id !== null) {
        await Todo.findByIdAndDelete(id)
        const todos = await Todo.find({})
        res.writeHead(200, headers)
        res.write(
          JSON.stringify({
            status: 'success',
            message: '成功',
            data: todos,
          })
        )
        res.end()
      } else {
        res.writeHead(400, headers)
        res.write(
          JSON.stringify({
            status: 'false',
            message: '資料不存在',
          })
        )
        res.end()
      }
    } catch (error) {
      res.writeHead(400, headers)
      res.write(
        JSON.stringify({
          status: 'false',
          message: '失敗',
        })
      )
      res.end()
    }
  },

  async patchPosts({ stream, size, req, res }) {
    try {
      const body = JSON.parse(Buffer.concat(stream, size).toString())
      const id = await Todo.findById(body.id)
      if (id !== null && body.status !== '' && body.status !== undefined) {
        await Todo.findByIdAndUpdate(body.id, {
          status: body.status,
        })

        const todos = await Todo.find({})
        res.writeHead(200, headers)
        res.write(
          JSON.stringify({
            status: 'success',
            message: '成功',
            data: todos,
          })
        )
        res.end()
      } else if (id !== null && body.title !== '' && body.title !== undefined) {
        await Todo.findByIdAndUpdate(body.id, {
          title: body.title,
        })
        const todos = await Todo.find({})
        res.writeHead(200, headers)
        res.write(
          JSON.stringify({
            status: 'success',
            message: '成功',
            data: todos,
          })
        )
        res.end()
      } else {
        res.writeHead(400, headers)
        res.write(
          JSON.stringify({
            status: 'false',
            message: '此筆資料不存在或是title,status未填寫',
          })
        )
        res.end()
      }
    } catch (error) {
      res.writeHead(400, headers)
      res.write(
        JSON.stringify({
          status: 'false',
          message: '失敗',
        })
      )
      res.end()
      console.log(error)
    }
  },
}

module.exports = posts
