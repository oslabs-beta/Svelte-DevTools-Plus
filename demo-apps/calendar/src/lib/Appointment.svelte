<script>
    import { scheduleStore } from '../lib/schedule-store';

    export let apptName, time, completed // props being passed down from Scheduler 
    export let apptID, dateID;

    const deleteAppt = () => {
        scheduleStore.update(currDataState => {
            currDataState[dateID] = currDataState[dateID].filter(appt => appt.id !== apptID)
            return currDataState;
        })
    }

    // this is the event that gets triggered by the on:blur event listeners. e is event object, key is the key of the property we're changing, whether that's time or eventname
    const updateAppt = (e, key) => {
        // this is the value of the property that we're accessing with "key"
        let newValue;
        console.log(e.target.nodeName);
        // if the nodeName is TD, assign newValue to e.target.textContent, else assign newValue to e.target.checked
        e.target.nodeName === "TD" ? newValue = e.target.textContent : newValue = e.target.checked;
        // updating our state in scheduleStore
        scheduleStore.update(currDataState => {
            // find index of appointment we're editing
            let i = currDataState[dateID].findIndex(appt => appt.id === apptID);
            // update the value of either "eventname" or "time" property with our new value that we've entered into the input field
            currDataState[dateID][i][key] = newValue;
            return currDataState;
        })
    }
</script>

<tr class:completed> <!--tracks one appointment that we've made-->
    <td>
        <input type="checkbox" bind:checked={completed} on:change={(e) => updateAppt(e, "completed")}/>
    </td>
    <td contenteditable on:blur={(e) => updateAppt(e, "eventname")}>{apptName}</td>
    <td contenteditable on:blur={(e) => updateAppt(e, "time")}>{time}</td>
    <td> 
        <!-- HAVE TO FIX THIS FONT AWESOME CODE, MIGHT NOT BE UP TO DATE -->
        <i class="fa fa-trash-o fa-2x" 
        on:click={deleteAppt}/>
    </td>
</tr>

<style>
    td {
        text-align: left;
        padding: 6px;
    }

    td,
    input {
        cursor: pointer
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    input[type="checkbox"] {
        width: 55px;
        height: 25px;
        margin-top: 10px;
    }

    input[type=checkbox]:checked {
        background-color: hsl(168, 76%, 100%);
        color: white;
    }

    .completed {
        text-decoration: line-through;
        color: #aaa;
    }
</style>