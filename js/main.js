$(document).ready(function() {

    //map options
    var options = {
        center: {
            lat: 29.425,
            lng: -98.5001
        },
        zoom: 5,
        //disable the option on the map
        disableDefaultUI: true,
        //scroll disabled
        scrollwheel: true,
        //dragging map
        draggable: true,
        maxZoom: 11
    };


    var element = document.getElementById('map-canvas');
    //map
    var map = new google.maps.Map(element, options)
    //marker
    var marker = new google.maps.Marker({
        position: {
            lat: 29.425,
            lng: -98.5001
        },
        map: map,
        draggable: true,

    });
    //default page ajax req

    $.get("http://api.openweathermap.org/data/2.5/forecast", {
        APPID: "cc98bfad7f15f6af2b471cd32d26ebca",
        q:     "San Antonio, US",
        units: "imperial"
    }).done(function(data) {
        console.log(data);
        cityWeatherHtml(data)
    });

    //keep track of marker position
    var markerLat;
    var markerLng;
    marker.addListener('dragend', function () {
        markerLat = marker.getPosition().lat();
        markerLng = marker.getPosition().lng();

        //weather api

        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/forecast",
            type: "GET",
            data: {
                APPID: "cc98bfad7f15f6af2b471cd32d26ebca",
                lat: markerLat,
                lon: markerLng,
                units: "imperial"
            }
        }).done(function(data) {
            changeCityname(data);
            cityWeatherHtml(data);
            // clouds   console.log(data);
            //    console.log(data.list[0].main.temp_max.toFixed(0))
            //    console.log(data.list[0].main.temp_min.toFixed(0))
            //    console.log(data.list[0].main.humidity)
            //    console.log(data.list[0].wind.speed)
            //    console.log(data.list[0].weather[0].description)
            //    console.log(data.list[0].weather[0].main)
            //    $('#icon').html('<img src='+data.list[0].weather[0].icon+'>')
            console.log(data);
        });
    });


    function changeCityname(data) {
        $('#cityName').html(data.city.name + ' ' + data.city.country)
    }

    function cityWeatherHtml(city) {
        var weatherHtml = '';
        var days = 0;
        for (var i = 0; i < city.list.length; i += 8) {
            if (days === 3 ) { break; }
            days++;

            weatherHtml += '<div ' + 'id=' + '"day' + days + '"' + 'class="daysWeather  col s4">';
            weatherHtml += '<div class="dates"> The' + ' ' + city.list[i].dt_txt.split(" ")[0].split('-')[2] + ' Of' + ' ';
            weatherHtml += city.list[0].dt_txt.split(" ")[0].split('-')[1] + '/' + city.list[0].dt_txt.split(" ")[0].split('-')[0] + '</div>';
            weatherHtml += '<div class="tempt">' + city.list[i].main.temp_max.toFixed(0);
            weatherHtml += '°/' + city.list[i].main.temp_min.toFixed(0)+'°' + '</div>';
            weatherHtml += '<img class="icon" src=' + 'http://openweathermap.org/img/w/' + city.list[i].weather[0].icon + '.png' + '>';

            weatherHtml += '<div class="mainDetails">' + '<strong>' + city.list[i].weather[0].main + ' : ';
            weatherHtml += '</strong>' + city.list[i].weather[0].description + '</div>';
            weatherHtml += '<div class="extraDetails"><div><strong>Humidity : </strong>' + city.list[i].main.humidity + '</div>';
            weatherHtml += '<div><strong>Wind : </strong>' + city.list[i].wind.speed + '</div>';
            weatherHtml += '<div><strong>pressure : </strong>' + city.list[i].main.pressure + '</div></div></div>';

        }
        $("#daysWeather").html(weatherHtml);

    }

})
// $.get("http://api.openweathermap.org/data/2.5/weather", {
//     APPID: "cc98bfad7f15f6af2b471cd32d26ebca\n",
//     id:     4726206,
//     units: "imperial"
// }).done(function(data) {
//     console.log(data);


