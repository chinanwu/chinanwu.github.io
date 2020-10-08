<template>
  <header class="App__header">
    <div class="--flex">
      <div class="App__headerDropdown">
        <PButton class="App__headerBtn" @click="handleDropdown">
          <template #content>
            🤠
          </template>
        </PButton>
        <ul
          class="App__headerDropdownOpts"
          v-if="openDropdown"
          v-click-outside.close="closeDropdown"
        >
          <li>
            <PButton class="App__headerDropdownOpt" @click="openSiteModal">
              <template #content>About This Site</template>
            </PButton>
          </li>
          <li>
            <PButton class="App__headerDropdownOpt" @click="openSalmonModal">
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

  <div class="App__desktopIcons">
    <Directory
      name="Projects"
      :open="openProjects"
      @click="openProjects = true"
      @keydown="handleKeyDown"
    />
    <TextFile name="Resume" @click="goTo(require('./assets/resume.pdf'))" />
    <Web name="Personal Site" @click="goTo('https://chinanwu.com')" />
  </div>

  <Modal
    v-if="openProjects"
    label="Projects"
    @close="closeProjects"
    :darken="false"
  >
    <template #content>
      <div class="App__projects">
        <Directory
          class="App__project"
          v-for="(project, index) in projects"
          :name="project.name"
          :key="'project-' + index"
          @click="goTo(project.link)"
        />
      </div>
    </template>
  </Modal>

  <Modal v-if="openAboutSite" label="About This Site" @close="closeSiteModal">
    <template #content>
      <div class="App__aboutSite">
        <SalmonIcon />
        <div>
          <div>
            <h2 class="App__siteHeader">
              chinanwu<span class="App__siteHeader--weak">.github.io</span>
            </h2>
            <p class="App__siteVersion">Version 1.0.0</p>
          </div>
          <section class="App__siteDetails">
            <p>Hosted on <strong>Github Pages</strong></p>
            <p>Made with <strong>Vue</strong></p>
            <p>Designed with <strong>Figma</strong></p>
            <p>Created by <strong>Chin-An Wu</strong></p>
          </section>
        </div>
      </div>
    </template>
  </Modal>

  <Modal v-if="openAboutSalmon" label="About Salmon" @close="closeSalmonModal">
    <template #content>
      <h2 class="App__salmonHeader">
        Chin-An (Salmon) Wu
      </h2>

      <ul class="App__aboutSalmonList">
        <li class="App__aboutSalmonListItem">THEY/THEM</li>
        <li class="App__aboutSalmonListItem">TORONTO-BASED</li>
        <li class="App__aboutSalmonListItem">SOFTWARE DEVELOPER</li>
      </ul>

      <p class="App__salmonBlurb">
        Salmon is a Toronto-based Software Developer. They grew up in Vancouver,
        BC (UBC alum) and love playing ice hockey. Access their personal site
        (not this site funnily enough) @
        <a href="https://chinanwu.com" title="Chin-An Wu's Personal Site">
          chinanwu.com</a
        >.
      </p>
    </template>
  </Modal>
</template>

<script>
import { PButton } from "pomelo-lib-vue";
import Directory from "@/components/Directory";
import Modal from "@/components/Modal";
import SalmonIcon from "@/components/SalmonIcon";
import TextFile from "@/components/TextFile";
import Web from "@/components/Web";

// TODO: Add keydown stuff for everything
// TODO: Make sure modals have label set or aria-label set
// TODO: Update resume

export default {
  name: "App",
  data() {
    return {
      time: {
        hours: new Date().getHours(),
        minutes: new Date().getMinutes()
      },
      openProjects: false,
      openDropdown: false,
      openAboutSite: false,
      openAboutSalmon: false,
      projects: [
        {
          name: "Delta",
          link: "https://delta.chinanwu.com"
        },
        {
          name: "Pomelo",
          link: "https://chinanwu.github.io/pomelo-lib"
        },
        {
          name: "DND",
          link: "https://chinanwu.github.io/dragons-n-dungeons"
        },
        {
          name: "Affirmer",
          link: "https://chinanwu.github.io/affirmer"
        },
        {
          name: "Magnet Poetry",
          link: "https://chinanwu.github.io/magnet-poetry"
        },
        {
          name: "This Site",
          link: "https://github.com/chinanwu/chinanwu.github.io"
        }
      ]
    };
  },
  components: {
    SalmonIcon,
    TextFile,
    Directory,
    PButton,
    Web,
    Modal
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
    handleDropdown() {
      this.openDropdown = !this.openDropdown;
    },
    closeDropdown() {
      this.openDropdown = false;
    },
    handleKeyDown(event) {
      if (
        event &&
        event.key &&
        !event.shiftKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        (event.key === "enter" || event.key === "space") // if enter or space is pressed
      ) {
        event.preventDefault();
        this.openProjects = true;
      }
    },
    openSiteModal() {
      this.openDropdown = false;
      this.openAboutSite = true;
    },
    openSalmonModal() {
      this.openDropdown = false;
      this.openAboutSalmon = true;
    },
    closeSiteModal() {
      this.openAboutSite = false;
    },
    closeSalmonModal() {
      this.openAboutSalmon = false;
    },
    closeProjects() {
      this.openProjects = false;
    },
    goTo(url) {
      window.open(url);
    }
  },
  directives: {
    clickOutside: {
      mounted(el, binding) {
        const children = el.childNodes;
        const handleMouseDown = e => {
          const target = e.target.parentElement;

          for (let i = 0; i < children.length; i++) {
            if (children[i] === target) {
              return;
            }
          }

          binding.value();
          document.removeEventListener("mousedown", handleMouseDown);
          document.removeEventListener("keydown", handleMouseDown);
        };

        document.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("keydown", handleMouseDown);
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
  //justify-content: center;
  //align-items: center;
}

@media only screen and (max-width: 375px) {
  #app {
    display: initial;
  }
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
  z-index: 1;
}

.App__headerDropdownOpt {
  border: none;
  padding: 1rem;
  width: 100%;
  text-align: left;
  border-radius: 0;
  font-size: 1.6rem;
  display: flex;

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

.App__desktopIcons {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  right: 3rem;
  transform: translateY(8rem);
}

.App__projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  justify-items: center;
}

.App__project {
  margin: 1rem;
}

.App__aboutSite {
  display: flex;
  align-items: center;
  height: 70%;
  justify-content: space-around;
}

.App__siteHeader {
  padding-bottom: 0;
}

.App__siteHeader--weak {
  font-weight: 100;
}

.App__siteVersion {
  margin-top: 0;
}

.App__siteDetails p {
  margin: 0;
}

.App__aboutSalmonList {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0 0 0 1rem;
}

.App__aboutSalmonListItem::after {
  content: "\00a0|\00a0";
}

.App__aboutSalmonListItem:nth-child(3)::after {
  content: "";
}

@media only screen and (max-width: 375px) {
  .App__header {
    position: initial;
  }

  .App__headerName::after {
    content: "";
  }

  .App__headerDropdownOpt {
    font-size: 2.4rem;
  }

  .App__time {
    display: none;
  }

  .App__desktopIcons {
    position: initial;
    transform: translateY(0);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
    width: 100%;
  }

  .App__projects {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
  }

  .App__aboutSite {
    flex-direction: column;
  }

  .App__siteHeader,
  .App__salmonHeader {
    font-size: 3rem;
  }

  .App__siteVersion,
  .App__siteDetails,
  .App__aboutSalmonList,
  .App__salmonBlurb {
    font-size: 2.2rem;
  }

  .App__aboutSalmonList {
    flex-direction: column;
  }

  .App__aboutSalmonListItem::after {
    content: "";
  }
}
</style>
