<script>
  import { db } from '../../lib/firebase/firebase';
  import { doc, setDoc } from 'firebase/firestore';
  import { authHandlers, authStore } from '../../store/store';
  import TodoItem from '../../components/TodoItem.svelte';

  let todoList = [];
  let currTodo = '';
  let error = false;

  authStore.subscribe((curr) => {
    todoList = curr.data.todos;
  });

  function addTodo() {
    error = false;
    if (!currTodo) {
      error = true;
    }
    todoList = [...todoList, currTodo];
    currTodo = '';
  }

  function editTodo(index) {
    let newTodoList = [...todoList].filter((val, i) => {
      console.log(i, index, i !== index);
      return i !== index;
    });
    currTodo = todoList[index];
    todoList = newTodoList;
  }

  function removeTodo(index) {
    let newTodoList = todoList.filter((val, i) => {
      return i !== index;
    });
    todoList = newTodoList;
  }

  async function saveTodos() {
    try {
      const userRef = doc(db, 'users', $authStore.user.uid);
      await setDoc(
        userRef,
        {
          todos: todoList,
        },
        { merge: true }
      );
    } catch (err) {
      console.log('There was an error saving your information');
    }
  }
</script>

{#if !$authStore.loading}
  <div class="mainContainer">
    <div class="headerContainer">
      <h1>Todo List</h1>
      <div class="headerBtns">
        <button on:click={saveTodos}>
          <i class="fa-regular fa-floppy-disk" />
          <p>Save</p>
        </button>
        <button on:click={authHandlers.logout}>
          <i class="fa-solid fa-right-from-bracket" />
          <p>Logout</p>
        </button>
      </div>
    </div>
    <main>
      {#if todoList.length === 0}
        <p>You have nothing to do! Add a todo!</p>
      {/if}
      {#each todoList as todo, index}
        <TodoItem {todo} {index} {editTodo} {removeTodo} />
      {/each}
    </main>
    <div class={'enterTodo' + (error ? ' errorBorder' : '')}>
      <input bind:value={currTodo} type="text" placeholder="Enter Todo" />
      <button on:click={addTodo}>ADD</button>
    </div>
  </div>
{/if}

<style>
  .mainContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    gap: 24px;
    padding: 24px;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
  }

  .headerContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .headerBtns {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .headerContainer button {
    background: #003c5b;
    color: white;
    padding: 10px 18px;
    border: none;
    border-radius: 4px;
    font-weight: 700;
    align-items: center;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }

  .headerContainer button i {
    font-size: 1.1rem;
  }

  .headerContainer button:hover {
    opacity: 0.7;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .enterTodo {
    display: flex;
    align-items: stretch;
    border: 1px solid #0891b2;
    border-radius: 5px;
    overflow: hidden;
  }

  .errorBorder {
    border-color: coral !important;
  }

  .enterTodo input {
    background: transparent;
    border: none;
    padding: 14px;
    color: white;
    flex: 1;
  }

  .enterTodo input:focus {
    outline: none;
  }

  .enterTodo button {
    padding: 0 28px;
    background: #003c5b;
    border: none;
    color: cyan;
    font-weight: 600;
    cursor: pointer;
  }

  .enterTodo button:hover {
    background: transparent;
  }
</style>
