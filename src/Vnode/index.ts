import { createVNode,render}  from "vue"
import LoadingBar from "../views/LoadingBar.vue";

const VNode = createVNode(LoadingBar)
render(VNode,document.body)

export default VNode