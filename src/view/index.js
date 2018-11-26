import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import './index.scss';
import $ from 'jquery';

$('.nav-link').on('click',function () {
    let $ele = $(this);
    console.log('点击->'+$ele.text());
    $ele.text("已点击");
})