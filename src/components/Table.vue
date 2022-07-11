<template>
  <div class="table-component">
    <table>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
      <tr v-for="user in data" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <a  style="margin-right: 10px;" href="#">Delete</a>
          <a href="#">Edit</a>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
  export default {
    name: "TableComponent",
    props: {
      data: Array
    }
  }
</script>
<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>