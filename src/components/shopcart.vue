<template>
  <div id="shopcart">
    <div class="content">
      <div class="chart-icon-wrapper" @click="goList">
        <div class="chart-icon icon-shopping_cart" :class="{noZChart: totalCount != 0}" ></div>
        <div class="total-count" v-show="totalCount != 0">{{totalCount}}</div>
      </div>
      <div class="dilive-fee">
        <div class="price border-1px-right" :class="{noZPrice: totalPric != 0}">￥{{totalPric}}</div>
        <div class="deliveryPrice">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="delive-base" :class="{ok : totalPric >= minPrice}">{{inform}}</div>
    </div>
    <div class="cart-list-wrapper" v-show="showList" ref="cartScroll">
      <div class="cart-gray" @click="goList"></div>
      <div class="cart-list">
        <div class="cart-list-header">
          <span class="cart-title">购物车</span><span class="clear" @click="clear">清空</span>
        </div>
        <div class="food-item" v-for="food in selectFoods" :key="food.id">
          <span class="food-title">{{food.name}}</span>
          <span class="food-price">{{food.price}}</span>
          <cartcontrol class="cart-control" :food="food" ></cartcontrol>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import axios from 'axios'
  import cartcontrol from './cartcontrol'

  export default {
    components: {cartcontrol},
    name: 'shopcart',
    props: {
      deliveryPrice:{
        type: Number
      },
      minPrice: {
        type: Number
      },
      selectFoods: {
        type: Array,
        default () {
          return [
            {
                count: 10,
                price: 2
            },
            {
              count: 20,
              price: 2
            }
          ]
        }
      }
    },
    data () {
        return {
          fold: true
        }
    },
    computed: {
        totalCount () {
          let totalCount = 0
          this.selectFoods.forEach((food) => {
            totalCount += food.count
          })
          return totalCount
        },
      totalPric () {
        let totalPric = 0
        this.selectFoods.forEach((food) => {
          totalPric += food.price * food.count
        })
        return totalPric
      },
      inform () {
        if(this.totalPric === 0) {
            return `还差￥${this.minPrice}起送`
        } else if (this.totalPric > 0 && this.totalPric < this.minPrice) {
            return `还差￥${this.minPrice - this.totalPric}起送`
        }else {
            return '结算'
        }
      },
      showList () {
            if(!this.totalCount) {
//              this.fold = true
              return false
            }
            return !this.fold
      }
    },
    methods: {
      _initScroll () {
        this.scroll = new BScroll(this.$refs.cartScroll, {
          click: true
        })
        this.scroll.on('scroll', (pos) => {})
      },
        clear () {
          this.selectFoods.forEach((food) => {
            food.count = 0
          })
          this.fold = !this.fold
        },
      goList (){
        if(!this.selectFoods.length){
          return
        }
        console.log(this.selectFoods)
        this.fold = !this.fold
      }
    },
    created () {
      Vue.nextTick(() => {
        this._initScroll()
      })
      axios.get('/good/seller').then(res => {
        if(res.data.code === 0) {
          this.seller = res.data.data
          console.log(this.seller)
        }
      })
    }
  }


</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import '../assets/stylus/index.styl'

  #shopcart
    position fixed
    width 100%
    height 48px
    bottom 0px
    left 0px
    z-index 300
    .content
      display flex
      background #141d27
      width 100%
      .chart-icon-wrapper
        flex 0 0 80px
        position relative
        .chart-icon
          position relative
          width 44px
          height 44px
          border-radius 44px
          border 6px solid #141d27
          margin-left 18px
          margin-top -10px
          font-size 24px
          color rgba(255,255,255,0.4)
          line-height 44px
          text-align center
          background #2b333b
          &.noZChart
            background-color #00a0dc
            color #ffff
        .total-count
          position absolute
          right 0px
          top -6px
          text-align center
          background-color red
          color #fff
          width 24px
          height 16px
          font-size 8px
          font-weight 700
          line-height 16px
          box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
          border-radius 16px
      .dilive-fee
        flex 1
        padding 12px 0 12px 12px
        height 24px
        .price
          display inline-block
          border-1px-right(rgba(255,255,255,0.4))
          line-height 24px
          color  rgba(255,255,255,0.2)
          padding-right 12px
          &.noZPrice
            color #ffff
        .deliveryPrice
          padding-left 12px
          color rgba(255,255,255,0.4)
          line-height 20px
          display inline-block
          font-weight 700
          font-size 12px
      .delive-base
        flex 0 0 105px
        line-height 48px
        font-size 12px
        font-weight 700
        text-align center
        color rgba(255,255,255,0.1)
        background-color #2b333b
        padding 0 8px
        &.ok
          background-color green
          color #fff
    .cart-list-wrapper
      position fixed
      top 0
      bottom 48px
      width 100%
      display flex
      flex-direction column
      z-index -1
      .cart-gray
        flex 1
        background-color rgba(7,17,27,0.6)
      .cart-list
        position fixed
        bottom 48px
        left 0
        background-color #fff
        overflow auto
        max-height 217px
        width 100%
        .cart-list-header
          height 40px
          line-height 40px
          padding 0 18px
          border-1px(rgba(7,17,27,0.1))
          background-color #f3f5f7
          .cart-title
            font-weight 200
            color rgb(7,17,27)
            font-size 14px
          .clear
            position absolute
            right 18px
            color rgb(0,160,220)
            font-size 12px
        .food-item
          width 100%
          height 48px
          line-height 48px
          margin 0 18px
          border-1px(rgba(7,17,27,0.1))
          .food-title
            color rgb(7,17,27)
            font-size 14px
          .food-price
            position absolute
            right 120px
            font-size 10px
          .cart-control
            display inline-block
            position absolute
            top 6px
            right 18px










</style>
