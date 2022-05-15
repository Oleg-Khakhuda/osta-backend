import { Router } from 'express'
import { getPlates, addPlate, getPlateById, removePlate, updatePlate } from '../../../controllers/plates'

const router = new Router()

router.get('/', getPlates)

router.get('/:id', getPlateById)

router.post('/', addPlate)

router.delete('/:id', removePlate)

router.put('/:id', updatePlate)

router.patch('/:id/favorite', updatePlate)

export default router