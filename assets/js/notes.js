
// main.js
import { fetchData } from './dataLoader.js';

fetchData('assets/js/notes_data.json')
    .then(data => {
        // Handle the JSON data
        createNotes(data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });



const createNotes = (data) => {
    let appendNote = document.getElementById("append-notes");
    data.forEach(({title
        , category, note_url, subheading, date}) => {
        // Create li element
        let liElement = document.createElement("li");
        liElement.classList.add("blog-post-item");

        // Create a element
        let aElement = document.createElement("a");
        aElement.href = note_url;
        aElement.target = "_blank";

        // Create div element with class "blog-content"
        let divElement = document.createElement("div");
        divElement.classList.add("blog-content");

        // Create div element with class "blog-meta"
        let metaDivElement = document.createElement("div");
        metaDivElement.classList.add("blog-meta");

        // Create p element with class "blog-category"
        let categoryPElement = document.createElement("p");
        categoryPElement.classList.add("blog-category");
        categoryPElement.textContent = category;

        // Create span element with class "dot"
        let dotSpanElement = document.createElement("span");
        dotSpanElement.classList.add("dot");

        // Create time element with datetime attribute
        let timeElement = document.createElement("time");
        timeElement.datetime = "2021-03-15";
        timeElement.textContent = date;

        // Append categoryPElement, dotSpanElement, and timeElement to metaDivElement
        metaDivElement.appendChild(categoryPElement);
        metaDivElement.appendChild(dotSpanElement);
        metaDivElement.appendChild(timeElement);

        // Create h3 element with class "h3 blog-item-title"
        let h3Element = document.createElement("h3");
        h3Element.classList.add("h3", "blog-item-title");
        h3Element.textContent = title;

        // Create p element with class "blog-text"
        let pElement = document.createElement("p");
        pElement.classList.add("blog-text");
        pElement.textContent = subheading;

        // Append h3Element and pElement to divElement
        divElement.appendChild(metaDivElement);
        divElement.appendChild(h3Element);
        divElement.appendChild(pElement);

        // Append divElement to aElement
        aElement.appendChild(divElement);

        // Append aElement to liElement
        liElement.appendChild(aElement);

        // Append liElement to the document body (or any other desired parent element)
        document.body.appendChild(liElement);

        appendNote.appendChild(liElement);

    });
}