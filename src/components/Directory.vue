<template>
  <div class="Directory">
    <PButton
      class="Directory__btn --flex"
      :aria-labelledby="'Open' + name + 'folder'"
      @dblclick="emitClick"
      @click="emitClick"
      tabindex="1"
    >
      <template #content>
        <component :is="currentFolder"></component>
        {{ name }}
      </template>
    </PButton>
  </div>
</template>

<script>
import { PButton } from "pomelo-lib-vue";
import ClosedFolder from "@/components/ClosedFolder";
import OpenFolder from "@/components/OpenFolder";

export default {
  name: "Directory",
  props: {
    name: {
      type: String,
      default: null
    },
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"],
  components: {
    ClosedFolder,
    OpenFolder,
    PButton
  },
  computed: {
    currentFolder() {
      return this.open ? OpenFolder : ClosedFolder;
    }
  },
  methods: {
    emitClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="less" scoped>
.Directory__btn {
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

@media only screen and (max-width: 525px) {
  .Directory {
    display: flex;
    justify-content: center;
    align-items: start;
  }
}
</style>
