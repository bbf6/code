import { Dialog, Notify } from 'quasar'

const showOkAlert = message =>
  Notify.create({
    icon: 'check',
    position: 'bottom',
    color: 'primary',
    message
  })

const showErrorAlert = message =>
  Notify.create({
    icon: 'close',
    position: 'bottom',
    color: 'negative',
    message
  })

const confirmAction = (
  question = '',
  advertence = '',
  okCallback = () => {},
  cancelCallback = () => {},
  dismissCallback = () => {}
) =>
  Dialog.create({
    title: question,
    message: advertence,
    cancel: true,
    persistent: true,
    ok: { push: true, color: 'primary' },
    cancel: { push: true, color: 'grey' }
  })
    .onOk(okCallback)
    .onCancel(cancelCallback)
    .onDismiss(dismissCallback)

export {
  showOkAlert,
  showErrorAlert,
  confirmAction
}
