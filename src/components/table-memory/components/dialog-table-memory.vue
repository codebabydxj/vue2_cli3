<template>
  <el-dialog
    width="600px"
    title="表格列配置"
    :append-to-body="true"
    :visible="dialogShow"
    :before-close="cancel">
    <el-row type="flex" justify="center">
      <el-table
        size="mini"
        :data="titleListClone"
        :border="true"
        :stripe="true"
        :max-height="400">
        <el-table-column type="index" align="center" label="序号"></el-table-column>
        <el-table-column prop="name" align="center" label="列名称"></el-table-column>
        <el-table-column align="center" label="是否显示">
          <template slot-scope="scope">
            <el-switch active-color="#13ce66" inactive-color="#d8dce5" :disabled="scope.row.isDisabled" v-model="scope.row.status"></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="cancel">取消</el-button>
      <el-button size="mini" type="primary" @click="update">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    dialogShow: {
      type: Boolean,
    },
    titleList: {
      type: Array,
    },
  },
  data() {
    return {
      titleListClone: _.cloneDeep(this.titleList),
    };
  },
  methods: {
    cancel() {
      this.$emit('closeDialog', false);
    },
    update() {
      this.$emit('closeDialog', this.titleListClone);
    },
  },
};
</script>
