import { inject } from 'vue'

export default function useActionCable() {
  const cable = inject('cable')

  const createSubscription = (channelName, callbacks) => {
    const subscription = cable.subscriptions.create(channelName, {
      connected() {
        callbacks.connected?.()
      },
      disconnected() {
        callbacks.disconnected?.()
      },
      received(data) {
        callbacks.received?.(data)
      }
    })

    return subscription
  }

  return { createSubscription }
}
