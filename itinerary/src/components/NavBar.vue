<template>
  <div>
    <!-- <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
      <a href="">home</a>
    </nav> -->
    <nav class="navbar nb navbar-light">
      <div class="justify-content-left">
        <a class="navbar-brand">E-trip</a>
        <a href="">Home</a>
      </div>

      <div class="justify-content-right">
        <form>
          <input
            class="form-horizontal mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success btn-sm my-2 my-sm-0" type="submit">
            Search
          </button>
          <button class="btn btn-sm">user</button>
        </form>
      </div>
    </nav>
  </div>
</template>

<style>
a{
  color: #ffffdd;
}

.btn{
  color: #ffffdd;
  border-color: #ffffdd;
  margin: 5px;
}
.btn:hover{
  background-color: #ffffdd;
  color: #016a70;
}

.nb {
  background-color: #016a70;
  color: #ffffdd;
  display: flex;
  align-items: center;
}

.navbar {
  padding: 10px;
}

.navbar-brand {
  font-family: AchivoBlack;
  color: #ffffdd;
  font-size: xx-large;
}

.form-horizontal {
  border-radius: 6px;
  margin: 5px;
}
</style>
