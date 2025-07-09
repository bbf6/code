import { uid } from 'quasar'
import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { buildTree } from 'src/lib/buildTree'
import { showErrorAlert, showOkAlert } from 'src/lib/notification'
import useActionCable from 'src/composables/useActionCable'

export const useFileStore = defineStore('file', {
  state: () => ({
    key: null,
    tree: [],
    filename: '',
    fileContent: '',
    readOnly: false,
    isTyping: false,
    isInactive: true,
    subscription: null,
    user: uid()
  }),
  getters: {
    fileExtension(state) {
      if (!state.filename) return 'txt'
      return state.filename.split('.').slice(-1)[0]
    }
  },
  actions: {
    clean() {
      this.key = null
      this.filename = ''
      this.fileContent = ''
      this.readOnly = false
      this.isTyping = false
      this.isInactive = true
    },
    getTree() {
      api.get('/tree')
        .then(response => this.tree = buildTree(response.data))
        .catch(showErrorAlert)
    },
    getFileContent(id = this.key) {
      if (!id) return
      api.get(`/file/${id}`)
        .then(response => {
          this.id = id
          this.filename = response.data.filename
          this.fileContent = response.data.content
        })
        .catch(showErrorAlert)
    },
    create(filename) {
      const params = { filename }
      api.post('/file', params)
        .then(() => showOkAlert(`${filename} created!`))
        .catch(showErrorAlert)
    },
    update() {
      const params = { content: this.fileContent }
      api.put(`/file/${this.key}`, params)
        .then(() => showOkAlert(`File updated!`))
        .catch(showErrorAlert)
    },
    rename(id, filename) {
      const params = { filename }
      api.put(`/file/rename/${id}`, params)
        .then(() => showOkAlert(`${filename} updated!`))
        .catch(showErrorAlert)
    },
    delete(id) {
      api.delete(`/file/${id}`)
        .then(() => showOkAlert(`File deleted!`))
        .catch(showErrorAlert)
    },
    initializeSubscription() {
      if (this.subscription) return
      const { createSubscription } = useActionCable()
      this.subscription = createSubscription('CodeFileChannel', {
        connected: () => console.log('Connected to channel'),
        disconnected: () => console.log('Disconnected from channel'),
        received: (data) => {
          if (['new', 'deleted', 'edited'].includes(data.action)) this.getTree()
          if ('deleted' === data.action) return this.clean()
          if ('editing' === data.action && data.user !== this.user)
            return this.readOnly = true
          if ('edited' === data.action) {
            this.readOnly = false
            return this.getFileContent()
          }
        }
      })
    },
    cleanup() {
      if (this.subscription) {
        this.subscription.unsubscribe()
        this.subscription = null
      }
    },
    send(data) {
      if (!this.subscription) return
      this.subscription.perform(data.action, { ...data, user: this.user })
    }
  }
})
