<template>
  <div>
    <el-dialog
      width="500px"
      class="box"
      :visible.sync="isShow"
      :close-on-click-modal="false"
      :append-to-body="true"
      :before-close="cancel">
      <h3>PDF外链修改成功</h3>
      <div v-if="isOperation">
        <p>新PDF外链：{{pdfUrl}}</p>
        <p>有{{nums}}个商品与原PDF外链相同，是否一同修改？</p>
        <div class="dialog-footer" slot="footer">
          <el-button type="primary" size="mini" :loading="loading" @click="save">是</el-button>
          <el-button size="mini" @click="cancel">否</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as API from '@/utils/constants/api';

export default {
  props: ['isShow', 'datas'],
  data() {
    return {
      pdfUrl: '',
      nums: '',
      loading: false,
      params: {
        productIdList: [],
        pdfUrl: '',
      },
      isOperation: false,
    };
  },

  computed: {
  },
  created() {
    if (this.datas && this.datas && this.datas.productIdList && this.datas.productIdList.length > 0) {
      this.pdfUrl = this.datas.pdfUrl;
      this.nums = this.datas.productIdList.length;
      this.params.productIdList = this.datas.productIdList;
      this.params.pdfUrl = this.datas.pdfUrl;
      this.isOperation = true;
    } else {
      this.isOperation = false;
    }
  },
  methods: {
    cancel() {
      this.$emit('callback', true);
    },
    save() {
      this.loading = true;
      this.$http.post(API.skuProductPdfUpdateBatchLink, this.params)
        .then(() => {
          this.$emit('callback', true);
        }).catch(() => {
        }).finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
  .red {color: red;}
  .width250{
    width: 250px;
  }
  .mrl10 {
    margin-left: 10px;
  }
  .box {
    text-align: center;
  }
  .dialog-footer {
    text-align: center;
    margin-top: 35px;
  }
</style>
