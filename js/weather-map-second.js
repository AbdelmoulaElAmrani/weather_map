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
        cityWeatherHtml(data);
        cityDayOneWeatherHtml(data);
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
            cityDayOneWeatherHtml(data);
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

    var today = new Date();
    function cityWeatherHtml(city) {
        var weatherHtml = '';
        var days = 1;
        for (var i = 8; i < city.list.length; i += 8) {
            var day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (i / 8));
            days++;
            day = day.toString().substring(0 , 4);

            weatherHtml += '<div ' + 'id=' + '"day' + days + '"' + ' class="daysWeather hoverShow col s3">';
            weatherHtml += '<div class="dates">'+ day + '</div>';
            weatherHtml += '<img class="icon" src=' + 'http://openweathermap.org/img/w/' + city.list[i].weather[0].icon + '.png' + '>';
            weatherHtml += '<div class="tempt">' + city.list[i].main.temp_max.toFixed(0);
            weatherHtml += '°/' + city.list[i].main.temp_min.toFixed(0)+'°' + '</div>';
            //
            // weatherHtml += '<div class="mainDetails">' + '<strong>' + city.list[i].weather[0].main + ' : ';
            // weatherHtml += '</strong>' + city.list[i].weather[0].description + '</div>';
            weatherHtml += '<div class="hoverHumidity"><strong>Humidity : </strong>' + city.list[i].main.humidity + '</div></div>';
            // weatherHtml += '<div><strong>Wind : </strong>' + city.list[i].wind.speed + '</div>';
            // weatherHtml += '<div><strong>pressure : </strong>' + city.list[i].main.pressure + '</div></div></div>';

        }
        $("#daysWeather").html(weatherHtml);

    }


    function cityDayOneWeatherHtml(city) {
        var weatherHtml = '';
        var day = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        day = day.toString().substring(0 , 4);
        weatherHtml += '<div ' + 'id=' + '"day1' + '"' + 'class="daysWeather row ">';
        weatherHtml += '<div class="dates1 col s6">'+ day +'</div><br>';
        weatherHtml += '<img class="icon1" src=' + 'http://openweathermap.org/img/w/' + city.list[0].weather[0].icon + '.png' + '>';
        weatherHtml += '<div class="tempt1">' + city.list[0].main.temp_max.toFixed(0);
        weatherHtml += '°/' + city.list[0].main.temp_min.toFixed(0)+'°' + '</div>';
        //
        weatherHtml += '<div class="mainDetails1">' + '<strong>' + city.list[0].weather[0].main + ' : ';
        weatherHtml += '</strong>' + city.list[0].weather[0].description + '</div></div>';
        weatherHtml += '<div class="row"><div class="col s12"><div class="flt"><strong>Humidity : </strong>' + city.list[0].main.humidity +'</div>' ;
        weatherHtml += '  '+ '<div class="flt"><strong>Wind : </strong>' + city.list[0].wind.speed + '</div>';
        weatherHtml += ' '+'<div class="flt"><strong>Pressure : </strong>' + city.list[0].main.pressure + '</div>'  +' ' + '</div></div></div></div></div>';
        console.log(weatherHtml);

        $("#todaysWeather").html(weatherHtml);

    }
    // $(document).on('click' , '.daysWeather', function () {
    //     console.log('ll');
    //     $(this).slideToggle();

    // })
    //
    // $('.daysWeather').onhover(function () {
    //     console.log('ll');
    //     $(this).slideToggle();
    //
    // });
    $(document).on({
        mouseenter : function () {
            $(this).find('.hoverHumidity').slideToggle();
            console.log('ll');
        },
        mouseleave: function () {
            $(this).find('.hoverHumidity').slideToggle();
        }
    }, '.daysWeather')


})
// $.get("http://api.openweathermap.org/data/2.5/weather", {
//     APPID: "cc98bfad7f15f6af2b471cd32d26ebca\n",
//     id:     4726206,
//     units: "imperial"
// }).done(function(data) {
//     console.log(data);


