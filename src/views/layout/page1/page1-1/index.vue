<template>
  <flex-grow-row>
    <div class="base-warp">
      <el-col :span="24">
        <el-row>
          <el-col class="tal">
            <el-form size="mini" :inline="true" :model="searchForm">
              <el-form-item label="测试1">
                <el-input class="input-width" placeholder="请输入测试1" v-model.trim="searchForm.cs1"></el-input>
              </el-form-item>
               <el-form-item label="测试1">
                <el-input class="input-width" placeholder="请输入测试1" v-model.trim="searchForm.cs1"></el-input>
              </el-form-item>
               <el-form-item label="测试1">
                <el-input class="input-width" placeholder="请输入测试1" v-model.trim="searchForm.cs1"></el-input>
              </el-form-item>
               <el-form-item label="测试1">
                <el-input class="input-width" placeholder="请输入测试1" v-model.trim="searchForm.cs1"></el-input>
              </el-form-item>
               <el-form-item label="测试1">
                <el-input class="input-width" placeholder="请输入测试1" v-model.trim="searchForm.cs1"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
                <el-button type="info" @click="resetsearchForm">重置</el-button>
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
              <el-table-column width="55" type="selection" align="center"></el-table-column>
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
import tableMemory from '@/components/table-memory';

export default {
  components: {
    tableMemory,
  },
  data() {
    return {
      permission: this.$route.matched[1].permission,
      searchForm: {
        currentPage: 1,
        pageSize: 30,
      },
      loading: false,
      tableHeight: -50,
      totalRow: 1,
      tableData: [],
      selectTableList: [],
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
    getList() {},
    search() {
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
      this.selectTableList = val;
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
