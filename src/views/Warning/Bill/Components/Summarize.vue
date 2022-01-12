<template>
  <div class="summarize-container">
    <div
      v-for="(item, index) in summarizeData"
      :key="index"
      class="info-box"
      :style="{
        backgroundImage: 'url(' + item.img + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }"
    >
      {{ item.value }}<br /><span>{{ item.name }}</span>
      <div v-if="item.setting" class="setting" @click="settingOpen(item.name)">设置</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';

@Component
export default class Summarize extends Vue {
  public summarizeData = [
    {
      name: '总票据数',
      value: 100000,
      img: require('@/assets/images/Warning/bg-blue@2x.png'),
      setting: true,
    },
    {
      name: '票据预警值',
      value: 100000,
      img: require('@/assets/images/Warning/bg-green@2x.png'),
      setting: true,
    },
    {
      name: '当前剩余票据',
      value: 100000,
      img: require('@/assets/images/Warning/bg-orange@2x.png'),
      setting: false,
    },
  ];

  public settingOpen(name: string) {
    this.$emit('settingOpen', name);
  }
}
</script>
<style lang="scss" scoped>
.summarize-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 0.3rem;
  .info-box {
    position: relative;
    width: 4.48rem;
    height: 1.6rem;
    padding-top: 0.25rem;
    padding-right: 0.5rem;
    font-size: 0.48rem;
    font-family: 'Source Han Sans CN';
    font-weight: 500;
    color: #ffffff;
    text-align: right;
    line-height: 0.6rem;
    span {
      font-size: 0.24rem;
      font-weight: 400;
    }
    .setting {
      position: absolute;
      bottom: 0;
      z-index: 9;
      width: 100%;
      height: 0.34rem;
      line-height: 0.34rem;
      text-align: left;
      text-indent: 0.38rem;
      background: rgba(21, 31, 48, 0.57)
        url('../../../../assets/images/Warning/icon-setting@2x.png') no-repeat 90% center;
      border-radius: 0px 0px 0.15rem 0.15rem;
      font-size: 0.14rem;
      font-weight: 400;
    }
  }
}
</style>
