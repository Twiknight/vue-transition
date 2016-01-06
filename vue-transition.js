;(function(){

    function install(Vue){
        var trans = Vue.extend({
                template: '<element></element>',
                props: ['id','options','source'],
                methods: {
                    play: function(options){
                        var vm = this;

                        var opts = options || vm.options;
                        var el = vm.$el.parentElement;

                        if(!vm.regx.test(el.className)){
                            el.style.transition = opts;
                            el.className += " "+vm.source;
                        }
                        return new Promise(function(resolve, reject) {
                            vm.$once('transitionend', function(){
                                setTimeout(resolve,0);
                            });
                        });
                    },
                    rollback:function(options){
                        var vm = this;
                        var opts = options || vm.options;
                        var el = vm.$el.parentElement;

                        if(vm.regx.test(el.className)){
                            el.style.transition = opts;
                            el.className = el.className.replace(vm.regx,'');
                        }

                        return new Promise(function(resolve, reject) {
                            vm.$once('transitionend', function(){
                                setTimeout(resolve,0);
                            });
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
                        vm.$dispatch('transitionend',vm.id);
                    })
                    vm.$parent.transitions = vm.$parent.transitions || {};
                    vm.$parent.transitions[vm.id] = vm;
                }
            });

        var anime = Vue.extend({
            template:'<element></element>',
            props:['id','source'],
            methods:{
                play:function(){
                    var vm = this;
                    var el = vm.$el.parentElement;

                    if(!vm.regx.test(el.className)){
                        el.className +=" "+vm.source;
                    }

                    el.style['animation-play-state'] = 'running';
                    el.style['-webkit-animation-play-state'] = 'running';

                    return new Promise(function(resolve, reject) {
                        vm.$once('animationend', function(){
                            el.style['animation-play-state'] = 'paused';
                            el.style['-webkit-animation-play-state'] = 'paused';
                            resolve();
                        });
                    });
                },
                pause:function() {
                    var vm = this;
                    var el = vm.$el.parentElement;
                    el.style['animation-play-state'] = 'paused';
                    el.style['-webkit-animation-play-state'] = 'paused';
                    return new Promise(function(resolve, reject) {
                        resolve();
                    });
                },
                restart:function(){
                    var vm = this;
                    var el = vm.$el.parentElement;

                    if(!vm.regx.test(el.className)){
                        el.className +=" "+vm.source;
                    }
                    else{
                        el.className = el.className.replace(vm.regx,'');
                        setTimeout(function(){
                            el.className +=" "+vm.source;
                            el.style['animation-play-state'] = 'running';
                            el.style['-webkit-animation-play-state'] = 'running';
                        },1);
                    }

                    return new Promise(function(resolve, reject) {
                        vm.$once('animationend', function(){
                            resolve();
                        });
                    });
                }
            },
            created(){
                this.regx = new RegExp('\\b'+this.source+'\\b');
            },
            ready(){
                var vm = this;
                var el = vm.$el.parentElement;

                [
                    'animationstart',
                    'webkitAnimationStart'
                ].map(function(ev){
                    el.addEventListener(ev, function(){
                        vm.$dispatch('animationstart',vm.id);
                    });
                });
                [
                    'animationend',
                    'webkitAnimationEnd'
                ].map(function(ev){
                    el.addEventListener(ev, function(){
                        vm.$dispatch('animationend',vm.id);
                    });
                });
                [
                    'animationiteration',
                    'webkitAnimationIteration'
                ].map(function(ev){
                    el.addEventListener(ev, function(){
                        vm.$dispatch('animationiteration',vm.id);
                    });
                });

                vm.$parent.animations = vm.$parent.animations || {};
                vm.$parent.animations[vm.id] = vm;
            }
        });

        Vue.component('transition',trans);
        Vue.component('animation',anime);
    }

    if (typeof exports == "object") {
        module.exports = install
      } else if (typeof define == "function" && define.amd) {
        define([], function(){ return install })
      } else if (window.Vue) {
        Vue.use(install);
      }

})();
