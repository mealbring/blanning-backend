import { Backend } from 'kuzzle'

const app = new Backend('blanning')

app.start()
  .then(() => {
    app.log.info('Application started')
  })
  .catch(console.error)
