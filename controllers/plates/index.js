import repositoryPlates from '../../repository/plates'
import { HttpCode } from '../../lib/constants'

const getPlates = async (req, res, next) => {
  const plate = await repositoryPlates.listPlates(req.query)
  if (plate) {
    return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: plate })
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
}

const addPlate = async (req, res, next) => {
  const newPlate = await repositoryPlates.addPlate(req.body)
  if (newPlate) {
    res.status(HttpCode.CREATED).json({ status: 'success', code: HttpCode.OK, data: { plate: newPlate } })
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
}

const getPlateById = async (req, res, next) => {
  
  const { id } = req.params
  const plate = await repositoryPlates.getPlateById(id)
  if (plate) {
    return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { plate } })
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
}

const removePlate = async (req, res, next) => {
  // const {id: userId} = req.user
  const { id } = req.params
  const plate = await repositoryPlates.removePlate(id)
  if (plate) {
    return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { plate } })
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
}

const updatePlate = async (req, res, next) => {
  const { id } = req.params
  const plate = await repositoryPlates.updatePlate(id, req.body)
  if (plate) {
    return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { plate } })
  }
  throw new CustomError(HttpCode.NOT_FOUND, 'Not found')
}

export { getPlates, addPlate, getPlateById, removePlate, updatePlate }