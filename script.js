var apiurl="https://api.themoviedb.org/3/movie/popular?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1";
var apisearchurl="https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=";
var imgpath="https://image.tmdb.org/t/p/w1280";
var respdata=`helloalto111`;
var searchform=document.getElementsByClassName("search-form")[0];
var searchinput=document.getElementsByClassName("search")[0];
var movieExpandContainer=document.getElementById('movie-expand-container');

function getClassName(va){
    if(va>=8){
        return "green";
    }
    else if(va>=5){
        return "orange";
    }
    else{
        return "red";
    }
}

async function getMovies(x){
    document.querySelector(".main").innerHTML="";
    if(x==="home"){
        var resp=await fetch(apiurl);
    }
    else{
        var resp=await fetch(x);
    }
    respdata=await resp.json();
    console.log(respdata);
    respdata.results.forEach((movie)=>{
        const movieEl=document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML=`
            <div class="movie-info-container">
                <img src="${imgpath}${movie.poster_path}" alt="Movie Poster">
                <div class="movie-info">
                    <p>${movie.original_title}</p>
                    <span class="${getClassName(movie.vote_average)}">${movie.vote_average}</span>
                </div>
                <div class="overlay">${movie.overview}</div>
            </div>
        `;
        movieEl.addEventListener('click', function() {
            //movieExpandContainer.style.display = 'flex';
        });
        document.querySelector('.main').appendChild(movieEl);
    });
}

getMovies("home");

searchform.addEventListener('submit',(e)=>{
    e.preventDefault();
    var searchterm=searchinput.value;
    if(searchterm!==""){
        searchterm=searchterm.replace(/ /g,"+");
        var newsearchurl=apisearchurl+searchterm;
        console.log(newsearchurl);
        getMovies(newsearchurl);
        searchinput.value="";
    }
})

document.getElementById('closeBtn').addEventListener('click', function() {
    movieExpandContainer.style.display = 'none';
    console.log('clicked!!!');
});

movieExpandContainer.addEventListener('click', function(event) {
    if (event.target === movieExpandContainer) {
        movieExpandContainer.style.display = 'none';

    }
});









/*
function func1(){
    console.log("helloabcd123");
}
function func2(){
    console.log(respdata);
}
function func3(){
    var data=resp.json();
    console.log("this is the fetched data:");
    console.log(data);
    console.log(resp);
}
func1();
func2();
setTimeout(func2,3000);
setTimeout(func3,4000);
*/
