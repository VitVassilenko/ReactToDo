import React, {useState} from 'react'
import PropTypes from 'prop-types'


function useInputValue(defaultValue = '') {
    const [value, setValue] = useState(defaultValue)

    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value
    }
}

function AddToDo({onCreate}) {
    const input = useInputValue('')

    function submitHandler(event) {
        event.preventDefault();

        if (input.value().trim()) {
            onCreate(input.value());
            input.clear();
        }
    }


    return (
        <form style={{marginBottom: '1rem', outline: 'none'}} onSubmit={submitHandler}>
            <input type="text" {...input.bind}/>
            <button type="submit">
                Add item
            </button>
        </form>
    )
}

AddToDo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddToDo