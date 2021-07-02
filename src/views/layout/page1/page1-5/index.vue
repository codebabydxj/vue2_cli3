<template>
  <flex-grow-row>
    <div class="base-material-wrap">
      <el-row>
      <el-form class="demo-form-inline" size="mini" :inline="true" :model="searchForm" ref="searchForm">
        <template v-if="isKeyWordSearch">
          <el-form-item>
            <el-input class="input-width" placeholder="请输入关键字" v-model.trim="searchForm.keywords" @keyup.enter.native="search"></el-input>
          </el-form-item>
        </template>
        <template v-else>
          <el-form-item label="商品编号">
            <el-input class="input-width" placeholder="多个编号用空格隔开" v-model.trim="searchForm.productCode"></el-input>
          </el-form-item>
          <el-form-item label="封装规格">
            <el-input class="input-width" placeholder="封装规格" v-model.trim="searchForm.encapStandard"></el-input>
          </el-form-item>
          <el-form-item label="厂家型号">
            <el-input class="width-150" placeholder="厂家型号" v-model.trim="searchForm.productModel"></el-input>
          </el-form-item>
          <el-form-item label="目录">
            <el-select v-model="searchForm.catalogIds" filterable clearable multiple placeholder="目录">
              <el-option
                v-for="item in secondCatalogList"
                :key="item.catalogCode"
                :label="item.catalogName"
                :value="item.catalogId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌">
            <el-select
              filterable
              remote
              clearable
              multiple
              placeholder="品牌"
              v-model="searchForm.brandIds"
              @change="handleBrandSelect">
              <el-option
                v-for="obj in brandList"
                :key="obj.brandId"
                :label="obj.brandName"
                :value="obj.brandId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工程负责人">
            <el-input class="input-width" placeholder="工程负责人" v-model.trim="searchForm.projectPrincipal"></el-input>
          </el-form-item>
          <el-form-item label="修改人">
            <el-input class="input-width" placeholder="修改人" v-model.trim="searchForm.uploadUserName"></el-input>
          </el-form-item>
          <el-form-item label="修改时间">
            <el-date-picker
              type="daterange"
              align="left"
              unlink-panels
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :editable="false"
              v-model="uploadTime"
              :default-time="['00:00:00', '23:59:59']">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="是否有规格书">
            <el-select class="input-width" v-model="searchForm.hasAnnex">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="当前MD5值">
            <el-input class="input-width" placeholder="当前MD5值" v-model.trim="searchForm.md5"></el-input>
          </el-form-item>
          <el-form-item label="历史MD5值">
            <el-input class="input-width" placeholder="历史MD5值" v-model.trim="searchForm.historyMd5"></el-input>
          </el-form-item>
          <el-form-item label="是否有PDF外链">
            <el-select class="input-width" v-model="searchForm.hasLink">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="当前PDF外链">
            <el-input class="input-width" placeholder="当前PDF外链" v-model.trim="searchForm.pdfUrl"></el-input>
          </el-form-item>
          <el-form-item label="历史PDF外链">
            <el-input class="input-width" placeholder="历史PDF外链" v-model.trim="searchForm.historyLink"></el-input>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="info" @click="resetSearchForm">重置</el-button>
          <el-button type="text" @click="switchType">{{ isKeyWordSearch ? '切换高级搜索' : '切换关键字搜索'}}</el-button>
        </el-form-item>
      </el-form>
      </el-row>
      <div class="tal">
        <el-button type="primary" size="mini" @click="sigleUpdate">单商品修改</el-button>
        <el-button type="primary" size="mini" @click="importUpdate">导入修改</el-button>
      </div>
      <el-row>
        <el-table
          v-auto-height:tableHeight="-50"
          v-loading="loading"
          ref="multipleTable"
          border
          stripe
          size="mini"
          :data="dataList"
          :max-height="tableHeight"
          @selection-change="handleTableSelectionChange">
          <div slot="empty">
            <div>
              <span>很抱歉，查询不到内容，建议你检查搜索条件。</span>
            </div>
          </div>
          <el-table-column width="55" type="selection" align="center" label="NO."></el-table-column>
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
        <div class="page-center" v-if="dataList.length !== 0">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            :current-page.sync="searchForm.currentPage"
            :page-size="searchForm.pageSize"
            :page-sizes="[10,20,30,40,50,100,200]"
            :total="totalRow"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange">
          </el-pagination>
        </div>
      </el-row>
      <dialog-sp-update
        v-if="isShowDialog"
        :isShow="isShowDialog"
        :datas="selectData"
        @callback="spCb">
      </dialog-sp-update>
    </div>
  </flex-grow-row>
</template>

<script>
import * as API from '@/utils/constants/api';
import listData from './req-data/list.json';

import dialogSpUpdate from './components/dialog-sp-update';

export default {
  components: {
    dialogSpUpdate,
  },
  data() {
    return {
      permission: this.$route.matched[1].permission,
      isKeyWordSearch: true,
      tableHeight: -50,
      loading: false,
      searchForm: {
        productCode: '',
        encapStandard: '',
        productModel: '',
        brandIds: '',
        catalogIds: '',
        projectPrincipal: '',
        uploadUserName: '',
        uploadStartTime: '',
        uploadEndTime: '',
        hasAnnex: '',
        md5: '',
        historyMd5: '',
        hasLink: '',
        pdfUrl: '',
        historyLink: '',
        currentPage: 1,
        pageSize: 30,
      },
      totalRow: 0,
      uploadTime: null,
      selectData: [],
      dataList: [],
      catalogueList: [],
      brandList: [],
      isShowDialog: false,
    };
  },
  computed: {
    catalogueTree() {
      // 树数据
      const { catalogueList } = this;
      function arrayToTree(parentId) {
        const temp = [];
        catalogueList.forEach((item) => {
          if (item.parentId === parentId) {
            // eslint-disable-next-line
            item.childList = arrayToTree(item.catalogId);
            temp.push(item);
          }
        });
        return temp;
      }
      return arrayToTree(-1);
    },
    secondCatalogList() {
      if (Array.isArray(this.catalogueTree) && this.catalogueTree.length) {
        return this.catalogueTree[0].childList.reduce((accu, item) => accu.concat(item.childList), []);
      }
      return [];
    },
  },
  watch: {
    uploadTime(val) {
      this.searchForm.uploadStartTime = val ? val[0] : '';
      this.searchForm.uploadEndTime = val ? val[1].replace('00:00:00', '23:59:59') : '';
    },
  },
  created() {
    this.getCatalogList();
    this.getBrandList();
  },
  methods: {
    switchType() {
      this.isKeyWordSearch = !this.isKeyWordSearch;
      Object.keys(this.searchForm).forEach((key) => { this.searchForm[key] = (key === 'currentPage' || key === 'pageSize') ? this.searchForm[key] : ''; });
      // 由于更改了页面布局，必须重新计算table高度
      this.$nextTick(() => {
        this.autoHeightResizeListener();
      });
    },
    search() {
      this.searchForm.currentPage = 1;
      this.getList();
    },
    getList() {
      const params = {};
      Object.keys(this.searchForm).forEach((key) => {
        if (this.searchForm[key] !== '') {
          params[key] = this.searchForm[key];
        }
      });
      if (params.catalogIds && params.catalogIds.length > 0) {
        params.catalogIds = params.catalogIds.join(',');
      }
      if (params.brandIds && params.brandIds.length > 0) {
        params.brandIds = params.brandIds.join(',');
      }
      this.selectData = [];
      this.dataList = listData.result.dataList;
      this.searchForm.currentPage = listData.result.currPage;
      this.totalRow = listData.result.totalRow;
      this.loading = true;
      this.$http.get(API.skuProductPdfPage, { params })
        .then((data) => {
          this.selectData = [];
          this.dataList = data.result.dataList;
          this.searchForm.currentPage = data.result.currPage;
          this.totalRow = data.result.totalRow;
        }).catch(() => {
        }).finally(() => {
          this.loading = false;
        });
    },
    getCatalogList() {
      // 获取目录列表
      this.$http.get(API.skuCatalogList, { params: { isForbid: false } })
        .then((data) => {
          this.catalogueList = data.result;
        }).catch(() => {
        }).finally(() => {
        });
    },
    getBrandList() {
      this.$http.get(API.skuBrandList)
        .then((data) => {
          this.brandList = data.result;
        }).catch(() => {
        }).finally(() => {
        });
    },
    handleBrandSelect(val) {
      this.searchForm.brandIds = val;
    },
    sigleUpdate() {
      if (this.selectData.length !== 1) {
        this.$message({
          showClose: true,
          message: '请选择一条记录操作！',
          type: 'warning',
        });
        return;
      }
      this.isShowDialog = true;
    },
    spCb(bool) {
      if (bool) {
        this.getList();
      }
      this.isShowDialog = false;
    },
    importUpdate() {
      this.$openView(`${this.$route.path}/import-product`);
    },
    resetSearchForm() {
      this.$lcRefreshView();
    },
    handleTableSelectionChange(val) {
      this.selectData = val;
    },
    handleCurrentChange(val) {
      this.searchForm.currentPage = val;
      this.getList();
    },
    // 每页加载
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.base-material-wrap {
  width: calc(100%);
}
.tal {
  text-align: right;
  margin-bottom: 15px;
}
.page-center {
  margin-top: 20px;
  text-align: center;
}
</style>
