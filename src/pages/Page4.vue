<template>
  <Button :value="value" :onClick="buttonClick"></Button>
  <Input :value="inputValue" :onChange="inputChange"></Input>
</template>

<script>
import Button from "@/components/base_components/Button.vue";
import Input from "@/components/base_components/Input.vue";
import { ref } from "vue";

export default {
  components: {
    Button,
    Input,
  },
  setup() {
    const value = ref("123");
    const inputValue = ref("");

    const buttonClick = () => {
      console.log(222);
    };

    const inputChange = (value) => {
      inputValue.value = value;
    };

    return {
      value,
      inputValue,
      buttonClick,
      inputChange,
    };
  },
};
</script>

<style></style>
