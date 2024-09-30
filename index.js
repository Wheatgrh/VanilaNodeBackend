import { createServer } from 'node:http';
import fs from 'node:fs'
import { changeStatus, createTask, getData, initCounter } from './storage.js';

const pages = './pages'
const hostname = '0.0.0.0';
const port = 3000;
function init() {
  initCounter()
}
const server = createServer((req, res) => {
  const url = req.url
  const method = req.method
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  if (url === '/tasks' && method === 'POST') {
    let body = [];
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const item = JSON.parse(body)
      const result = createTask(item)
      console.log(result);
      res.end(result)
    });
  }

  // TODO Change Status
  if (url === '/tasks' && method === 'PATCH') {
    let body = [];
    req.on('data', chunk => {
      body.push(chunk);
      console.log(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const requestData = JSON.parse(body)
      const changedData = changeStatus(requestData.id)
      res.end(changedData)
    });
  }

  // ToDO Delete Task
  if (url === '/tasks' && method === 'DELETE') { }

  if (url === '/tasks' && method === 'GET') {
    const result = getData()
    res.end(result)
  }

});

server.listen(port, hostname, () => {
  init()
  console.log(`Server running at http://${hostname}:${port}/`);
});
