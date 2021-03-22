const pp = document.getElementById("pic");
const personal_name = document.getElementById("name");
const username = document.getElementById("username");
const bio = document.getElementById("bio");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const repList = document.getElementById("repList");
const searchQ = document.getElementById("searchArea");
const baseURL = "https://api.github.com/users";
const searchButton = document.querySelector(".mt1");
const mainEl = document.querySelector(".main");


eventListeners();

function eventListeners(){
    searchButton.addEventListener('click',run);
}


function run(){

    if(searchQ.value !=""){

        getUser()
        .then(data => {
            if(data != null) main(data);
        })
        .catch(err =>console.log(err));

    }else{
        alert("Enter a valid username...");
    }

    

}


async function getUser(){

    const response = await fetch(baseURL+`/${searchQ.value}`);
    const data = await response.json();

    if(data.message){
        alert("Not Found!");
        return null;
    }else{
        return data;
    }

    

}

async function getRepos(url){

    const response = await fetch(url);
    const data = await response.json();
    return data;


}

async function main(data){

    mainEl.classList.remove('inactive');
    mainEl.classList.add('active');

    pp.src = data.avatar_url;
    personal_name.innerHTML = data.name;
    username.innerHTML = data.login; 
    bio.innerHTML = data.bio;
    followers.innerHTML = data.followers;
    following.innerHTML = data.following;
    repos.innerHTML = data.public_repos;

    repList.innerHTML = "";
    const repoList = await getRepos(data.repos_url);
    
    repoList.forEach(element => {
        const el = document.createElement("a");
        el.classList.add('repos');
        el.innerHTML = element.name;
        el.href = element.html_url;
        el.target = "_blank";
        repList.appendChild(el);
        
    });
}

