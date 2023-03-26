// Time: 50p

import { useCallback, useEffect, useState } from 'react';
import DATA from './people.json'
import './App.css';

const debounce = (func, timeout = 300)  => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

function App() {
  const [textSearch, setTextSearch] = useState('');
  const [listView, setListView] = useState(DATA);
  const [aToZ, setAToZ] = useState(false);

  const handleChangeTextSearch = (event) => {
    setTextSearch(event.target.value)
  }

  const sortListView = useCallback(
    (listView, aToZ) => listView.sort((a, b) => {
      if (a.name > b.name) {
        return aToZ ? -1 : 1;
      }
      if (a.name < b.name) {
        return aToZ ? 1 : -1;
      }
      return 0;
  }), [])

  const handleClear = () => {
    setTextSearch('')
  }

  const handleSortByName = () => {
    const newIsAToZ  = !aToZ
    setAToZ(newIsAToZ)
    const newListView = sortListView(listView, newIsAToZ)
    setListView(newListView);
  }

  useEffect(debounce(() => {
    const isEmptyTextSearch = textSearch === '' || !textSearch
    const newListView = isEmptyTextSearch ? [...DATA] : [...DATA].filter(item => {
      return item.name.includes(textSearch) ||item.address.includes(textSearch)||item.category.includes(textSearch)
    });

    setListView(sortListView(newListView, aToZ))
  }), [textSearch, sortListView, aToZ]);

  return (
    <div className="App">
      <div className='input'>
        <input onChange={handleChangeTextSearch} value={textSearch} />
        {textSearch && <span className='suffix' onClick={handleClear}>x</span>}
      </div>
      <button onClick={handleSortByName}>A-Z</button>

      {/* https://www.npmjs.com/package/string-similarity */}
      <button>Address (Sử dụng string-similarity để tìm độ tương đồng)</button>
      <div className='list'>
        {listView.map(({name, id, address, category}) => {
          return (
            <div className='item' id={id}>
            <div className='img'></div>
            <div className="content">
              <div>{name}</div>
              <div>{address}</div>
              <div>{category}</div>
            </div>
          </div>)
        })}
      </div>
    </div>
  );
}

export default App;
