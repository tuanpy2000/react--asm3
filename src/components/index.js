import React from 'react'

export default function InputForm(props) {

    return (
        <div className='app_form'>
            <label className='app_form_input'>Input Name</label>
            <input onChange={props.handleInputChange} >
            </input>
        </div>
    )
}
