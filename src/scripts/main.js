import $ from "jquery";
// Fungsi query list movie
function searchMovie() {
	$('#movie-list').html('');

	$.ajax({
		url: 'http://www.omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': '5cb7ee31',
			's': $('#search-input').val()
		},
		success: (hasil) => {
			if (hasil.Response == "True") {



				let movies = hasil.Search;
				$.each(movies, (i, data) => {
					$('#movie-list').append(`
						<div class="col-md-4 pb-4">
							<div class="card mb-3">
							  <figure class="figure">
								  <figcaption class="figure-caption text-center text-white bg-dark text-uppercase">` +data.Type+ `</figcaption>
								  <img src="` + data.Poster + `" class="card-img-top figure-img img-fluid rounded" alt="Movie Poster">
								</figure>
							  <div class="card-body">
							    <h5 class="card-title">` +data.Title+ `</h5>
							    <h6 class="subtitle mb-2 text-muted">` +data.Year+ `</h6>
							    <a href="#" class="btn btn-outline-primary btn-sm detail" data-id="` +data.imdbID+ `" data-toggle="modal" data-target="#exampleModal">See Detail</a>
							  </div>
							</div>
						</div>

						<!-- Modal -->
						<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						  <div class="modal-dialog modal-lg" role="document">
						    <div class="modal-content">
						      <div class="modal-header">
						        <h5 class="modal-title" id="exampleModalLabel">About</h5>
						        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
						      <div class="modal-body">
						        
						      </div>
						      <div class="modal-footer">
						        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
						      </div>
						    </div>
						  </div>
						</div>
					`);
				});
				$('#search-input').val('');
			} else {
				$('#movie-list').html(`
					<div class="col">
						<h1 class="text-center">`+ hasil.Error +`</h1>
					</div>

				`);
			}
		}
	});
}

// Event saat button diklik
$('#search-button').on('click', () => {
	searchMovie();
	console.log(200);
});

// Event ketika tombol enter diklik
$('#search-input').on('keyup', (e) => {
	if (e.keyCode === 13) {
		searchMovie();
	}	
});

// Event saat tombol detail diklik
$('#movie-list').on('click','.detail', function() {
	$.ajax({
		url: 'http://omdbapi.com',
		dataType: 'json',
		type: 'get',
		data: {
			'apikey': '5cb7ee31',
			'i': $(this).data('id')
		},
		success : (movie) => {
			if (movie.Response === "True") {
				$('.modal-body').html(`
					<div class="container-fluid">
						<div class="row">

							<div class="col-md-4">
								<img class="img-fluid" src="` +movie.Poster+ `"/>
							</div>

							<div class="col-md-8">
								<ul class="list-group">
								  <li class="list-group-item"><h3>` +movie.Title+ ` <span class="badge badge-danger">`+ movie.imdbRating +`</span></h3></li>
								  <li class="list-group-item"><strong>Released</strong> : ` +movie.Released+ `</li>
								  <li class="list-group-item"><strong>Genre</strong> : ` +movie.Genre+ `</li>
								  <li class="list-group-item"><strong>Director</strong> : ` +movie.Director+ `</li>
								  <li class="list-group-item"><strong>Actors</strong> : ` +movie.Actors+ `</li>
								  <li class="list-group-item"><strong>Synopsis</strong> : ` +movie.Plot+ `</li>

								</ul>
							</div>

						</div>
					</div>
				`);
			}
		}

	});
});