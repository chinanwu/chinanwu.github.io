<template>
  <div class="TextFile">
    <PButton class="TextFile__btn --flex" tabindex="2">
      <template #content>
        <TextFileIcon />
        {{ name }}
      </template>
    </PButton>
  </div>
</template>

<script>
import { PButton } from "pomelo-lib-vue";
import TextFileIcon from "@/components/TextFileIcon";
export default {
  name: "TextFile",
  components: { TextFileIcon, PButton },
  props: {
    name: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="less" scoped>
.TextFile {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

::v-deep(.TextFile__btn) {
  flex-direction: column;
  font-size: 2.4rem;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;
  border-radius: 1rem;
  padding: 1rem;
  border: none;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0.5rem);
  }
}
</style>
