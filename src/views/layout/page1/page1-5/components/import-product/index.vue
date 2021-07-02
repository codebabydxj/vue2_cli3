<template>
  <flex-grow-row v-loading="loading">
    <div class="w100">
      <div class="w100">
        <el-row type="flex">
          <el-col :span="12">
            <el-button size="mini" type="info" icon="el-icon-back" @click="back">返回</el-button>
          </el-col>
          <el-col :span="12" class="tar">
          </el-col>
        </el-row>
      </div>
      <div class="p-title">规格书导入修改</div>
      <div>
        <span class="red">*</span>模板：<el-button type="text" size="mini" class="fs" @click="downloadTemplate">下载模板</el-button>
        <span style="margin-left: 20px;">字段：</span><span class="red">商品编号，MD5值，PDF外链。</span>
      </div>
      <div>
        <span class="red">同商品不可在同个文件中修改MD5值和PDF外链。</span>
      </div>
      <div class="tip">选择导入文件，上传成功后再点击导入</div>
      <el-upload
        class="upload-btn"
        ref="upload"
        action=""
        :file-list="fileList"
        :multiple="false"
        :on-remove="handleRemove"
        :on-change="onChange"
        :auto-upload="false">
        <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
        <el-tooltip content="导入成功后，只修改表格中的商品。" popper-class="red" placement="right" effect="light">
          <el-button class="ml-20" type="primary" size="mini" :loading="saveLoading" @click="confirm">导入修改-具体商品</el-button>
        </el-tooltip>
      </el-upload>
      <el-table
        border
        stripe
        size="mini"
        v-auto-height:tableHeight="-50"
        v-loading="loading"
        :data="dataList"
        :max-height="tableHeight">
        <el-table-column prop="uploadTime" align="center" label="修改时间"></el-table-column>
        <el-table-column prop="uploadUserName" align="center" label="操作人"></el-table-column>
        <el-table-column prop="fileName" align="center" label="文件">
          <template slot-scope="scope">
            <el-button v-if="scope.row.atmKey" type="text" size="mini" @click="downloadErrorTemplate(scope.row.atmKey)">{{scope.row.fileName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="dealResult" align="center" label="导入结果">
          <template slot-scope="scope">
            <span :class="scope.row.dealResult === 'fail' ? 'red' : ''">
              <template v-if="scope.row.dealResult === 'fail'">失败</template>
              <template v-else>成功</template>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="errorMsg" align="center" label="异常原因"></el-table-column>
        <el-table-column prop="errorAtmKey" align="center" label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.errorAtmKey" type="text" size="mini" @click="downloadErrorTemplate(scope.row.errorAtmKey)">下载失败原因明细</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-space-between" v-if="dataList.length !== 0">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :current-page.sync="form.currentPage"
          :page-size="form.pageSize"
          :total="totalRow"
          :page-sizes="[20,30,50,100,150,200,250,300,350,400,450,500]"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange">
        </el-pagination>
      </div>
    </div>
  </flex-grow-row>
</template>

<script>
import { Loading } from 'element-ui';
import * as API from '@/utils/constants/api';
import xlsDownload from '@/utils/xls-download';

import listData from '../../req-data/import.json';

export default {
  data() {
    return {
      loading: false,
      saveLoading: false,
      form: {
        currentPage: 1,
        pageSize: 20,
      },
      fileList: [],
      fileObj: null,
      tableHeight: 0,
      totalRow: 0,
      dataList: [],
      loadingService: null,
    };
  },
  computed: {
  },
  created() {
    setTimeout(() => {
      this.getList();
    }, 100);
  },
  methods: {
    getList() {
      this.dataList = listData.result.dataList;
      this.totalRow = listData.result.totalRow;
      // this.loading = true;
      // this.$http.get(API.skuProductPdfImportPage, { params: this.form })
      //   .then((res) => {
      //     this.dataList = res.result.dataList;
      //     this.totalRow = res.result.totalRow;
      //   }).catch(() => {
      //   }).finally(() => {
      //     this.loading = false;
      //   });
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
      this.upload(API.skuProductPdfImport, (res) => {
        if (res.result && res.result.errorNum > 0) {
          this.downErrorExcelDialog.errorCount = res.result.errorNum;
          this.downErrorExcelDialog.fileName = res.result.fileName;
          this.downErrorExcelDialog.msg = JSON.stringify(res.result.pointList);
          this.downErrorExcelDialog.visible = true;
          return;
        }
        this.$message({
          showClose: true,
          message: '导入成功！',
          type: 'success',
        });
        this.form.currentPage = 1;
        this.fileList = [];
        this.fileObj = null;
        this.getList();
      });
    },
    downloadErrorTemplate(val) {
      xlsDownload.iframeDownLoad(`${API.baseUrl}/atm/download/bigdataupload?atmKey=${val}`);
    },
    upload(url, cb) {
      const formData = new FormData();
      formData.append('files', this.fileObj.raw, this.fileObj.raw.name);
      this.loadingService = Loading.service({ fullscreen: true, text: '正在导入，请稍候', background: 'rgba(0, 0, 0, 0.6)' });
      this.saveLoading = true;
      this.$http.post(url, formData)
        .then((res) => {
          cb(res);
        }, () => {
          this.fileList = [];
          this.fileObj = null;
        }).catch(() => {
        }).finally(() => {
          this.saveLoading = false;
          if (this.loadingService) {
            this.loadingService.close();
          }
        });
    },
    onChange(file, fileList) {
      this.fileObj = file;
      this.fileList = fileList.slice(-1);
    },
    handleRemove() {
      this.fileObj = null;
    },
    downloadTemplate() {
      // 下载模板
      xlsDownload.iframeDownLoad(`${API.baseUrl}/${API.skuProductPdfDownloadTemplate}`);
    },
    handleCurrentChange() {
      this.getList();
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.getList();
    },
    back() {
      this.$confirm('您还未保存，确定要返回码？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '继续编辑',
        closeOnClickModal: false,
        type: 'warning',
      }).then(() => {
        this.$goBack();
      });
    },
  },
};
</script>

<style scoped>
  .tar {text-align: right;}
  .w100 {width: 100%;}
  .red {color: red;}
  .p-title {
    line-height: 35px;
    padding-left: 8px;
    padding-bottom: 5px;
    margin-top: 10px;
    margin-bottom: 20px;
    border-bottom: 1px dashed #d8dce5;
  }
  .tip {
    margin: 10px 0;
  }
  .upload-btn{
    display: inline-block;
    margin-bottom: 10px;
  }
  .ml-20{
    margin-left: 20px;
  }
  .page-space-between {
    text-align: center;
    margin-top: 5px;
  }
  .fs{
    font-size: 16px;
  }
</style>
