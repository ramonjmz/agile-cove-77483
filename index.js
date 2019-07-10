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
  .get('/token-devices', (req, res) => res.send(req.params.token))
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/foco/:device', async (req, res) => {
      try {
        const client = await pool.connect()
        const result = await client.query('SELECT * FROM device where name = $1', [req.params.device]);
        const results = { 'results': (result) ? result.rows : null};
        // res.render('pages/db', results );
        res.send(results);
        client.release();
      } catch (err) {
        console.error(err);
        res.send("Error " + err);
      }
    })
  .put('/foco/:device', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('update device set status = $2 where name =$1 ;', [req.params.device,req.body.status]);
      const results = { 'results': (result) ? result : null};
      // res.render('pages/db', results );
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .get('/device/:device', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT status FROM device where name = $1', [req.params.device]);
      //const results = { 'results': (result) ? result.rows[0].status : null};
      const estado = (result.rows[0].status) ? 1 : 0;
      // res.render('pages/db', results );
      console.log(estado);
      res.format ({
       'text/plain': function() {
          res.send(estado);
        }
      });
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .put('/device/:device', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('update device set status = $2 where name =$1 ;', [req.params.device,req.body.status]);
      const results = { 'results': (result) ? result.rowCount : null};
      // res.render('pages/db', results );
      res.send(results);
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))