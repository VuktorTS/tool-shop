function createMarkup(arr, instrumentsList) {
  let markup = '';
  if (arr.length) {
    markup = arr
      .map(
        ({ id, image, name }) => `
        <li data-id="${id}" class="js-card">
            <img src="${image}" alt="${name}" width="300" />
            <h2>${name}</h2>
            <p>
                <a class="js-info" href="#">More information</a>
            </p>
            <div>
                <button class="js-favorite">Add to favorite</button>
                <button class="js-basket">Add to basket</button>
            </div>
        </li>`
      )
      .join('');
  } else {
    markup = `
        <li">
            <img src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?w=1380&t=st=1697913403~exp=1697914003~hmac=7188537c203a43570b085e36bee2a65078f51fff9da9a96b0ba7c9546e438cdb" alt="404" width="600" />
            
        </li>
      `;
  }

  instrumentsList.innerHTML = markup;
}

export { createMarkup };
