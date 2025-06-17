const buildTree = hash => createFolder(hash)

const createFolder = obj =>
  Object.keys(obj).map(key => {
    if (!obj[key]) return createFile(key, obj[key])
    return {
      key,
      label: key,
      icon: 'folder',
      children: createFolder(obj[key])
    }
  })

const createFile = key => ({
  key: key.split('.').slice(-1)[0],
  label: key.split('.').slice(0, -1).join('.')
})

export { buildTree }
