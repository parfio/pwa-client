//init stuff here

export default function ({app, store}) {
  return Promise.all([
    store.dispatch('i18n/init'),
    store.dispatch('mqtt/init'),
    store.dispatch('webworker/init'),
    store.dispatch('recognition/init'),
  ]);
}
