# Vue-transiton Component
A component to perform CSS transition using [Vue.js.](http://vuejs.org)

It allows you to trigger a transition whenever you like.

## Installation

    npm install vue-transition

 Or just include the file using a `<script>` tag.

## Usage
HTML:
```html
<div id="demo">
   <transition id="trans" options="all 0.5s ease" source="alert"></transition>
</div>
```
CSS:
```css
.alert{
    background-color:red;
}
```
Javascript:
```javascript
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
```
## CommonJs
```javascript
Vue.use(require('Vue-transiton'));
/*...your code here...*/
```
## API reference

### Transitions
* `transition.play(options->string)->Promise` :
This function will apply the transition by adding the source class
you set .

 `options` : the options string of transition, like`"all 0.5s ease"` .
 By default , the options used will be what you set on the transition component.

 The function returns a Promise that will resolve on the html element event `transitionend`.
 If you don't like the Promise styled API,
 Just listen to the `transitionend` __Vue__ event in the parent component.

* `transition.rollback(options->string)->Promise`:
This function works just like `transition.play`.

  The only difference is this one removes the source class you set to make a rollback effect.


### Animations
* `animation.play->Promise`:
This function will apply the animation by adding the source animation class you set or continue a paused animation.

  The returned Promise will resolve on html event `animationend`or the same one named with `-webkit`.
  And it will dispatch a Vue event `animationend`(No  -webkit here) together with its `id`.

* `animation.pause->Promise`:
This function will pause the play animation by setting `animation-play-state` to `"paused"`.
  So if you emit multiple animations on one element at the same time,
  the `pause`function will pause them all.

  The returned Promise will directly resolve.

* `animation.restrat->Promise`:
This function will stop the current animation and then restart it.

  Also, you can use it to restart a animation that is specified to work only once.
  
  The returned Promise will resolve on  `animationend` as `aniamtion.play`.

* Events:
CSS animations emit three event: `animationstart`,`animationend`,`animationiteration`.
All these will be wrapped as Vue events with the same name.

  You can listen to them in any of the parent components, as they'll be dispatched upwards.
## License
MIT
