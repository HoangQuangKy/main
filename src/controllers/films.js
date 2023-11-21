import { query } from "express";
import films from "../models/films.js";
import uploadImage from '../cloundinary/index.js'
export const createFilms = async (req, res) => {
    try {
        const filmName = req.body.filmName;
        const img = req.files.img;
        const genres = req.body.genres;
        const episodes = req.body.episodes;
        const category = req.body.category;
        const decs = req.body.decs;
        const actors = req.body.actors;
        const acceptAge = req.body.acceptAge;

        const uploadFile = await uploadImage(img)

        const data = await films.create({
            filmName: filmName,
            img: uploadFile,
            genres: genres,
            episodes: episodes,
            category: category,
            decs: decs,
            actors: actors,
            acceptAge: acceptAge
        })
        return res.status(200).json({
            message: 'Create new film success',
            data: data
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Can't post this video"

        });

    }
}
export const createFilms1 = async (req, res) => {
    try {
        const filmName = req.body.filmName;
        const img = req.body.img;
        const genres = req.body.genres;
        const episodes = req.body.episodes;
        const category = req.body.category;
        const decs = req.body.decs;
        const actors = req.body.actors;
        const acceptAge = req.body.acceptAge;

        const data = await films.create({
            filmName: filmName,
            img: img,
            genres: genres,
            episodes: episodes,
            category: category,
            decs: decs,
            actors: actors,
            acceptAge: acceptAge
        })
        return res.status(200).json({
            message: 'Create new film success',
            data: data
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Can't post this video"

        });

    }
}
export const getAllFilms = async (req, res) => {
    try {
        const data = await films.find({})
        return res.status(200).json({
            message: 'this is all films',
            data: data
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Failed',
            error: error.message
        })
    }
}
export const getFilmById = async (req, res) => {
    try {
        const filmId = req.params.id;
        const film = await films.findById(filmId)
        return res.status(200).json({
            film
        })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const updateFilms = async (req, res) => {
    try {
        const id = req.params._id;
        const filmName = req.body.filmName;
        const img = req.files?.img;
        const genres = req.body.genres;
        const episodes = req.body.episodes;
        const category = req.body.category;
        const decs = req.body.decs;
        const actors = req.body.actors;
        const acceptAge = req.body.acceptAge

        let dataUpdate = {
            id,
            filmName,
            genres,
            episodes,
            category,
            decs,
            actors,
            acceptAge
        }
        if (img) {
            const upload = await uploadImage(img)
            dataUpdate = {
                ...dataUpdate,
                img: upload
            }
        }
        const film = await films.findOneAndUpdate({ id: id }, dataUpdate, { new: true })

        return res.status(200).json({ message: "Update phim thành công", film })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

export const getUniqueCategories = async (req, res) => {
    try {
        const uniqueCategories = await films.distinct('category')
        return res.status(200).json({
            message: uniqueCategories
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}
export const getTitle = async (req, res) => {
    try {
        const genres = await films.distinct('genres')
        const category = await films.distinct('category')
        const actors = await films.distinct('actors')
        return res.status(200).json({
            data: {
                genres: genres,
                category: category,
                actors: actors
            }
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}
export const getPagingFilms = async (req, res) => {
    try {
        const pageSize = req.query.pageSize || 3;
        const pageIndex = req.query.pageIndex || 1;

        const filmsAll = await films
            .find()
            .skip(pageSize * pageIndex - pageSize).limit(pageSize)
        const count = await films.countDocuments()
        const totalPage = Math.ceil(count / pageSize)

        return res.status(200).json({
            filmsAll,
            totalPage,
            count
        })
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}
export const deleteFilm = async (req, res) => {
    try {
        const id = req.params._id;
        const result = await films.deleteOne({ id: id });

        if (result.deletedCount === 1) {
            return res.status(200).json({ message: "Xóa phim thành công" });
        } else {
            return res.status(404).json({ message: "Không tìm thấy phim để xóa" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};