import { Router } from 'express';
import { getPlates, addPlate, getPlateById, removePlate, updatePlate } from '../../../controllers/plates';
import {validateQuery, validateCreate, validateUpdate, validateUpdateFavorite, validateId} from './validation';
import { upload } from '../../../middlewares/upload';

const router = new Router()


router.get('/', validateQuery, getPlates)

router.get('/plates/:id', validateId, getPlateById)

router.post('/', upload.single('plateImage'), addPlate)

router.delete('/:id', validateId, removePlate)

router.put('/:id', validateUpdate, validateId, updatePlate)

router.patch('/:id/favorite', validateUpdateFavorite, validateId, updatePlate)

// router.post('/', upload.single('photo'), addPhotoPlate)

export default router