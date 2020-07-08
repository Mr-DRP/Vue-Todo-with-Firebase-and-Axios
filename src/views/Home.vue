<template>
  <div class="container col-lg-7 col-sm-10 mt-5" style="font-size: 25px;">
    <form @submit.prevent="onSubmit">
      <div class="input-group mb-3">
        <input
          type="text"
          v-model="title"
          class="form-control"
          placeholder="Add Todo "
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="submit" id="button-addon2">
            Add New
          </button>
        </div>
      </div>
    </form>
    <transition-group name="fade" mode="out-in">
      <div v-for="todo in todos" :key="todo.id" class="todo-item p-1">
        <input
          type="checkbox"
          v-model="todo.status"
          @change="changeStatus({ status: todo.status, id: todo.id })"
        />
        <div class="pl-4 mr-auto" :class="{ done: todo.status }">
          {{ todo.title }}
        </div>
        <div class="remove-item" :key="todo.id" @click="deleteTodo(todo.id)">
          &times;
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      title: ""
    };
  },
  computed: {
    ...mapState(["todos"])
  },
  methods: {
    onSubmit() {
      if (this.title === "") {
        return;
      }
      this.addTodo({
        title: this.title
      });
      this.title = "";
    },
    ...mapActions(["fetchTodo", "addTodo", "deleteTodo", "changeStatus"])
  },
  created() {
    this.fetchTodo();
  }
};
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.remove-item {
  cursor: pointer;
  margin-left: 14px;
}
.remove-item:hover {
  color: red;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.5s;
}

.fade-leave {
}

.fade-leave-active {
  transition: opacity 0.5s;
  opacity: 0;
}
.done {
  text-decoration: line-through;
}
</style>
