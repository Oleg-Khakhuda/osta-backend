import Plates from "../model/plates";

const listPlates = async ({ sortBy, sortByDesc, filter, limit = 10, skip = 0 }) => {
  let sortCriteria = null
  const total = await Plates.find().countDocuments()
  let result = Plates.find()
  if (sortBy) {
    sortCriteria = { [`${sortBy}`]: 1 }
  }
  if (sortByDesc) {
    sortCriteria = { [`${sortByDesc}`]: -1 }
  }
  if (filter) {
    result = result.select(filter.split('|').join(' '))
  }
  result = await result.skip(Number(skip)).limit(Number(limit)).sort(sortCriteria)
  return {total, plates: result}
}

const addPlate = async (body) => {
  const result = await Plates.create({...body})
  return result
}

const getPlateById = async (plateId) => {
  const result = await Plates.findOne({_id: plateId})
  return result
}

const removePlate = async (plateId) => {
  const result = await Plates.findOneAndRemove({_id: plateId})
  return result
}

const updatePlate = async (plateId, body) => {
  const result = await Plates.findOneAndUpdate(
    {_id: plateId},
    { ...body },
    {new: true}
  )
  return result
}

export default { listPlates, addPlate, getPlateById, removePlate, updatePlate }