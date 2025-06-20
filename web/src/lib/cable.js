import { createConsumer } from '@rails/actioncable'

const consumer = createConsumer(`${process.env.WS_API_URL}/api/cable`)

export default consumer
