<template>
    <element></element>
</template>

<script lang="babel">
    export defaut {
        name:"transition",
        props:['id','duration','className'],
        methods:{
            play:function() {
                let vm = this;
                let el = vm.$parent.$el;
                let regx = new RegExp("\\b"+vm.source+"\\b");
                return  new Promise(function(resolve, reject) {
                    if(regx.test(el.className)){
                        el.style.transition = "none";
                        el.className = el.className.replace(regx,'');
                    }
                    el.style.transition = `all ${vm.duration} ease`;
                    el.className +=` ${vm.className}`

                    vm.$once("transitionend",resolve);
                });

            },
            rollback:function() {
                let vm = this;
                let el = vm.$parent.$el;
                let regx = new RegExp("\\b"+vm.source+"\\b");
                return new Promise(function(resolve, reject) {
                    if(!regx.test(el.className)){
                        resole();
                    }
                    el.style.transition = `all ${vm.duration} ease`;
                    el.className = el.className.replace(regx,'');

                    vm.$once("transitionend",resolve);
                });
            }
        },
        ready(){
            let vm = this;
            let p = vm.$parent;
            p.anime = p.anime || {};
            p.anime[vm.id] = vm;

            p.$el.addEventListener("transitionend", function() {
                vm.$emit("transitionend");
            })
        }
    }
</script>
