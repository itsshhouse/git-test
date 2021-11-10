<template>
  <div>
    <BaseCard title="期末订单总计">
      <template v-slot:card-content>
        <div class="order-container">
          <div
            v-for="(item, index) in orderData"
            :key="index"
            class="order-info-box"
            :class="'icon-' + item.className"
          >
            <span class="info-num" :class="'font-' + item.className">{{ item.value }}</span
            ><span class="info-unit" :class="'unit-' + item.className">{{ item.unit }}</span
            ><br />{{ item.name }}
          </div>
        </div>
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';

@Component({
  components: { BaseCard },
})
export default class Order extends Vue {
  public orderData = [
    {
      name: '期末订单总数',
      value: '12345667',
      unit: '笔',
      className: 'order',
    },
    {
      name: '期末金额合计',
      value: '12345667',
      unit: '元',
      className: 'total',
    },
    {
      name: '已支付金额',
      value: '12345667',
      unit: '元',
      className: 'paid',
    },
    {
      name: '订单支付率',
      value: '78',
      unit: '%',
      className: 'payout-rate',
    },
  ];
}
</script>
<style lang="scss" scoped>
.order-container {
  display: flex;
  height: 2.5rem;
  .order-info-box {
    padding-top: 1rem;
    text-align: center;
    flex: 1;
    font-size: 0.18rem;
    font-family: 'Source Han Sans CN';
    font-weight: 400;
    color: #000000;
    padding-bottom: 0.25rem;
  }

  $imgFolder: '../../../../assets/images/BasicReport/';
  $imgName: ('order', 'total', 'paid', 'payout-rate');
  $imgHover: '-hover';
  $imgExtension: '@2x.png';
  $fontColor: (#ff6934, #30c694, #308ac6, #335aff);

  @each $item in $imgName {
    $i: index($imgName, $item);
    .icon- {
      &#{$item} {
        display: block;
        background: url($imgFolder+$item+$imgExtension) no-repeat center 0.1rem;
        background-size: 0.9rem 0.9rem;
      }
    }
    .font- {
      &#{$item} {
        color: nth($fontColor, $i);
        font-size: 0.36rem;
        font-family: 'Source Han Sans CN';
        font-weight: bold;
        line-height: 0.8rem;
      }
    }
    .unit- {
      &#{$item} {
        color: nth($fontColor, $i);
        font-size: 0.24rem;
        font-family: 'Source Han Sans CN';
        font-weight: bold;
      }
    }
  }
}
</style>
