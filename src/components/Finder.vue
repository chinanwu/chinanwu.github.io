<template>
  <div class="Finder">
    <div class="Finder__header">
      <PButton
        class="Finder__closeBtn"
        @click="handleClick"
        @keydown="handleKeyDown"
        tabindex="1"
      ></PButton>
      <h2 class="Finder__headerLabel">{{ label }}</h2>
    </div>

    <slot name="content"></slot>

    <div class="Finder__closeBtnContainer--mobile">
      <PButton
        class="Finder__closeBtn--mobile"
        @click="handleClick"
        @keydown="handleKeyDown"
      >
        <template #content>
          CLOSE
        </template>
      </PButton>
    </div>
  </div>
</template>

<script>
import { PButton } from "pomelo-lib-vue";

export default {
  name: "Finder",
  props: {
    label: {
      type: String,
      default: null
    }
  },
  emits: ["close"],
  methods: {
    handleClick() {
      this.$emit("close");
    },
    handleKeyDown(event) {
      if (
        event &&
        event.key &&
        !event.shiftKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        (event.key === "enter" || event.key === "space")
      ) {
        event.preventDefault();
        this.handleClick();
      }
    }
  },
  components: {
    PButton
  }
};
</script>

<style lang="less" scoped>
.Finder {
  width: 50rem;
  height: 30rem;
  background-color: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: auto;
}

.Finder__header {
  background-color: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Finder__closeBtn {
  height: 18px;
  width: 18px;
  background-color: #e87171;
  border-radius: 50%;
  margin: 0.8rem;
  border: none;
  transition: all 0.2s;
  position: absolute;
  left: 0.5rem;

  &:hover,
  &:focus {
    box-shadow: 0 0 0 0.4rem rgba(232, 113, 113, 0.3);
  }

  &:active {
    box-shadow: 0 0 0 0.2rem rgba(232, 113, 113, 0.3);
    background-color: #dd6b6b;
  }
}

.Finder__closeBtnContainer--mobile {
  display: none;
}

@media only screen and (max-width: 525px) {
  .Finder {
    width: 100%;
    min-height: 100%;
    position: fixed;
    top: 0;
  }

  .Finder__closeBtn {
    display: none;
  }

  .Finder__headerLabel {
    font-size: 3rem;
  }

  .Finder__closeBtnContainer--mobile {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .Finder__closeBtn--mobile {
    padding: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.08);
    font-size: 2.2rem;
    transition: all 0.2s;

    &:hover,
    &:focus {
      box-shadow: 0 0 0 0.6rem rgba(0, 0, 0, 0.04);
    }

    &:active {
      box-shadow: 0 0 0 0.3rem rgba(0, 0, 0, 0.04);
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
}
</style>
