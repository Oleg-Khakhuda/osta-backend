class FileStorage {
  constructor(Storage, file, plate) {
    this.storage = new Storage(file, plate)
  }

  async updateFile() {
    const plateUrlFile = await this.storage.save()
    return plateUrlFile
  }
}

export default FileStorage