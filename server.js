const http = require('http')

const server = http.createServer()
server.listen(3000)

server.on('error', err => {
  console.log('ERROR!!!', err.message)
})

server.on('request', (req, res) => {
  if (req.method === 'GET') {
    handleGet(req, res)
  } else if (req.method === 'POST') {
    handlePost(req, res)
  }
})

function handlePost(req, res) {
  const body = []
  req.on('data', chunk => body.push(chunk))
  req.on('end', () => {
    const data = JSON.parse(Buffer.concat(body))
    console.log(data)
    res.end('Thanks for the data.')
  })
}

function handleGet(req, res) {
  const name = getName(req.url)
  res.end(`<h1>Hello ${name}</h1>`)
}

function getName(url) {
  if (url === '/') {
    return 'Stranger'
  } else if (url.toLowerCase() === '/dalia') {
    return 'Boss'
  } else {
    return prepareName(url)
  }
}

function prepareName(text) {
  return [
    ...text.split('')[1].toUpperCase(),
    ...text.slice(2).toLowerCase(),
  ].join('')
}
