<template>
  <div class="TextFile">
    <button class="TextFile__btn --flex btn" tabindex="2">
      <TextFileIcon />
      {{ name }}
    </button>
  </div>
</template>

<script>
import TextFileIcon from "@/components/TextFileIcon";
export default {
  name: "TextFile",
  components: { TextFileIcon },
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
