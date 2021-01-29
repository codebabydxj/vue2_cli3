<template>
  <el-dialog
    width="500px"
    title="新增"
    :visible="addShow"
    :close-on-click-modal="false"
    :before-close="cancel">
    <el-row type="flex" justify="center">
      <el-col :span="20">
        <el-form
          ref="form"
          size="mini"
          label-width="80px"
          :model="searchForm"
          :rules="rules">
          <el-form-item label="名称" prop="name">
            <el-input placeholder="请输入名称" v-model.trim="searchForm.name"></el-input>
          </el-form-item>
          <el-form-item label="资源" prop="source">
            <el-select placeholder="请选择"  v-model="searchForm.source">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" :value="true"></el-option>
              <el-option label="否" :value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              type="textarea"
              placeholder="请输入备注 限200字"
              v-model.trim="searchForm.remark"
              :autosize="{ minRows: 2, maxRows: 4 }"
              :rows="3">
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="dialog-footer" slot="footer">
      <el-button size="mini" @click="cancel">取消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="save">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import * as API from '@/utils/constants/api';

export default {
  props: ['addShow'],
  data() {
    return {
      loading: false,
      searchForm: {
        name: '',
        remark: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
        source: [
          { required: true, message: '请选择资源', trigger: 'blur' },
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    cancel() {
      this.$emit('closeDialogCb');
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.$http.post(API.rememberLogin, this.searchForm, API.formDataConfig)
            .then(() => {
              this.$emit('closeDialogCb', true);
            }).catch(() => {
            }).finally(() => {
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>

<style scoped>

</style>
