<template>
  <flex-grow-row>
    <div class="details-width">
      <el-row type="flex" justify="space-between">
        <el-button size="mini" type="info" icon="el-icon-back" @click="back">返回</el-button>
        <el-button size="mini" type="primary" :loading="loading" @click="save">保存</el-button>
      </el-row>
      <el-col :span="24" :xl="24">
        <el-form size="mini" :inline="true" label-width="90px" ref="formRef" :model="searchForm">
          <div class="detail-tit">基本信息</div>
          <el-row>
            <el-col class="tal">
              <el-form-item
                label="msg-1"
                prop="msgOne"
                :rules="[
                  {required: true, message: '请输入msg', trigger: 'blur'},
                ]">
                <el-input class="middle-input-width" placeholder="请输入" v-model.trim="searchForm.msgOne"></el-input>
              </el-form-item>
              <el-form-item
                label="msg-2"
                prop="msgTwo"
                :rules="[
                  {required: true, message: '请输入msg', trigger: 'blur'},
                  {pattern: /^[1-9][0-9]{0,4}$|^1[0-9]{0,4}$|^0$|^99999$/, message: '0至99999的整数', trigger: 'blur'},
                  {validator: checkInput.bind(this, 500), trigger: 'blur'},
                ]">
                <el-input class="middle-input-width" placeholder="请输入" v-model.trim="searchForm.msgTwo"></el-input>
              </el-form-item>
              <el-form-item
                label="msg-3"
                prop="msgThree"
                :rules="[
                  {required: true, message: '请输入msg', trigger: 'blur'},
                ]">
                <el-input class="middle-input-width" placeholder="请输入" v-model.trim="searchForm.msgThree"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </div>
  </flex-grow-row>
</template>

<script>
export default {
  data() {
    const checkInput = (val, rule, value, callback) => {
      if (Number(value) > val) {
        callback(new Error('不能大于msg2的限定值'));
        return;
      }
      callback();
    };
    return {
      checkInput,
      searchForm: {
        msgOne: '',
        msgTwo: '',
        msgThree: '',
      },
      loading: false,
    };
  },
  methods: {
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
    save() {
      this.$refs.formRef.validate((valid) => {
        if (!valid) return;
        this.loading = true;
      });
    },
  },
};
</script>

<style scoped>
  .details-width {
    width: 100%;
  }
  .detail-tit {
    font-size: 16px;
    line-height: 35px;
    margin: 10px 0;
    padding: 0 0 3px 10px;
    border-bottom: 1px dashed #d8dce5;
  }
</style>
