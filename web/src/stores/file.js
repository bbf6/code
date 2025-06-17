import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { buildTree } from 'src/lib/buildTree'

export const useFileStore = defineStore('file', {
  state: () => ({
    key: null,
    tree: [],
    filename: '',
    fileContent: ''
  }),
  getters: {
    fileExtension(state) {
      if (!state.filename) return 'txt'
      return state.filename.split('.').slice(-1)[0]
    }
  },
  actions: {
    getTree() {
      api.get('/tree')
        .then(response => this.tree = buildTree(response.data))
        .catch(console.error)
    },
    getFileContent(id) {
      api.get(`/file/${id}`)
        .then(response => {
          this.filename = response.data.filename
          this.fileContent = response.data.content
        })
        .catch(console.error)
    }
  }
})
