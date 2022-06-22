import Dep from "./dep";
let id = 0;
class Watcher{
    constructor(vm,fn,cb,options){ // $watch()  要将dep放到watcher中
<<<<<<< HEAD
=======
      debugger;
>>>>>>> 43f8df6eb3a7fdc3df0436eb8fe03c611b41138d
        this.vm = vm;
        this.fn = fn;
        this.cb = cb;
        this.options = options;
        this.id = id++;
        this.depsId = new Set();
        this.deps = [];
        this.getter = fn; // fn就是页面渲染逻辑
        this.get(); // 表示上来后就做一次初始化
    }
    addDep(dep){
        let did = dep.id;
        if(!this.depsId.has(did)){
            this.depsId.add(did);
            this.deps.push(dep); // 做了保存id的功能 并且让watcher记住dep
            dep.addSub(this);
        }
    }
<<<<<<< HEAD
    get(){
        Dep.target = this; // Dep.target = watcher
        this.getter(); // 页面渲染的逻辑  vm.name / vm.age  
        Dep.target = null; // 渲染完毕后 就将标识清空了， 只有在渲染的时候才会进行依赖收集
=======
    get() {
      debugger;
      Dep.target = this; // Dep.target = watcher
      this.getter(); // 页面渲染的逻辑  vm.name / vm.age  
      Dep.target = null; // 渲染完毕后 就将标识清空了， 只有在渲染的时候才会进行依赖收集
>>>>>>> 43f8df6eb3a7fdc3df0436eb8fe03c611b41138d
    }
    update(){
        console.log('update')

        // 可以做异步更新处理
        this.get();
    }
}


export default Watcher