import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const hideWhenVisible = { display: visible ? 'none' : '' }
	const showWhenVisible = { display: visible ? '' : 'none' }

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		}
	})

	if (props.type === 'studentform') {
		return(
			<div>
				<div style={hideWhenVisible}>
					<button onClick={toggleVisibility}>{props.buttonLabel}</button>
				</div>
				<div style={showWhenVisible}>
					{props.children}
				</div>
			</div>
		)
	}
	else {
		return (
			<div>
				<div style={hideWhenVisible}>
					<button onClick={toggleVisibility}>{props.buttonLabel}</button>
				</div>
				<div style={showWhenVisible}>
					{props.children}
				</div>
			</div>
		)
	}
})

export default Togglable