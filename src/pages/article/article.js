import 'bootstrap/dist/js/bootstrap';
import './article.scss';
import $ from 'jquery';

const render = require('../../tpl/article/comment.art');

$(document).ready(function () {
    $.ajax({
        url: 'comments.json',
        dataType: 'json'
    }).done(function (data, status, jqXHR) {
        const html = render(data);
        $('#jedi-comment-wrapper').html(html);
    })
});
