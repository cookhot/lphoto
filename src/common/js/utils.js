export function $$ (el, ctx) {
  let context = ctx || document
  return el instanceof HTMLElement ? el : context.querySelectorAll(el)
}

export function $ (el, ctx) {
  let context = ctx || document
  return el instanceof HTMLElement ? el : context.querySelector(el)
}

export function addClass (el, className) {
  if (!(el instanceof HTMLElement)) {
    return
  }

  if (typeof className !== 'string') {
    return
  }

  return el.classList.add(className)
}

export function hasClass (el, className) {
  if (!(el instanceof HTMLElement)) {
    return false
  }

  if (typeof className !== 'string') {
    return false
  }

  return el.classList.contains(className)
}

export function removeClass (el, className) {
  if (!(el instanceof HTMLElement)) {
    return
  }

  if (typeof className !== 'string') {
    return
  }

  return el.classList.remove(className)
}

/**
 * selector 应该变成class
 * @param el
 * @param selector
 * @returns {*}
 */
export function getParentByClass (el, className) {
  let _el = el instanceof HTMLElement ? el : $(el)
  // const parentEl = $$(selector)
  let parent = _el.parentElement
  while (parent) {
    if (hasClass(parent, className)) {
      return parent
    }
    parent = parent.parentElement
  }
  return parent
}
