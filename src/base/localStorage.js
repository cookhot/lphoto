import _Storage from './Storage'

export default (window.Storage && window.localStorage && localStorage instanceof window.Storage) ? localStorage : new _Storage()
