export default class Storage {
  
  static set token (token) {
    this.save('token', token)
  }

  static get token () {
    return this.getOut('token')
  }
  
// 清理缓存

  static clear () {
    for (const item in window.app.$store.mutations) window.app.$store.commit(item, null)
    try {
      for (const item in localStorage) localStorage[item] = ''
    } catch (error) {
      console.log(error)
    }
  }

  static getsaveInLocalStorage (name) {
    try {
      localStorage.getItem(name)
    } catch (error) {
      console.log(error)
    }
  }

  static save (name, content) {
    window.app.$store.commit('save' + name.substring(0, 1).toUpperCase() + name.substring(1), content)
    try {
      let result = content
      if (typeof content === 'object') result = JSON.stringify(content)
      localStorage.setItem(name, result)
    } catch (error) {
      console.log(error)
    }
  }

  static getOut (name) {
    let result = null
    try {
      result = localStorage.getItem(name)
      if (typeof JSON.parse(result) === 'object') result = JSON.parse(result)
    } catch (error) {
      console.log(error)
    }
    if (window.app.$store.state[name] !== null) {
      result = window.app.$store.state[name]
    } else if (result !== null) {
      this.save(name, result)
    }
    return result
  }
}
