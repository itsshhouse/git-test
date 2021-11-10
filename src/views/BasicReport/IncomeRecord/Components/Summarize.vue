<template>
  <div class="summarize-container">
    <div
      v-for="(item, index) in summarizeData"
      :key="index"
      class="info-box"
      :class="'icon-' + item.className"
    >
      <span>{{ item.value }}{{ item.unit }}</span
      ><br />{{ item.name }}
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';

@Component({ components: { BaseCard } })
export default class Summarize extends Vue {
  public summarizeData = [
    {
      name: '总交易记录数',
      value: 563,
      unit: '条',
      className: 'blue',
    },
    {
      name: '总订单笔数',
      value: 100000,
      unit: '个',
      className: 'green',
    },
    {
      name: '总应付金额',
      value: 100000,
      unit: '元',
      className: 'pink',
    },
    {
      name: '总支付金额',
      value: 100000,
      unit: '元',
      className: 'purple',
    },
  ];
}
</script>
<style lang="scss" scoped>
.summarize-container {
  margin: 0.3rem 0.1rem 0;
  display: flex;
  justify-content: space-around;
  gap: 0.4rem;
  .info-box {
    float: left;
    flex: 1;
    height: 1.22rem;
    font-size: 0.23rem;
    font-family: 'Source Han Sans CN';
    font-weight: 300;
    text-align: center;
    padding-left: 1.18rem;
    span {
      font-size: 0.3rem;
      font-weight: bold;
      line-height: 0.8rem;
    }
  }
  $imgFolder: '../../../../assets/images/BasicReport/';
  $imgName: ('blue', 'green', 'pink', 'purple');
  $imgExtension: '@2x.png';
  $fontColor: (#7ea1fd, #40e09c, #fe6da9, #9a7efd);

  @each $item in $imgName {
    $i: index($imgName, $item);
    .icon- {
      &#{$item} {
        display: block;
        background: #fff url($imgFolder+'icon-'+$item+$imgExtension) no-repeat 0 0;
        background-size: contain;
        color: nth($fontColor, $i);
      }
    }
  }
}
</style>
