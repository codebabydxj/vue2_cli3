<template>
  <flex-grow-row>
    <div class="base-warp">
      <el-col :span="4" :xl="3">
        <el-tree
          node-key="id"
          accordion
          :data="treeList"
          :props="{children: 'childList', label: 'label'}"
          :highlight-current="true"
          :expand-on-click-node="false"
          :default-expanded-keys="[treeList[0].id]"
          @node-click="handleNodeClick">
        </el-tree>
      </el-col>
      <el-col class="col_r" :span="20" :xl="21">
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
            <el-table-column width="55" align="center" type="selection"></el-table-column>
            <el-table-column prop="date" align="center" label="日期" v-if="titleListLocal.some(i => i.title === '日期' && i.status)"></el-table-column>
            <el-table-column prop="name" align="center" label="姓名" v-if="titleListLocal.some(i => i.title === '姓名' && i.status)"></el-table-column>
            <el-table-column prop="province" align="center" label="省份" v-if="titleListLocal.some(i => i.title === '省份' && i.status)"></el-table-column>
            <el-table-column prop="city" align="center" label="市区" v-if="titleListLocal.some(i => i.title === '市区' && i.status)"></el-table-column>
            <el-table-column prop="address" align="center" label="地址" v-if="titleListLocal.some(i => i.title === '地址' && i.status)"></el-table-column>
            <el-table-column prop="zip" align="center" label="邮编" v-if="titleListLocal.some(i => i.title === '邮编' && i.status)"></el-table-column>
            <el-table-column align="center" label="操作" v-if="titleListLocal.some(i => i.title === '操作' && i.status)">
              <template>
                <el-button type="text" size="mini">查看</el-button>
                <el-button type="text" size="mini">编辑</el-button>
              </template>
            </el-table-column>
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
      selectTableData: null,
      dateValue: null, // 时间控件
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333,
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333,
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333,
        },
      ],
      titleListLocal: [
        {
          name: '日期',
          title: '日期',
          status: true,
          isDisabled: true,
        },
        {
          name: '姓名',
          title: '姓名',
          status: true,
        },
        {
          name: '省份',
          title: '省份',
          status: true,
        },
        {
          name: '市区',
          title: '市区',
          status: true,
        },
        {
          name: '邮编',
          title: '邮编',
          status: true,
        },
        {
          name: '地址',
          title: '地址',
          status: true,
        },
        {
          name: '操作',
          title: '操作',
          status: true,
        },
      ],
      testList: [],
      treeList: [
        {
          id: 1,
          label: '一级目录',
          childList: [
            {
              label: '二级 1-1',
              childList: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
            {
              label: '二级 1-2',
              childList: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
            {
              label: '二级 1-3',
              childList: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
            {
              label: '二级 1-4',
              childList: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
            {
              label: '二级 1-5',
              childList: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
            {
              label: '二级 1-6',
              childList: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
            {
              label: '二级 1-7',
              childList: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
            {
              label: '二级 1-8',
              childList: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
            {
              label: '二级 1-9',
              childList: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
            {
              label: '二级 1-10',
              childList: [
                {
                  label: '三级 1-1-1',
                },
              ],
            },
          ],
        },
      ],
    };
  },
  computed: {
    tableTitle() {
      return `${this.$store.state.user.username}-${this.$store.path}`;
    },
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
    handleNodeClick() {},
    handleSuccess() {},
    handleWarning() {},
    handlePrimary() {},
    handleDanger() {},
    handleDetails() {
      this.$openView(`${this.$route.path}/page2-1-details`);
    },
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
  .col_r {
    float: right;
    padding-left: 15px;
  }
  .page-center {
    margin-top: 20px;
    text-align: center;
  }
</style>
