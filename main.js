    const API_KEY = "AIzaSyCjbaYy0kqSGVWDErusiDOsNhTjxLrTWtA"
    let SEARCH_QUERY = "أغاني مصرية";
    const searchbtn=document.querySelector(".search")
    const searchinput=document.querySelector("input")
    const musicCard=document.querySelector(".music-card");
    let numberCard=8;
    const moreBtn=document.querySelector("#moreBtn");
    const loader = document.getElementById("loader");
    // function for search
searchinput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        SEARCH_QUERY = searchinput.value.trim();
        getMusic();
    }
});

function search(){
        
        SEARCH_QUERY = searchinput.value.trim();
        getMusic();
    
}
   


    // function for featch
   async function getMusic(){
            try {
            loader.classList.remove("hidden")    
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(SEARCH_QUERY)}&type=video&maxResults=${numberCard}&key=${API_KEY}`);
            const data = await response.json();
            console.log(data.items)
            dispalyMusic(data.items)
        }
            catch (error) {
            console.error("Error fetching songs:", error);
        }
    }

    // fuction for reda and display
    function dispalyMusic(items){
  loader.style.display = "none";

        musicCard.innerHTML=""
        items.forEach(e => {
        musicCard.innerHTML+=`
            <div class="card shadow-md rounded-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
                <!-- صورة -->
                <img 
                    class="rounded-t-md w-full  object-cover" 
                    src=${e.snippet.thumbnails.high.url}
                    alt="Thumbnail"
                >
                
                <!-- المحتوى -->
                <div class="p-5">
                <h3 class="text-xl font-bold text-gray-900 mb-2">${e.snippet.title}</h3>
                    <p class="font-semibold text-lg text-gray-800 mb-4">
                        ${e.snippet.description}
                    </p>
                    <!-- زر التشغيل -->
                    <a target="_blank" href="https://www.youtube.com/watch?v=${e.id.videoId}" style="width: 95%;" 
                        class="m-auto bg-cyan-600 hover:bg-cyan-700  text-white px-5 py-2 rounded-md shadow-md transition-all duration-300 flex items-center gap-2"
                    >
                        <i class="fa-solid fa-play"></i> Play
                    </a>
                </div>
            </div>
            `
        });

        moreBtn.classList.remove("hidden");
    }

    // function for more card
    function moreCard(){
        numberCard+=8;
        getMusic()
    }
