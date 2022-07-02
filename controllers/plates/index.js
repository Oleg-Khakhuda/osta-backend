import repositoryPlates from '../../repository/plates';
import { HttpCode } from '../../lib/constants';

const getPlates = async (req, res, next) => {
  const plates = await repositoryPlates.listPlates(req.query)
  if (plates) {
    return res.status(HttpCode.OK).json(plates)
  }
  res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

const addPlate = async (req, res) => {
  const { name, quantity, price, description } = req.body
  const newPlate = await repositoryPlates.addPlate({
    name,
    quantity,
    price,
    description,
    plateImage: req.file ? `http://localhost:${process.env.PORT}/${req.file.path}` : ""
  });
  if (newPlate) {
    return res.status(HttpCode.CREATED).json(newPlate)
  }
  res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Щось пішло не так, спробуйте ще раз' })
}

    const getPlateById = async (req, res, next) => {
      const { id } = req.params
      const plate = await repositoryPlates.getPlateById(id)
      if (plate) {
        return res.status(HttpCode.OK).json(plate)
      }
      res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
    }

const removePlate = async (req, res, next) => {
  // const {id: userId} = req.user
  const { id } = req.params
  const plate = await repositoryPlates.removePlate(id)
  if (plate) {
    return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { plate } })
  }
  res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

const updatePlate = async (req, res, next) => {
  const { id } = req.params
  const plate = await repositoryPlates.updatePlate(id, req.body)
  if (plate) {
    return res.status(HttpCode.OK).json({ status: 'success', code: HttpCode.OK, data: { plate } })
  }
  res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' })
}

// const uploadFile = async (req, res, next) => {
//   const uploadService = new UploadFileService(
//     LocalFileStorage,
//     req.file,
//     req.plate,
//   )

//   const fileUrl = await uploadService.updateFile();

//   res
//     .status(HttpCode.OK)
//     .json({ status: 'success', code: HttpCode.OK, data: { fileUrl } })
// }

export { getPlates, addPlate, getPlateById, removePlate, updatePlate }