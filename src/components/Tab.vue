<template>
    <div 
        class="task"
        :class="[priority, {disabled: checked}]"
        @click="openUpdatePanel()"
    >
        <div class="content">
            <h2>{{ category }}</h2>
            <h1>{{ title }}</h1>
        </div>
        <div 
            v-if="checked"
            class="delete-button"
            @click="remove($event)"
        >
            Delete
        </div>
        <div 
            class="check"
            :class="{ checked: checked }"
            @click="done($event)"
        >
        </div>
    </div>
</template>

<script>
export default {
    props: {
        category: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        checked: {
            type: Boolean,
            default: true
        },
        priority: {
            type: String,
            default: ''
        },
        id: {
            type: String,
            default: ''
        }
    },
    methods: {
        done(e) {
            const db = firebase.firestore();

            db.collection('tasks').doc(this.id).set({
                name: this.title,
                category: this.category,
                priority: this.priority,
                status: true
            });

            e.stopPropagation();

        },
        openUpdatePanel() {
            this.$store.commit('setPanelActive', 'modify');
            this.$store.commit('setTabActiveId', this.id);
            this.$store.commit('setPanelOpen', true);
        },
        remove(e) {

            const db = firebase.firestore();

            db.collection("tasks").doc(this.id).delete();

            e.stopPropagation();
        }
    }
}
</script>

<style lang="scss" scoped>
.task {
    width: 100%;
    height: 80px;
    border-radius: 10px;
    background: linear-gradient(to left, #bdc3c7, #2c3e50);
    box-shadow: 1px 1px 2px 0.5px rgba(222,222,222,1);
    margin-bottom:8px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: white;
    &.medium {
        background: linear-gradient(to left, #f56217, #2c3e50);
    }
    &.high {
        background: linear-gradient(to left, #A43931, #2c3e50);
    }
    // &.disabled {
    //     opacity: 0.6;
    //     pointer-events: none;
    // }
    .content {
        width: 75%;
        text-align: left;
        h2 {
            font-size: 15px;
        }
    }
    .check {
        width: 20px;
        height: 20px;
        border: 1.5px solid white;   
        border-radius: 50%;
        background-color: #dadada;
        position: absolute;
        right: 30px;
        &.checked {
            background-color: green;
        }
    }
    .delete-button {
        padding: 10px 10px;
        background-color: red;
        color: white;
        font-size: 15px;
        border-radius: 5px;
        position: absolute;
        right: 70px;
        opacity: 1.4;
    }
}
</style>


