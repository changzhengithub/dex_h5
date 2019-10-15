// toast.js
import Vue from "vue";
import toast from "./toast.vue";

let ToastConstructor = Vue.extend(toast)

let instance

const Toast = function(options = {}) { // 就改了这里，加了个 options 参数
  instance = new ToastConstructor({
    data: options // 这里的 data 会传到 main.vue 组件中的 data 中，当然也可以写在 props 里
  })
  document.body.appendChild(instance.$mount().$el)
}

export default Toast
