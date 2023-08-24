import envSchema from "env-schema"

const schema = {
    type: 'object',
    required: [ 'PORT' ],
    properties: {
      PORT: {
        type: 'number',
        default: 5000
      },
      POSTGRES_URL: {
        type: 'string'
      }
    }
  }

  const config = envSchema({
    schema: schema,
    data: process.env,
    dotenv: true 
  })