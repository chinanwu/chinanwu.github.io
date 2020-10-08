<template>
  <div class="Web">
    <button class="Web__btn --flex button" tabindex="2" @click="emitClick">
      <WebIcon />
      {{ name }}
    </button>
  </div>
</template>

<script>
import WebIcon from "@/components/WebIcon";

export default {
  name: "Web",
  components: { WebIcon },
  emits: ["click"],
  props: {
    name: {
      type: String,
      default: null
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
.Web {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

::v-deep(.Web__btn) {
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
  .Web {
    margin-top: 1rem;
    margin-left: 2rem;
    margin-right: 2rem;
  }
}
</style>
