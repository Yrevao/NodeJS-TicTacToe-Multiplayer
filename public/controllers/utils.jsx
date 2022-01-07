const React = require('react');
const ReactDOM = require('react-dom');



// utility methods
// switch to a different page by re-rendering
export const switchPage = (page) => {
  ReactDOM.render(page, document.getElementById('root'));
}

// send formatted post request with json data
export const request = (data, url) => {
  return new Promise((resolve, reject) => {
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(data)
    };

    fetch(url, params)
      .then(response => {
        if(response.ok) {
          resolve(response.json());
        }
        else
          reject('Error on POST Request');
      });
  });
}

// get match ID from query
export const getQueryMatch = () => {
  const query = new URLSearchParams(window.location.search);

  return query.get('match');
}
