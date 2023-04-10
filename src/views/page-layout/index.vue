<template>
  <yh-page-layout
    v-model:page-current="params.current"
    v-model:page-size="params.size"
    v-model:search-expand="searchExpand"
    :pape-total="params.total"
  >
    <template #search>
      <el-form ref="form" :model="params" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="参数编码：" prop="paramCode">
              <el-input v-model="params.current" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="参数值：" prop="paramValue">
              <el-input v-model="params.current" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="参数值：" prop="paramValue">
              <el-input v-model="params.current" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="参数值：" prop="paramValue">
              <el-input v-model="params.current" />
            </el-form-item>
          </el-col>
          <el-col v-show="searchExpand" :span="6">
            <el-form-item label="参数值：" prop="paramValue">
              <el-input v-model="params.current" />
            </el-form-item>
          </el-col>
          <el-col v-show="searchExpand" :span="6">
            <el-form-item label="参数值：" prop="paramValue">
              <el-input v-model="params.current" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>

    <template #tab>
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="披露邮箱" name="first"></el-tab-pane>
        <el-tab-pane label="托管行邮箱" name="second"></el-tab-pane>
      </el-tabs>
    </template>

    <yh-radio-tab>
      <el-radio-group size="small" :model-value="'report'">
        <el-radio-button label="chapter">章节</el-radio-button>
        <el-radio-button label="report">报告</el-radio-button>
      </el-radio-group>
    </yh-radio-tab>

    <yh-confirmbox><el-button>22</el-button></yh-confirmbox>

    <yh-tab v-model="tab">
      <yh-tab-item :badge="21" label="全部" value="1"></yh-tab-item>
      <yh-tab-item :badge="0" label="待办" value="2"></yh-tab-item>
      <yh-tab-item :badge="3" label="已办" value="3"></yh-tab-item>
    </yh-tab>

    <el-form
      ref="formRef"
      :model="dynamicValidateForm"
      label-position="left"
      label-width="120px"
      class="demo-dynamic"
    >
      <el-form-item
        prop="email"
        label="Email"
        :rules="[
          {
            required: true,
            message: 'Please input email address',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="dynamicValidateForm.email" />
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :key="domain.key"
        :label="'Domain' + index"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true,
          message: 'domain can not be null',
          trigger: 'blur',
        }"
      >
        <el-input v-model="domain.value" />
        <el-button class="mt-2" @click.prevent="removeDomain(domain)">
          Delete
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(formRef)">
          Submit
        </el-button>
        <el-button @click="addDomain">New domain</el-button>
        <el-button @click="resetForm(formRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </yh-page-layout>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { http } from "../../../packages";

const params = reactive({
  current: 1,
  size: 15,
  total: 100,
});

const searchExpand = ref(false);

const activeName = ref("");

http.get("", {
  loading: true,
  timeout: 10,
});

const tab = ref("1");

// const onDownload = () => {
//   http.post(
//     "/yhinn-announce/reportInfo/previewHistoryReport",
//     ["15163289655648051212"],
//     {
//       loading: true,
//       preview: true,
//     },
//   );
// };

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{
  domains: DomainItem[];
  email: string;
}>({
  domains: [
    {
      key: 1,
      value: "",
    },
  ],
  email: "",
});

interface DomainItem {
  key: number;
  value: string;
}

const removeDomain = (item: DomainItem) => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};

const addDomain = () => {
  dynamicValidateForm.domains.push({
    key: Date.now(),
    value: "",
  });
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<script lang="ts">
export default {
  name: "PageLayout",
};
</script>

<style lang="scss" scoped></style>
