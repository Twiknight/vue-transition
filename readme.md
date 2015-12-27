# Vue-transiton Component
A component to perform CSS transition using [Vue.js.](http://vuejs.org)

It allows you to trigger a transition whenever you like.

## Installation

    npm install vue-transition

 Or just include the file using a `<script>` tag.

## Usage
HTML:

    <div id="demo">
       <transition id="trans" options="all 0.5s ease" source="alert"></transition>
    </div>

CSS:

    .alert{
        background-color:red;
    }

Javascript:

    new Vue("#demo",{
        /*...your code here...*/
        methods{
            play:function(){
                this.transitions["trans"].play()
                                                    .then(/*...your code here...*/);
            },
            rollback:function(){
                this.transitions["trans"].rollback()
                                                    .then(/*...your code here...*/);
            }
        }
    })

## CommonJs

    Vue.use(require('Vue-transiton'));
    /*...your code here...*/

## License
MIT
