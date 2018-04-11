var express = require('express');
var router = express.Router();
async = require('async');
/* GET tobacco page. */
router.get('/', function(req, res, next) {
  
  var con = req.con;
  console.log(con)
  async.parallel(
    [
      function(callback) {
        con.query('select * from tobacco', function(errors, tobaccos){
          console.log(errors, tobaccos)
          callback(errors, tobaccos);
        })
      }
    ],
    function(err, results) {
      
      var data = {tobaccos: results[0]}
     
      res.render('tobacco/index', data);
    }
  )  
});

router.get('/add', function(req, res, next) {
  res.render('tobacco/add');
})

router.get('/add', function(req, res, next) {
  res.render('tobacco/add');
})

router.get('/delete/:id', function(req, res, next) {
  var con = req.con;
  console.log(req.body)
  async.parallel(
    [
      function(callback) {
        con.query('delete from tobacco where id = ?', [req.params.id], function(errors, tobaccos){
          console.log(errors, tobaccos)
          callback(errors);
        })
      }
    ],
    function(err, results) {
      
      
     
      res.redirect('/tobacco')
    }
  ) 
})

router.post('/add', function(req, res, next) {
  var con = req.con;
  console.log(req.body)
  async.parallel(
    [
      function(callback) {
        con.query('insert into tobacco(name, price, country, amount) values(?,?,?,?) ', [req.body.name, req.body.price, req.body.country,req.body.amount], function(errors, tobaccos){
          console.log(errors, tobaccos)
          callback(errors);
        })
      }
    ],
    function(err, results) {
      
      
     
      res.redirect('/tobacco')
    }
  ) 
})


router.get('/edit/:id', function(req, res, next) {
  var con = req.con;
  console.log(req.body)
  async.parallel(
    [
      function(callback) {
        con.query('select * from tobacco where id = ?', [req.params.id], function(errors, tobaccos){
          console.log(errors, tobaccos)
          callback(errors, tobaccos[0]);
        })
      }
    ],
    function(err, results) {

      var data = {tobacco: results[0]};

      
      res.render('tobacco/edit', data)
    }
  ) 
})


router.post('/edit', function(req, res, next) {
  var con = req.con;
  console.log(req.body)
  async.parallel(
    [
      function(callback) {
        con.query('select * from tobacco where id = ?', [req.body.id], function(errors, tobaccos){
          
          

          con.query('update tobacco set name = ?, price = ?, country = ?, amount = ? where id = ?', [req.body.name, req.body.price, req.body.country, req.body.amount, req.body.id],
        function(errors, tobaccos){
          callback(errors);

        })
        })
      }
    ],
    function(err, results) {

      
      
    
     
      res.redirect('/tobacco')
    }
  ) 
})

module.exports = router;
