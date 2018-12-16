import 'bootstrap/dist/js/bootstrap';
import './article.scss';
import $ from 'jquery';
// import  tpl from 'art-template';

// var template = require('art-template');
$(document).ready(function () {
    $.ajax({
        url: 'comments.json',
        dataType: 'json'
    }).done(function (data, status, jqXHR) {
        
        $('#jedi-comment-content').text(data.d[0].content);
    })
});
