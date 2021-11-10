<template>
  <div>
    <BaseCard title="设备状态">
      <template v-slot:card-content>
        <div class="content-box">
          <deviceStatusItem
            v-for="(item, index) in infoData"
            :key="index"
            :rate="item.rate"
            :title="item.title"
            :total="item.total"
            :offline="item.offline"
            :color="item.color"
          />
        </div>
      </template>
    </BaseCard>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch, PropSync } from 'vue-property-decorator';
import BaseCard from '@/template/VueTemplate/BaseCard.vue';
import deviceStatusItem from './DeviceStatusItem.vue';

@Component({
  components: { BaseCard, deviceStatusItem },
})
export default class TransferStatistics extends Vue {
  public infoData = [
    { rate: 70, title: '高位视频', total: 185555555555, offline: 90, color: '#6F78CC' },
    { rate: 70, title: 'POS机', total: 185, offline: 90, color: '#426AE5' },
  ];
}
</script>
<style lang="scss" scoped>
.content-box {
  display: flex;
  width: 4.94rem;
  height: 2.37rem;
}
</style>
