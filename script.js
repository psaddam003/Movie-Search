$(document).ready(function(){

    $("#loading").hide();

    $type   = ['movie', 'series'];
    $search = "";


    $('#search_field').on('keyup', function(){
        $search = $(this).val();

        search($search);
    });

    $(".type").click(function(){
        if($(this).is(":checked")){
            $type = $(this).val();
            
            search($search);
        }
    })

});

function search($search){
    $("#movies").html("");

    if($search.length >= 3){
        $("#loading").fadeIn();

        setTimeout(function(){
            getMovies($search);
        }, 2000);
    } else{
        $("#movies").html("");
    }
}






    

function getMovies(search){

    if($type == "all") $type = ['movie', 'series'];

    axios.get('https://www.omdbapi.com', {
        params: {
            apikey: "7b071990",
            s: search,
            type: $type,
        }
    })
    .then((response) => {
        $movies = response.data.Search;
        $html   = "";

        $.each($movies, (index, movie) => {
            $html += `<div class="movie col-md-2">
                        <div class="card" data-toggle="modal" data-target="#movieModal${ index }">
                            <p class="card-header">${ movie.Title }</p>
                            <div class="card-body">
                                <img src="${ movie.Poster }">
                            </div>
                        </div>
                    </div>
                    
                    <div class="modal fade" id="movieModal${ index }" tabindex="-1"   role="dialog" aria-labelledby="movieModal${index}Label" aria-hidden="true">
                        <div class="modal-dialog modal-sm" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="movieModal${ index }Label">${ movie.Title }</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <table class="table table-bordered">
                                        <tr>
                                            <th>Year</th>
                                            <td>${ movie.Year }</td>
                                        </tr>
                                        <tr>
                                            <th>Type</th>
                                            <td>${ movie.Type }</td>
                                        </tr>
                                       
                                       
                                        
                                    </table>
                                </div>
                                <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" > Add  To Favorite</button>

                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                   
                                </div>
                            </div>
                        </div>
                    </div>`;
        });

        $("#movies").html($html);
        $('.modal').modal('modal');
    });

    $("#loading").hide();

    
}

  