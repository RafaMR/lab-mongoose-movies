const express = require('express');
const router = new express.Router();

const Celebrity = require('../models/celebrity');

/////---- ITERATION 2 -----/////

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/index', { celebrities });
    })
    .catch((error) => {
      next(error);
    });
});

////--------- ITERATION 4 -------- /////

router.get('/celebrities/create', (req, res) => {
  res.render('celebrities/create');
});

router.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(() => {
      res.redirect('celebrities/create');
    });
});

/////////------- ITERATION 3 -------////////////

router.get('/celebrities/:id', (req, res, next) => {
  const { id } = req.params; // { id: 'jasjkhajfhs'}
  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/show', { celebrity });
    })
    .catch((error) => {
      next(error);
    });
});

//////-------- ITERATION 5 ------------///////

router.post('/celebrities/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});


///////--------- ITERATION 6 ---------//////////

router.get("/celebrities/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then( (celebrity) => {
      res.render("celebrities/edit", {celebrity} );
    })
    .catch(error => {
      next(error);
    });
});


router.post("/celebrities/:id", (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
