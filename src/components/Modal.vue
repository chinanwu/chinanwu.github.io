<template>
  <div class="Modal" :class="{ 'Modal--dark': darken }">
    <Finder :label="label" @close="emitClose">
      <template #content>
        <slot name="content"></slot>
      </template>
    </Finder>
  </div>
</template>

<script>
import Finder from "@/components/Finder";

// TODO focus trap!

export default {
  name: "Modal",
  components: {
    Finder
  },
  props: {
    label: {
      type: String,
      default: null
    },
    darken: {
      type: Boolean,
      default: true
    }
  },
  emits: ["close"],
  methods: {
    emitClose() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="less" scoped>
.Modal {
  width: 100%;
  min-height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Modal--dark {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
