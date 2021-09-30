(<template>
  <div class="descrpition">
    <el-descriptions class="margin-top" :column="column" :size="size" border>
      <el-descriptions-item
        v-for="(item, name, index) in listData"
        :key="index"
        :label-class-name="
          Math.floor((index + column) / column) % 2 ? 'bg-color' : 'bg-color-white'
        "
        :content-class-name="
          Math.floor((index + column) / column) % 2 ? 'bg-color' : 'bg-color-white'
        "
        :label="name"
      >
        <!-- <template slot="label">
        {{ item.label }}
      </template> -->
        {{ item }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Descriptions extends Vue {
  @Prop()
  readonly listData: { label: string; value: string }[];

  @Prop({ type: Number, default: () => 1 })
  readonly column: number;

  public size = 'medium';
}
</script>
<style lang="scss" scoped>
::v-deep {
  .el-descriptions .is-bordered th,
  .el-descriptions .is-bordered td {
    border: 0.01rem solid #c7c7c7;
    line-height: 0.38rem;
    font-size: 16px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #242424;
  }
  .bg-color {
    background: rgba(62, 82, 193, 0.11);
  }
  .bg-color-white {
    background: #fff;
  }
}
</style>
