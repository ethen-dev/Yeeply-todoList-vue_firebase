<template>
    <div class="home">
        <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
        <tab 
            v-for="task in taskLoaded"
            :key="task.index"
            :title="task.name"
            :category="task.category"
            :checked="task.status"
            :priority="task.priority"
            :id="task.id"
        >
        </tab>
    </div>
</template> 

<script>
// @ is an alias to /src
import Tab from '@/components/Tab.vue';
import { setTimeout } from 'timers';

export default {
    name: 'home',
    components: {
        Tab
    },
    data() {
        return {
            tasks: []
        }
    },
    computed: {
        taskLoaded() {
            return this.tasks
        }
    },
    mounted() {
        new Promise((res) => {
            //Autologin for now
            firebase.auth().signInWithEmailAndPassword('cem20704@gmail.com', 'fantasy').catch(function (error) {
                console.log(error.code);
                console.log(error.message);
            }).then(() => {
                res();
            })
        }).then(() => {
            const db = firebase.firestore();
            db.collection("tasks").onSnapshot((querySnapshot) => {
                const data = [];
                let i = 0;
                // For some reason foreach index is not working with data[i]
                querySnapshot.forEach(doc => {
                    data.push(doc.data());
                    data[i].id = doc.id;
                    i++;
                });
                this.tasks = data;
            });
        })

    }
};
</script>

<style lang="scss" scoped>
.home {
    padding: 10px;
}
</style>

