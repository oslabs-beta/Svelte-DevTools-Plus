<script>


    export let apptName, time, completed // props being passed down from Scheduler 
</script>

<tr> <!--tracks one appointment that we've made-->
    <td>
        <input type="checkbox" bind:checked={completed} />
    </td>
    <td>{apptName}</td>
    <td>{time}</td>
    <td>
        <i class="fa fa-trash-o fa-2x" />
    </td>
</tr>

<style>
    td {
        text-align: left;
        padding: 6px;
    }

    td, input {
        cursor: pointer
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    input[type="checkbox"] {
        width: 55px;
        height: 25px;
    }

    input[type=checkbox]:checked {
        background-color: hsl(168, 76%, 100%);
        color: white;
    }
</style>