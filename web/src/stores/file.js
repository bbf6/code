import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { buildTree } from 'src/lib/buildTree'
import { showErrorAlert, showOkAlert } from 'src/lib/notification'

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
        .catch(showErrorAlert)
    },
    getFileContent(id) {
      api.get(`/file/${id}`)
        .then(response => {
          this.filename = response.data.filename
          this.fileContent = response.data.content
        })
        .catch(showErrorAlert)
    },
    create(filename) {
      const params = { filename }
      api.post('/file', params)
        .then(() => showOkAlert(`${this.filename} created!`))
        .catch(showErrorAlert)
    },
    update() {
      const params = { content: this.fileContent }
      api.put(`/file/${this.key}`, params)
        .then(() => showOkAlert(`${this.filename} updated!`))
        .catch(showErrorAlert)
    },
    delete(id) {
      api.delete(`/file/${id}`)
        .then(() => showOkAlert(`${this.filename} created!`))
        .catch(showErrorAlert)
    }
  }
})
