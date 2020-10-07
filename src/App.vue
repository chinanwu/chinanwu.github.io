<template>
  <header class="App__header">
    <div class="--flex">
      <div class="App__headerDropdown">
        <PButton class="App__headerBtn" @click="dropdownOpen = !dropdownOpen">
          <template #content>
            🤠
          </template>
        </PButton>
        <ul
          class="App__headerDropdownOpts"
          v-if="dropdownOpen"
          v-click-outside.close="closeDropdown"
        >
          <li>
            <PButton class="App__headerDropdownOpt">
              <template #content>About This Site</template>
            </PButton>
          </li>
          <li id="lastchild">
            <PButton class="App__headerDropdownOpt">
              <template #content>About Salmon</template>
            </PButton>
          </li>
        </ul>
      </div>
      <h1 class="App__headerName --flex">CHINANWU</h1>
    </div>

    <div class="--flex App__time">
      <span class="App__timeHour">
        {{ 10 > time.hours ? "0" + time.hours : time.hours }}
      </span>
      <span>{{ 10 > time.minutes ? "0" + time.minutes : time.minutes }}</span>
    </div>
  </header>

  <div class="App__desktop">
    <Directory name="Projects" :open="open" @click="open = !open" />
    <TextFile name="Resume" />
  </div>

  <div class="App_finder" v-if="open">
    <div class="App__finderHeader">
      <PButton class="App__finderHeaderClose" @click="open = false"></PButton>
      Projects
    </div>
  </div>
</template>

<script>
import { PButton } from "pomelo-lib-vue";
import Directory from "@/components/Directory";
import TextFile from "@/components/TextFile";

export default {
  name: "App",
  data() {
    return {
      open: false,
      time: {
        hours: new Date().getHours(),
        minutes: new Date().getMinutes()
      },
      dropdownOpen: false
    };
  },
  components: {
    TextFile,
    Directory,
    PButton
  },
  mounted() {
    this.getTime();
  },
  methods: {
    getTime() {
      setInterval(() => {
        const date = new Date();
        this.time = {
          hours: date.getHours(),
          minutes: date.getMinutes()
        };
      }, 1000);
    },
    closeDropdown() {
      this.dropdownOpen = false;
    }
  },
  directives: {
    clickOutside: {
      mounted(el, binding) {
        const children = el.childNodes;
        const handleMouseDown = e => {
          const target = e.target;

          for (let i = 0; i < children.length; i++) {
            if (children[i] === target) {
              return;
            }
          }

          binding.value();
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("keydown", e => {
          const target = e.target.parentElement;
          const lastChild = children[children.length - 1];

          console.log(target);
          console.log(lastChild);

          if (target === lastChild && !e.shiftKey && e.keyCode === 9) {
            binding.value();
          }
        });
      },
      unmounted(el, binding) {
        const handleMouseDown = e => {
          const children = el.childNodes;
          const target = e.target;

          for (let i = 0; i < children.length; i++) {
            if (children[i] === target) {
              return;
            }
          }

          binding.value();
        };

        document.removeEventListener("mousedown", handleMouseDown);
      }
    }
  }
};
</script>

<style lang="less">
* {
  font-family: "Roboto Mono", monospace;
}

html,
body {
  min-height: 100%;
  height: 100%;
  margin: 0;
}

html {
  font-size: 62.5%;
}

body {
  font-size: 1.4rem;
  background-color: #c6d0d2;
}

h1 {
  font-size: 2.4rem;
  margin: 0;
  padding: 1rem;
}

h2 {
  font-size: 2rem;
  margin: 0;
  padding: 1rem;
}

h3 {
  font-size: 1.8rem;
  margin: 0;
  padding: 1rem;
}

h4 {
  font-size: 1.6rem;
  margin: 0;
  padding: 1rem;
}

p {
  padding-left: 1rem;
  padding-right: 1rem;
}

.--no-margin {
  margin: 0;
}

.--flex {
  display: flex;
}

#app {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style lang="less" scoped>
.App__header {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: space-between;
  font-size: 3.2rem;
  position: absolute;
  top: 0;
}

.App__headerBtn {
  font-size: 3rem;
  background: none;
  border: none;
  border-radius: 0;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.3);
  }
}

.App__headerDropdownOpts {
  position: absolute;
  list-style: none;
  padding: 0;
  margin: 0;
  background: rgba(255, 255, 255, 0.6);
  font-size: 1.6rem;
}

.App__headerDropdownOpt {
  border: none;
  padding: 1rem;
  width: 100%;
  text-align: left;
  border-radius: 0;
  font-size: 1.6rem;

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.8);
  }
}

.App__headerName {
  align-items: center;
}

.App__headerName::after {
  content: ".GITHUB.IO";
}

.App__time {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.App__timeHour::after {
  content: ":";
  animation: blink 1s infinite;
}

@keyframes blink {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.App__desktop {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 3rem;
  transform: translateY(8rem);
  top: 0;
}

.App_finder {
  width: 50rem;
  height: 30rem;
  background-color: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12),
    0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.App__finderHeader {
  background-color: #efefef;
  display: flex;
}

.App__finderHeaderClose {
  height: 18px;
  width: 18px;
  background-color: #e87171;
  border-radius: 50%;
  margin: 0.8rem;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s;

  &:focus::before,
  &:hover::before {
    content: "X";
  }

  &:hover,
  &:focus {
    box-shadow: 0 0 0 0.4rem rgba(232, 113, 113, 0.3);
  }

  &:active {
    box-shadow: 0 0 0 0.2rem rgba(232, 113, 113, 0.3);
    background-color: #dd6b6b;
  }
}
</style>
