<template>
  <div>
    <el-dialog width="1200px"
      title="单商品修改"
      :visible.sync="isShow"
      :close-on-click-modal="false"
      :before-close="cancel">
      <el-row>
        <el-table
          ref="multipleTable"
          border
          stripe
          size="mini"
          v-loading="loadingTable"
          v-auto-height:tableHeight="-50"
          :data="dataList"
          :max-height="tableHeight">
          <el-table-column prop="productCode" align="center" label="商品编号"></el-table-column>
          <el-table-column prop="productName" align="center" label="商品名称"></el-table-column>
          <el-table-column prop="productModel" align="center" label="厂家型号"></el-table-column>
          <el-table-column prop="brandName" align="center" label="品牌"></el-table-column>
          <el-table-column prop="encapStandard" align="center" label="封装"></el-table-column>
          <el-table-column prop="catalogName" align="center" label="商品目录"></el-table-column>
          <el-table-column prop="projectPrincipal" align="center" label="工程负责人"></el-table-column>
          <el-table-column prop="md5" align="center" label="MD5值"></el-table-column>
          <el-table-column prop="pdfUrl" align="center" label="PDF外链"></el-table-column>
          <el-table-column prop="uploadUserName" align="center" label="修改人"></el-table-column>
          <el-table-column prop="uploadTime" align="center" label="修改时间"></el-table-column>
        </el-table>
      </el-row>
      <el-row style="width: 550px;margin-top: 30px;">
        <el-form ref="form" :inline="true" size="mini" label-width="100px" :model="form">
          <el-form-item label="更新PDF文件">
            <el-upload
              ref="upload"
              action=""
              :file-list="fileList"
              :multiple="false"
              :on-remove="handleRemove"
              :on-change="onChange"
              :auto-upload="false">
              <el-button slot="trigger" size="mini" type="primary">选择PDF文件</el-button>
              <el-button class="mrl10" size="mini" type="primary" :loading="upLoading"  @click="confirm">上传</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="更新MD5值">
            <el-input class="width250" placeholder="" v-model="form.md5"></el-input>
            <el-button class="mrl10" type="primary" size="mini" :loading="md5Loading" @click="md5Update">确认修改</el-button>
          </el-form-item>
          <el-form-item label="更新PDF外链">
            <el-input class="width250" placeholder="" v-model="form.pdfUrl"></el-input>
            <el-button class="mrl10" type="primary" size="mini" :loading="pdfLoading" @click="pdfUpdate">确认修改</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <dialog-md5
        v-if="isShowMd5Tip"
        :isShow="isShowMd5Tip"
        :datas="dataObj"
        @callback="cbMd5">
      </dialog-md5>
      <dialog-pdf
        v-if="isShowPdfTip"
        :isShow="isShowPdfTip"
        :datas="dataObj"
        @callback="cbPdf">
      </dialog-pdf>
    </el-dialog>
  </div>
</template>

<script>
import * as API from '@/utils/constants/api';

import dialogMd5 from './dialog-md5';
import dialogPdf from './dialog-pdf';

export default {
  props: ['isShow', 'datas'],
  components: {
    dialogMd5,
    dialogPdf,
  },
  data() {
    return {
      tableHeight: -50,
      dataList: [],
      loadingTable: false,
      form: {
        productId: '',
        md5: '',
        pdfUrl: '',
      },
      fileObj: null,
      fileList: [],
      dataObj: null,
      upLoading: false,
      isShowMd5Tip: false,
      isShowPdfTip: false,
      pdfLoading: false,
      md5Loading: false,
    };
  },

  computed: {
  },
  created() {
    this.dataList = this.datas;
    this.form.productId = this.datas[0].productId;
  },
  methods: {
    cancel() {
      this.$emit('callback');
    },
    onChange(file, fileList) {
      this.fileObj = file;
      this.fileList = fileList.slice(-1);
    },
    handleRemove() {
      this.fileObj = null;
    },
    upload(url, cb, data) {
      const formData = new FormData();
      formData.append('file', this.fileObj.raw, this.fileObj.raw.name);
      if (data) {
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });
      }
      this.upLoading = true;
      this.$http.post(url, formData)
        .then((res) => {
          cb(res);
        }).catch(() => {
        }).finally(() => {
          this.upLoading = false;
        });
    },
    confirm() {
      if (!this.fileObj) {
        this.$message({
          showClose: true,
          message: '请选择文件！',
          type: 'warning',
        });
        return;
      }
      if (!this.fileObj.name.match(/.pdf/i)) {
        this.$message({
          message: '只允许上传pdf格式的文件！',
          showClose: true,
          type: 'warning',
        });
        return;
      }
      this.upload(API.skuProductPdfUpdateImport, (res) => {
        if (res.result) {
          this.dataObj = res.result;
        }
        this.$message({
          showClose: true,
          message: '规格书修改成功！',
          type: 'success',
        });
        this.fileList = [];
        this.fileObj = null;
        this.isShowMd5Tip = true;
      }, { productId: this.form.productId });
    },
    md5Update() {
      if (!this.form.md5) {
        this.$message({
          showClose: true,
          message: '请输入MD5值！',
          type: 'warning',
        });
        return;
      }
      const params = {
        productId: this.form.productId,
        md5: this.form.md5,
      };
      this.md5Loading = true;
      this.$http.post(API.skuProductPdfUpdateMd5, params, API.formDataConfig)
        .then((res) => {
          if (res.result) {
            this.dataObj = res.result;
          }
          this.$message({
            showClose: true,
            message: '规格书修改成功！',
            type: 'success',
          });
          this.isShowMd5Tip = true;
        }).catch(() => {
        }).finally(() => {
          this.md5Loading = false;
        });
    },
    cbMd5(bool) {
      if (bool) {
        this.$emit('callback', true);
      }
      this.isShowMd5Tip = false;
    },
    pdfUpdate() {
      if (!this.form.pdfUrl) {
        this.$message({
          showClose: true,
          message: '请输入PDF外链！',
          type: 'warning',
        });
        return;
      }
      const params = {
        productId: this.form.productId,
        pdfUrl: this.form.pdfUrl,
      };
      this.pdfLoading = true;
      this.$http.post(API.skuProductPdfUpdateLink, params, API.formDataConfig)
        .then((res) => {
          if (res.result) {
            this.dataObj = res.result;
          }
          this.$message({
            showClose: true,
            message: 'PDF外链修改成功！',
            type: 'success',
          });
          this.isShowPdfTip = true;
        }).catch(() => {
        }).finally(() => {
          this.pdfLoading = false;
        });
    },
    cbPdf(bool) {
      if (bool) {
        this.$emit('callback', true);
      }
      this.isShowPdfTip = false;
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
</style>
