import React from 'react'

export default function Search(props) {

  return (
    <div>
      <h1>Search Filter</h1>
      <form className="searchForm" >
        <input
          value={props.query}
          onChange={props.handleChange}
          type="text" className="search"
          placeholder="Tag"
          name='query'
        />
        <ul className="suggestions">
          <li>Filter for a Tag</li>
        </ul>

      </form>
    </div>
  )
}