import { defineStore } from 'pinia'

export const useFileStore = defineStore('file', {
  state: () => ({
    tree: [
      {
        label: 'code',
        icon: 'folder',
        children: [
          {
            label: 'mis_analisis_de_sangre',
            icon: 'folder',
            children: [
              { label: 'test_1.txt' },
              { label: 'test_2.txt' }
            ]
          },
          {
            label: 'general',
            icon: 'folder',
            children: [
              { label: 'wifi_password.txt' },
              { label: 'phone_numbers.txt' }
            ]
          },
          {
            label: 'formats',
            icon: 'folder',
            children: [
              { label: 'README.md' },
              { label: '.gitignore' },
              { label: 'package.json' }
            ]
          }
        ]
      }
    ],
    filename: ''
  }),
  getters: {},
  actions: {}
})
