import express from 'express'
import { createFilms, createFilms1, deleteFilm, getAllFilms, getFilmById, getPagingFilms, getTitle, getUniqueCategories, updateFilms } from '../controllers/films.js';
import { authentication, authorization } from '../middlewares/index.js';

const routerFilms = express.Router();

routerFilms.post('/createFilms', authentication, authorization, createFilms)
routerFilms.get('/getAllFilms', getAllFilms)
routerFilms.put('/:id', authentication, authorization, updateFilms)
routerFilms.get('/category', getUniqueCategories)
routerFilms.get('/getPagingFilms', authentication, authorization, getPagingFilms)
routerFilms.get('/getTitle', getTitle)
routerFilms.get('/:id', getFilmById)
routerFilms.delete('/:id', deleteFilm)
routerFilms.post('/post', createFilms1)
export default routerFilms