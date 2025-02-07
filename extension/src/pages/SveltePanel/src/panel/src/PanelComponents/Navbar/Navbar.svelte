<script lang="ts">
  let activeColor = 'rgb(28, 195, 221)';
  let inactiveColor = '#fff';
  let activeBackground = 'rgba(255, 255, 255, 0.25)';
  let inactiveBackground = 'rgba(0, 0, 0, 0)';

  function buttonStyle(isActive: boolean) {
    return `
      color: ${isActive ? activeColor : inactiveColor};
      background: ${isActive ? activeBackground : inactiveBackground};
      &:hover {
        background: #ff0000;
      }
    `;
  }
</script>

<style>
  .nav-link {
    padding: 8px 16px;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.3s;
  }
  .nav-link:hover {
    background: #ff0000; /* Default hover state */
  }
  .nav {
  /* background-color: #2a2f3a; */
  max-height: 45px;
  font-size: 20px;
  color: var(--color);
  display: flex;
  justify-content: space-around;
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 200px;
  padding-top: 5px;
}

.nav a {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: bold;
}

/* .tree:hover,
.step:hover {
  border-top: 2px solid rgb(0, 94, 108);
  color: #c2c2c2;
} */

</style>

<nav class="nav">
  <div class="nav-option">
    <a
      href="/"
      class="nav-link"
      style={buttonStyle($$props.isActive)}
    >
      List
    </a>
  </div>
  <div class="nav-option">
    <a
      href="/tree"
      class="nav-link"
      data-testid="tree-link"
      style={buttonStyle($$props.isActive)}
    >
      Tree
    </a>
  </div>
</nav>
