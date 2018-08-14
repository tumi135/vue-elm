<template>
  <div id="cart-control">
    <span class="decrease icon-remove_circle_outline" v-show="food.count > 0" @click.stop.prevent="remove"></span>
    <span class="count" v-show="food.count > 0">{{food.count}}</span>
    <span class="increase icon-add_circle" @click.stop.prevent="add"></span>
  </div>
</template>

<script>
  import Vue from 'vue'
//  import BScroll from 'better-scroll'
  export default {
    name: 'cart-control',
    props: {
        food: {
            type: Object
        }
    },
    methods: {
      add (event) {
        console.log(event)
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        },
      remove (event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import '../assets/stylus/index.styl'
  #cart-control
    font-size 0
    .icon-remove_circle_outline, .icon-add_circle
      display inline-block
      width 24px
      height 24px
      line-height 24px
      font-size 24px
    .decrease, .increase
      display inline-block
      padding 6px
      color #00a0dc
      line-height 24px
      font-size 24px
    .count
      padding-top 6px
      display inline-block
      text-align center
      vertical-align top
      font-size 10px
      color rgb(147,153,159)
      line-height 24px
      width 12px




</style>
