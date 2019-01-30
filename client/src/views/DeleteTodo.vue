<template>
    <span>
        <button class ="delButt" v-on:click="deleteTodo(todo)">DELETE</button>
    </span>
</template>

<script>
export default{
    name: "DeleteTodo",
    methods: {
        deleteTodo(todo){
            this.$emit('delete-todo', todo);
        }
    }
}
</script>

<style scoped>
    .delButt{
        text-align: center;
		border: none;
  		border-radius: 4px;
  		cursor: pointer;
		color: white;
		background-color: rgb(24, 114, 121);
		font-size: 60%;
		
    }
</style>
