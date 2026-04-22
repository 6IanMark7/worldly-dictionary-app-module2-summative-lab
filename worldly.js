let wordToSearch = null;
const favoriteWordsList = [];
//const recentSearchList = [];
//const wordOfTheDay = "";

async function fetchFromDictionaryApi(searchWord) {

    try {
        const worldlyUrl = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
        const searchData = await worldlyUrl.json()
        
        return searchData;

    } catch (error){
        console.log(`Error: ${error.message}`);
        //APPEND ERROR TO HTML MAIN ELEMENT
    }
}

function inputSearchDynamism() {
    
    const divSearchResults = document.getElementById("results");
    const searchBtn = document.getElementById("searchBtn");
    const wordInput = document.getElementById("wordInput");

    searchBtn.addEventListener("click", async (e) => {
       e.preventDefault()
        try {
            // ASSIGN INPUT VALUE TO  wordToSearch
            wordToSearch = wordInput.value.trim();
            console.log("This",wordToSearch);
            if (!wordToSearch) {
                alert("Input Field must have a Value")
                throw new Error("Error Found")
            }

            divSearchResults.replaceChildren();
            
            const wordFetch = await fetchFromDictionaryApi(wordToSearch)

            displaySearchedWord(wordFetch, divSearchResults);
            

        } catch (error) {
            console.error(`Èrror: ${error.message}`);
            //divSearchResults.append(error);
            
        }
        wordInput.value = "";
        
    })
    
}

function displaySearchedWord(searchData, parent) {

    //DYNAMICALLY LOOP THE DATA && CREATE ELEMENTS USING .innerHTML 
    if (Array.isArray(searchData)) {
        const ul = document.createElement("ul");
        //console.log("app ul");
        searchData.forEach(word => {
            const li = document.createElement("li");
            displaySearchedWord(word, li)

            ul.appendChild(li);
            //divSearchResults.appendChild(ul);
            //console.log("app li");
        })
        parent.appendChild(ul);
    }

    else if (typeof (searchData) === "object" && searchData !== null) {
        const objDiv = document.createElement("div");

        Object.entries(searchData).forEach(([key, value]) => {
            const keyTitle = document.createElement("h3");

            if (typeof value==="string"|| typeof value==="number") {
                objDiv.innerHTML=([` ${key} : ${value}`]);
            }
            else if (value===null||value==="") {
            //key = "";
                value.trim();
                key=!key;
                keyTitle.innerHTML = `${key}`
                
                objDiv.innerHTML=`${key}`
                
                
            }
            else if (typeof value === "object" || Array.isArray(value)) {
            keyTitle.innerHTML = ` ${key}:`;

            objDiv.appendChild(keyTitle);

            displaySearchedWord(value, keyTitle);
                
            }
        })
        parent.appendChild(objDiv);
        console.log("objDiv")
    } else {
        const p = document.createElement("p");
        p.textContent = searchData;
        parent.appendChild(p);
    }


}
fetchFromDictionaryApi(wordToSearch);
inputSearchDynamism();