const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bodyParser = require("body-parser");

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM device where name ='foco001'");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/token-devices', (req, res) => res.send(req.params.token))
  .get('/switch', (req, res) => res.json({
            data: req.params.foco}))
  .get('/foco', (req, res) => {

    try {
      const client = await pool.connect()
      const result = await client.query("SELECT * FROM device where name ='foco001'");
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }

  })

  .put('/foco', (req, res) => res.send(1))

  .listen(PORT, () => console.log(`Listening on ${ PORT }`))