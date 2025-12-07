const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s12 m4">'+
            '<div class="card medium">'+
                '<div class="card-image waves-effect waves-block waves-light">'+
                    '<img class="activator" src="'+item.image+'">'+
                '</div>'+
                '<div class="card-content">'+
                    '<span class="card-title activator grey-text text-darken-4">'+item.title+'<i class="material-icons right">more_vert</i></span>'+
                    '<p><a href="#">'+item.link+'</a></p>'+
                '</div>'+
                '<div class="card-reveal">'+
                    '<span class="card-title grey-text text-darken-4">'+item.title+'<i class="material-icons right">close</i></span>'+
                    '<p class="card-text">'+item.desciption+'</p>'+
                '</div>'+
            '</div>'+
        '</div>';
        $("#card-section").append(itemToAppend)
    });
}

const getProjects = () => {
    $.get('/api/plants', (response) => {
        if(response.statusCode==200){
            addCards(response.data);
        }
    })
}

$(document).ready(function(){
    $('.materialboxed').materialbox();
    getProjects();
    $('.modal').modal();
});