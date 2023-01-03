<template>
  <div style="display: inline-block;">
    <el-button type="primary" icon="el-icon-setting" size="mini" @click="show">表格列配置</el-button>
    <dialog-table-memory
      v-if="dialogTableMemoryShow"
      :dialogShow="dialogTableMemoryShow"
      :titleList="titleList"
      @closeDialog="closeDialogTableMemory">
    </dialog-table-memory>
  </div>
</template>

<script>
import _ from 'lodash';

import _localStorage from '@/utils/storage/local-storage';

import dialogTableMemory from './components/dialog-table-memory';

export default {
  components: {
    dialogTableMemory,
  },
  props: {
    titleList: {
      type: Array,
      required: true,
    },
    tableTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialogTableMemoryShow: false,
      titleListClone: [],
    };
  },
  created() {
    const savedTitleList = _localStorage.get(this.tableTitle);
    if (savedTitleList) {
      const compatibleTitleList = this.tableMemoryCompatible(savedTitleList, this.titleList);
      _localStorage.set(this.tableTitle, compatibleTitleList);
      this.$emit('title-change', compatibleTitleList);
    }
    this.titleListClone = this.titleList;
  },
  methods: {
    show() {
      this.dialogTableMemoryShow = true;
    },
    closeDialogTableMemory(titleListClone) {
      this.dialogTableMemoryShow = false;
      if (titleListClone) {
        _localStorage.set(this.tableTitle, titleListClone);
        this.$emit('title-change', titleListClone);
      }
    },
    /**
     * 此方法用于表格列配置
     * 若前端项目更新了表格列配置的对应表格，如对表格增加、减少、修改了若干列，则需要对本地存储的内容进行对应兼容
     *
     * @param {array} savedTitleList
     * @param {array} localTitleList
     * @return {array} compatibleTitleList
     */
    tableMemoryCompatible(savedTitleList, localTitleList) {
      return localTitleList.map((itemLocal) => {
        const itemLocalClone = _.cloneDeep(itemLocal);
        const foundItem = savedTitleList.find(itemSaved => itemLocalClone.title === itemSaved.title);
        if (foundItem) {
          itemLocalClone.status = foundItem.status;
        }
        return itemLocalClone;
      });
    },
  },
};
</script>>
