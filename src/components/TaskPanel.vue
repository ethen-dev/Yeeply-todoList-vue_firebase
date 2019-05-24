<template>
    <div class="task-panel">
        <form>
            <label for="name">Task Title</label>
            <input 
                type="text" 
                name="title"
                v-model="title" 
                value=""
            >
            <label for="cat">Task Category</label>
            <input 
                type="text" 
                name="cat" 
                v-model="category"
                value=""
            >
        </form>
        <div class="priority-tabs">
            <div 
                :class="{ selected: priority === 'normal'}"
                @click="selectPriority('normal')"
            >
                Normal
            </div>
            <div 
                :class="{ selected: priority === 'medium'}"
                @click="selectPriority('medium')"
            >
                Medium
            </div>
            <div 
                :class="{ selected: priority === 'high'}"
                @click="selectPriority('high')"
            >
                High
            </div>
        </div>
        <div 
            v-if="panelActive === 'add'"
            class="submit"
            @click="add()"
        >
            Add
        </div>
        <div 
            v-else
            class="submit"
            @click="update()"
        >
            Update
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            buttonText: '',
            title: '',
            category: '',
            priority: '',
            tabData: ''
        }
    },
    computed: {
        panelActive() {
            return this.$store.state.panelActive;
        },
        idActive() {
            return this.$store.state.tabActiveId;
        }
    },
    watch: {
        idActive() {
            if (this.idActive.length) {
                const db = firebase.firestore();

                db.collection('tasks').doc(this.idActive).get().then((doc) => {
                    this.tabData = doc.data() ? doc.data() : '';
                    this.title = this.tabData.name || '';
                    this.category = this.tabData.category || '';
                    this.priority = this.tabData.priority || '';
                })
            } else {
                this.title = '';
                this.category = '';
                this.priority = '';
            }
        }
    },
    methods: {
        add() {
            const db = firebase.firestore();

            db.collection('tasks').add({
                name: this.title,
                category: this.category,
                priority: this.priority,
                status: false
            }).then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

            this.$store.commit('setPanelActive', '');
            this.$store.commit('setPanelOpen', false);
            this.$store.commit('setTabActiveId', []);
        },
        update() {
            const db = firebase.firestore();

            db.collection('tasks').doc(this.idActive).set({
                name: this.title,
                category: this.category,
                priority: this.priority,
                status: false
            });

            this.$store.commit('setPanelActive', '');
            this.$store.commit('setPanelOpen', false);
            this.$store.commit('setTabActiveId', '');
        },
        selectPriority(priority) {
            this.priority = priority;
        }
    }
}
</script>

<style lang="scss" scoped>

.task-panel {
    width: 100%;
    height: 40vh;
    background: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: fixed;
    z-index: 5;
    bottom: -40vh;
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.5s ease-in-out;
    &.open {
        bottom: 0;
    }
    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        input {
            margin-bottom: 15px;
            min-height: 25px;
            padding: 5px;
            border: none;
            border-bottom: 1px solid grey;
            background-color: #faf8f8;
        }
    }
    .submit {
        padding: 15px 8px;
        min-width: 100px;
        background: #565a99;
        border-radius: 15px;
        margin-top: 20px;
        color: white;
    }
    .priority-tabs {
        width: 100%;
        height: 50px;
        display: flex;
        background-color: #dadada;
        border-radius: 10px;
        overflow: hidden;
        div {
            flex: 1;
            padding: 10px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            &:nth-of-type(2) {
                border-left: 0.5px solid grey; 
                border-right: 0.5px solid grey; 
            }
            &.selected {
                background-color: #333333;
                color: white;
            }
        }
    }
}

</style>


