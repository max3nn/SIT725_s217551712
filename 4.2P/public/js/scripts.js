const addCards = (items) => {
    $("#card-section").empty(); // Clear preloader
    items.forEach(item => {
        let itemToAppend = '<div class="col s12 m4">'+
            '<div class="card medium">'+
                '<div class="card-image waves-effect waves-block waves-light">'+
                    '<img class="activator" src="'+item.image+'">'+
                '</div>'+
                '<div class="card-content">'+
                    '<span class="card-title activator grey-text text-darken-4">'+item.name+'<i class="material-icons right">more_vert</i></span>'+
                    '<p>'+item.location+'</p>'+
                    '<p><span class="new badge '+(item.availability === 'Available' ? 'green' : 'red')+'" data-badge-caption="">'+item.availability+'</span></p>'+
                '</div>'+
                '<div class="card-reveal">'+
                    '<span class="card-title grey-text text-darken-4">'+item.name+'<i class="material-icons right">close</i></span>'+
                    '<p>Type: '+item.type+'</p>'+
                    '<p>Location: '+item.location+'</p>'+
                    '<p>Status: '+item.availability+'</p>'+
                '</div>'+
            '</div>'+
        '</div>';
        $("#card-section").append(itemToAppend)
    });
}

const getStations = () => {
    $.get('/api/stations', (response) => {
        if(response.statusCode==200){
            addCards(response.data);
        } else {
            console.log(response);
        }
    })
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    getStations();
    $('.modal').modal();
});