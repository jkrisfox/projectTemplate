<template>
    <span>
        <button class ="completeButt" v-on:click="completeTodo(todo)">Complete</button>
    </span>
</template>

<script>
export default{
    name: "CompleteTodo",
    methods: {
        completeTodo(todo){
            this.$emit('complete-todo', todo);
        }
    }
}
</script>

<style scoped>
    .completeButt{
        text-align: center;
		border: none;
  		border-radius: 4px;
  		cursor: pointer;
		color: white;
		background-color: rgb(24, 114, 121);
		font-size: 60%;
		
    }
</style>
