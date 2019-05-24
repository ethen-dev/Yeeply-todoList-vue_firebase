<template>
    <div id="app">
        <div id="nav">
            <!-- <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> -->
        </div>
        <div 
            class="add"
            @click="changePanelState()"
        >
            <div 
                class="plus"
                :class="{ open: panelOpen }"
            >+</div>
        </div>
        <router-view />
        <task-panel
            :class="{ open: panelOpen }"
        />
    </div>
</template>

<script>
import TaskPanel from './components/TaskPanel';

export default {
    components: {
        TaskPanel
    },
    computed: {
        panelOpen() {
            return this.$store.state.panelOpen;
        }
    },
    methods: {
        changePanelState() {
            if (!this.panelOpen) {
                this.$store.commit('setPanelActive', 'add');
                this.$store.commit('setPanelOpen', true);
            } else {
                this.$store.commit('setPanelOpen', false);
                this.$store.commit('setTabActiveId', '');
            }
        }
    }
}
</script>


<style lang="scss">
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom, #dadada, #ffffff);
}
#nav {
    padding: 0 30px;
}

.add {
    position: fixed;
    z-index: 10;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: 0px 0px 5px 5px rgba(222,222,222,1);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    .plus {
        font-size: 35px;
        color: orange;
        transition: ALL 0.5S ease-in-out;
        &.open {
            transform: rotate(45deg);
            color: red;
        }
    } 
}
</style>
