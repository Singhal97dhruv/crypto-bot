import React from 'react'

const Search = () => {
  return (
    <div className='techwave_fn_searchbar'>
      <div className="search__bar">
        <input type="text" className="search__input" placeholder='Search Here...' />
        <img src="img/lighticon/light-5.png" className='fn__svg search__icon' alt="" />
        <span className="search__closer">
          <img src="img/lighticon/light-18.png" className='fn__svg' alt="" />
        </span>
      </div>
      <div className="search__results">
        <div className="results__title">Results</div>
        <div className="results__list">
          <ul>
            <li>
              <a href="#">Artificial Intelligence</a>
            </li>
            <li>
              <a href="#">Learn about the impact of AI Crypto trading Bot</a>
            </li>
            <li>
              <a href="#">Artificial Intelligence</a>
            </li>
            <li>
              <a href="#">Artificial Intelligence</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Search
