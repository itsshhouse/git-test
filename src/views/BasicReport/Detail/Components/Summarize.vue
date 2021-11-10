<template>
  <div class="summarize-container">
    <div
      v-for="(item, index) in summarizeData"
      :key="index"
      class="info-box"
      :class="'border-' + (index + 1)"
    >
      {{ item.name }}<br /><span :class="'font-' + (index + 1)"
        >{{ item.value }}{{ item.unit }}</span
      >
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';

@Component
export default class Summarize extends Vue {
  public summarizeData = [
    {
      name: '总车场记录数',
      value: 563,
      unit: '条',
    },
    {
      name: '总收入金额',
      value: 100000,
      unit: '元',
    },
    {
      name: '总微信金额',
      value: 100000,
      unit: '元',
    },
    {
      name: '总支付宝金额',
      value: 100000,
      unit: '元',
    },
    {
      name: '总其它金额',
      value: 100000,
      unit: '元',
    },
    {
      name: '总退款金额',
      value: 100000,
      unit: '元',
    },
  ];
}
</script>
<style lang="scss" scoped>
.summarize-container {
  display: flex;
  justify-content: space-around;
  margin: 0.3rem 0.1rem 0;
  gap: 0.07rem;
  .info-box {
    flex: 1;
    height: 1.57rem;
    font-size: 0.2rem;
    font-family: 'Source Han Sans CN';
    font-weight: 400;
    color: #8b8b8b;
    text-align: left;
    line-height: 0.6rem;
    text-indent: 0.25rem;
    background: #fff;
    box-shadow: 0px 8px 13px 0px rgba(0, 20, 85, 0.09);
    span {
      padding-left: 0.25rem;
      font-size: 0.36rem;
      font-weight: bold;
    }
  }

  $fontColor: (#55bdff, #ffc06f, #1fd86e, #1677ff, #7c99ff, #a29bfb);

  @each $item in $fontColor {
    $i: index($fontColor, $item);
    .border- {
      &#{$i} {
        border-bottom: 0.11rem solid $item;
      }
    }
    .font- {
      &#{$i} {
        color: $item;
      }
    }
  }
}
</style>
