import express from 'express';
import userService from '../services/users.service.js';
import countryService from '../services/countries.service.js';
import visitedCountriesService from '../services/visited_countries.service.js';
import AppError from '../utils/appError.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const initialUserId = userService.currentUserId;
  try {
    const countryCodes = await visitedCountriesService.getVisitedCountryCodes(
      initialUserId
    );
    const currentUser = await userService.getById(initialUserId);
    const users = await userService.getAll();

    res.render('index.ejs', {
      countryCodes,
      total: countryCodes.length,
      users,
      currentUser,
      errorMessage: null,
    });
  } catch (error) {
    next(new AppError('Failed to load initial data', 500));
  }
});

router.post('/add', async (req, res, next) => {
  const currentUserId = userService.currentUserId;
  const input = req.body['country'];

  console.log('input', input);

  try {
    const newCountry = await countryService.getByName(input);
    await visitedCountriesService.setVisitedCountries(
      currentUserId,
      newCountry.id
    );
    res.redirect('/');
  } catch (error) {
    next(new AppError('Failed to add country', 500));
  }
});

router.post('/user', async (req, res, next) => {
  if (req.body.add) {
    res.render('new.ejs');
  } else {
    try {
      const { userId } = req.body;
      userService.setCurrentUserId(userId);

      const countryCodes = await visitedCountriesService.getVisitedCountryCodes(
        userId
      );
      const currentUser = await userService.getById(userId);
      const users = await userService.getAll();

      res.render('index.ejs', {
        countryCodes,
        total: countryCodes.length,
        users,
        currentUser,
        errorMessage: null,
      });
    } catch (error) {
      next(new AppError('Failed to switch user', 500));
    }
  }
});

router.post('/new', async (req, res, next) => {
  try {
    const newUser = req.body;
    await userService.save(newUser.name, newUser.color);
    res.redirect('/');
  } catch (error) {
    next(new AppError('Failed to create new user', 500));
  }
});

export default router;
