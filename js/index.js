
let urlKey = "https://api.nytimes.com/svc/topstories/v2/"
let apiKey = ".json?api-key=0hGoPGeduATqFtOZvZb587v8yQsnU7yh";
let sections = [
        "arts",
        "automobiles",
        "books",
        "business",
        "fashion",
        "food",
        "health",
        "home",
        "insider",
        "magazine",
        "movies",
        "national",
        "nyregion",
        "obituaries",
        "opinion",
        "politics",
        "realestate",
        "science",
        "sports",
        "sundayreview",
        "technology",
        "theater",
        "tmagazine",
        "travel",
        "upshot",
        "world"
];

let myList = $('.myList');

class newsClass {
        constructor(url, img, abstract){
                this.img = img; // <img>
                this.abstract = abstract;//figcaption
                this.url = url; //a 
        }

        render(){
               $('.news-feed').append('<li><a href=' + this.url + '"target"=_blank><img src="' + this.img + '" <figcaption>' + this.abstract + '</figcaption> </li>')

        }
};



    $( document ).ready(function() {
        
                // pulling data from nyt 
 $.ajax({
        method: 'GET',
        url: 'https://api.nytimes.com/svc/topstories/v2/science.json?api-key=0hGoPGeduATqFtOZvZb587v8yQsnU7yh'
      }).done(function(data) {
              console.log(data);
              $.each(data, function(){
      });     
    });
                // listening for a change in titles ( to direct the right json)
$("select").on('change', function(event){
        let option = event.target.value;

        $.ajax({
                method: 'GET',
                url: urlKey + option + apiKey
         }).done(function(data){
                console.log(data);
                for (let i=0; i < 5; i++) {
                        let newArticle = new newsClass(data.results[i].url, data.results[i].multimedia[4].url, data.results[i].abstract);
                        newArticle.render();
                }
        })
})






 // sections for dropdown
sections.forEach(element => {
        myList.append('<option value="' + element + '">' + element + '</option>');
})// myList.on('change', apiCall)










      // get abstract into figcaption
      // get image (4) into IMG
      // provide url 


}); // document ready ending