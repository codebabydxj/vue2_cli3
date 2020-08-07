<template>
  <flex-grow-row>
    <div class="base-warp">
      <el-col :span="24">
        <el-row>
          <el-col class="tal">
            <el-form size="mini" :inline="true" :model="searchForm">
              <template v-if="isKeyWordSearch">
                <el-form-item>
                  <el-input class="input-width" placeholder="请输入关键字" v-model.trim="searchForm.keywords" @keyup.enter.native="search"></el-input>
                </el-form-item>
              </template>
              <template v-else>
                <el-form-item label="测试1">
                  <el-input class="input-width" placeholder="请输入关键字" v-model.trim="searchForm.cs1"></el-input>
                </el-form-item>
                <el-form-item label="测试2">
                  <el-select class="input-width" placeholder="请选择" v-model="searchForm.test">
                    <el-option label="全部" value=""></el-option>
                    <el-option v-for="(item, index) in testList" :label="item.name" :value="item.key" :key="index"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="测试3">
                  <el-date-picker
                    class="date-picker-width"
                    type="daterange"
                    align="left"
                    unlink-panels
                    range-separator="至"
                    onPick="handleDatePick"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :editable="false"
                    v-model="dateValue"
                    :default-time="['00:00:00', '23:59:59']">
                  </el-date-picker>
                </el-form-item>
              </template>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="info" @click="resetsearchForm">重置</el-button>
                <el-button type="text" @click="switchType">{{ isKeyWordSearch ? '切换高级搜索' : '切换关键字搜索'}}</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="tar">
            <el-button type="success" size="mini" @click="handleSuccess">success</el-button>
            <el-button type="warning" size="mini" @click="handleWarning">warning</el-button>
            <el-button type="primary" size="mini" @click="handlePrimary">primary</el-button>
            <el-button type="danger" size="mini" @click="handleDanger">danger</el-button>
            <el-button type="primary" size="mini" @click="exportData1">导出1</el-button>
            <el-button type="primary" size="mini" @click="exportData2">导出2</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="tar">
            <table-memory
              :tableTitle="tableTitle"
              :titleList="titleListLocal"
              @title-change="handleTitleChange">
            </table-memory>
          </el-col>
        </el-row>
        <el-row>
          <el-table
            stripe
            border
            size="mini"
            v-auto-height:tableHeight="-50"
            v-loading="loading"
            :data="tableData"
            :max-height="tableHeight"
            @selection-change="handleSelectionChange">
            <div slot="empty">
              <div>
                <span>很抱歉，查询不到内容，建议你检查搜索条件。</span>
              </div>
            </div>
            <el-table-column width="55" align="center" label="选择">
              <template slot-scope="scope">
                <el-radio v-model="selectTableData" :label="scope.row">{{''}}</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="cs1" align="center" label="cs1" v-if="titleListLocal.some(i => i.title === 'cs1' && i.status)"></el-table-column>
            <el-table-column prop="cs2" align="center" label="cs2" v-if="titleListLocal.some(i => i.title === 'cs2' && i.status)"></el-table-column>
            <el-table-column prop="cs3" align="center" label="cs3" v-if="titleListLocal.some(i => i.title === 'cs3' && i.status)"></el-table-column>
            <el-table-column prop="cs4" align="center" label="cs4" v-if="titleListLocal.some(i => i.title === 'cs4' && i.status)"></el-table-column>
            <el-table-column prop="cs5" align="center" label="cs5" v-if="titleListLocal.some(i => i.title === 'cs5' && i.status)"></el-table-column>
          </el-table>
          <div class="page-center" v-if="tableData.length !== 0">
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
      </el-col>
    </div>
  </flex-grow-row>
</template>

<script>
import { saveAs } from 'file-saver';
import * as API from '@/utils/constants/api';
import xlsDownload from '@/utils/xls-download';
import tableMemory from '@/components/table-memory';

export default {
  components: {
    tableMemory,
  },
  data() {
    return {
      permission: this.$route.matched[1].permission,
      isKeyWordSearch: true,
      searchForm: {
        test: '',
        currentPage: 1,
        pageSize: 30,
      },
      loading: false,
      tableHeight: -50,
      totalRow: 1,
      tableData: [],
      selectTableData: null,
      titleListLocal: [
        {
          name: 'cs1',
          title: 'cs1',
          status: true,
          isDisabled: true,
        },
        {
          name: 'cs2',
          title: 'cs2',
          status: true,
        },
        {
          name: 'cs3',
          title: 'cs3',
          status: true,
        },
        {
          name: 'cs4',
          title: 'cs4',
          status: true,
        },
        {
          name: 'cs5',
          title: 'cs5',
          status: true,
        },
      ],
      testList: [],
      dateValue: null, // 时间控件
    };
  },
  computed: {
    tableTitle() {
      return `${this.$store.state.user.username}-${this.$store.path}`;
    },
  },
  created() {

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
    getList() {},
    search() {
      this.searchForm.currentPage = 1;
      if (!this.dateValue) {
        this.searchForm.startTime = '';
        this.searchForm.endTime = '';
      } else {
        [this.searchForm.startTime, this.searchForm.endTime] = this.dateValue;
      }
      this.getList();
    },
    resetsearchForm() {
      this.$refreshView();
    },
    handleSuccess() {},
    handleWarning() {},
    handlePrimary() {},
    handleDanger() {},
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    // 翻页
    handleCurrentChange() {
      this.getList();
    },
    // 每页加载
    handleSizeChange(val) {
      this.searchForm.pageSize = val;
      this.getList();
    },
    handleTitleChange(newTitleList) {
      this.titleListLocal = newTitleList;
    },
    exportData1() {
      xlsDownload.iframeDownLoad(`${API.baseUrl}`);
    },
    exportData2() {
      this.$http.request({
        methods: 'POST', // GET
        url: '123',
        data: {}, // GET 不需要
        responseType: 'blob',
      }).then((res) => {
        const filename = res.headers['content-disposition'].split('filename')[1].replace(/"/g, '');
        saveAs(res.data, decodeURI(filename));
      }).catch(() => {});
    },
  },
};
</script>

<style scoped>
  .base-warp {
    width: calc(100%);
  }
  .tal {
    flex: 1 1 auto;
    width: initial;
  }
  .tar {
    flex: 0 0 auto;
    align-self: flex-end;
    text-align: right;
    padding-bottom: 20px;
    width: initial;
  }
  .page-center {
    margin-top: 20px;
    text-align: center;
  }
</style>
