import React from 'react';

export default function Search(props) {
	return (
		<div>
			<h1>Search For A Coding Resource</h1>
			<form className="searchForm">
				<input
					value={props.query}
					onChange={props.handleChange}
					type="text"
					className="search other"
					placeholder="Type in a tag to search"
					name="query"
				/>
			</form>
		</div>
	);
}
