import { createConsumer } from '@rails/actioncable'

export default ({ app }) => {
  const cable = createConsumer(`${process.env.WS_API_URL}/api/cable`)
  app.provide('cable', cable)
}
