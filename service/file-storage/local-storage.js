import path from 'path'
import fs from 'fs/promises'
import Plates from '../../repository/plates'
import { nanoid } from 'nanoid'

class LocalStorage {
  constructor(file, plate) {
    this.plateId = plate.id
    this.filename = file.filename
    this.filePath = file.path
    this.folderPlates = process.env.FOLDER_FOR_PLATES
  }

  async save() {
    const destination = path.join(this.folderPlates, this.plateId)
    await fs.mkdir(destination, { recursive: true })  
    await fs.rename(this.filePath, path.join(destination, this.filename))
    const photoUrl = path.normalize(path.join(this.plateId, this.filename))   
    await Plates.updatePlatePhoto(this.plateId, photoUrl)
    return photoUrl
    }
}

export default LocalStorage