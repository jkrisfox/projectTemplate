<template>
    <div align = "center">
        <input class = textBox type="text" v-model="nameText" placeholder="Item Name">
        <input class = textBox type="text" v-model="duedateText" placeholder="Item Due Date">
        <input class = addButt type="submit" value="ADD" v-on:click="addTodo">
    </div>
</template>

<script>
export default{
    name: "AddTodo",
    data(){
        return {
            nameText: '',
            duedateText: '',
        };
    },
    methods: {
        addTodo(){
            if (this.nameText.length > 0 && this.duedateText.length > 0){
                const name = this.nameText;
                const duedate = this.duedateText;
                const newTodo = {name, duedate};
                this.$emit('add-todo', newTodo);

                this.nameText = '';
                this.duedateText = '';
            }
        }
    }
    
}
</script>

<style scoped>
    .textBox{
		background-color: lightgrey;
		margin: 20px; 
		padding: 10px;
		font-size: 130%;
    }
    .addButt{
        text-align: center;
		border: none;
  		border-radius: 4px;
  		cursor: pointer;
		color: white;
		background-color: rgb(24, 114, 121);
		height: 50px;
		width: 100px;
		font-size: 150%;
		padding: 7px 20px;
    }
</style>
