;(function(){
    var trans = Vue.extend({
        template: '<element></element>',
        props: ['id','options','source'],
        methods: {
            play: function(options){
                var vm = this;

                var opts = options || vm.options;
                var el = vm.$el.parentElement;

                return new Promise(function(resolve, reject) {
                    if(vm.regx.test(el.className)){
                        reject("Target class already exist.");
                    }else{
                        el.style.transition = opts;
                        el.className += " "+vm.source;

                        vm.$once('transitionend', resolve);
                    }
                });
            },
            rollback:function(options){
                var vm = this;
                var opts = options || vm.options;
                var el = vm.$el.parentElement;

                return new Promise(function(resolve, reject) {
                    if(vm.regx.test(el.className)){
                        el.style.transition = opts;
                        el.className = el.className.replace(vm.regx,'');

                        vm.$once('transitionend', resolve);
                    }else{
                        reject("This transition haven't been played.");
                    }
                });
            }
        },
        created(){
            this.regx = new RegExp('\\b'+this.source+'\\b');
        },
        ready(){
            var vm = this;
            var el = vm.$el.parentElement;

            el.addEventListener('transitionend', function(){
                vm.$emit('transitionend');
            })
            vm.$parent.transitions = vm.$parent.transitions || {};
            vm.$parent.transitions[vm.id] = vm;
        }
    });

    function install(Vue){
        Vue.component('transition',trans);
    }

    if (typeof exports == "object") {
        module.exports = install
      } else if (typeof define == "function" && define.amd) {
        define([], function(){ return install })
      } else if (window.Vue) {
        Vue.use(install);
      }

})();
