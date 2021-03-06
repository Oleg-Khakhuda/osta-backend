import Joi from "joi";
import mongoose from "mongoose";

const { Types } = mongoose;

const createSchema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    quantity: Joi.number().optional(),
    photo: Joi.string().optional(),
    price: Joi.number().optional(),
    description: Joi.string().min(2).max(100).optional(),
    favorite: Joi.bool().optional()
});

const updateSchema  = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    quantity: Joi.number().optional(),
    photo: Joi.string().required(),
    price: Joi.number().optional(),
    description: Joi.string().min(2).max(100).optional(),
    favorite: Joi.bool().optional()
}).or('name', 'quantity', 'photo', 'price', 'description', 'favorite');

const updateFavoriteSchema = Joi.object({
    favorite: Joi.bool().required()
});

const regLimit = /\d+/

const querySchema = Joi.object({
    limit: Joi.string().pattern(regLimit).optional(),
    skip: Joi.number().min(0).optional(),
    sortBy: Joi.string().valid('name', 'price').optional(),
    sortByDesc: Joi.string().valid('name', 'price').optional(),
    filter: Joi.string().pattern(new RegExp('(name|price)\\|?(name|price)+')).optional()
});

export const validateCreate = async (req, res, next) => {
    try {
        await createSchema.validateAsync(req.body)
    } catch (err) {
        return res
            .status(400)
            .json({ message: `Field ${err.message.replace(/"/g, '')}` })
    }
    next()
};

export const validateUpdate = async (req, res, next) => {
    try {
        await updateSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === 'object.missing') {
            return res.status(400).json({ message: 'missing fields' })
        }
        return res.status(400).json({ message: err.message })
    }
    next()
};

export const validateUpdateFavorite = async (req, res, next) => {
    try {
        await updateFavoriteSchema.validateAsync(req.body)
    } catch (err) {
        const [{ type }] = err.details
        if (type === 'object.missing') {
            return res.status(400).json({ message: 'missing field favorite' })
        }
        return res.status(400).json({ message: err.message })
    }
    next()
};

export const validateId = (req, res, next) => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: 'Invalided ObjectId' })
    }
    next()
};

export const validateQuery = async (req, res, next) => {
    try {
        await querySchema.validateAsync(req.query)
    } catch (err) {
        return res
            .status(400)
            .json({ message: `Field ${err.message.replace(/"/g, '')}` })
    }
    next()
};