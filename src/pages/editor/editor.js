import 'bootstrap/dist/js/bootstrap'
import './editor.scss';

import 'util'
import 'popper.js'
import $ from 'jquery';


$('[data-toggle="tooltip"]').tooltip();

//
$('[data-toggle="tooltip"]').click(function(){
   console.log($(this).data('original-title'));
   $(this).toggleClass('icon-active');
});
$('[data-toggle="dropdown"]').focus(function(){
   $(this).dropdown("toggle")
});

$('.jedi-textarea-toolbar .dropdown-item').click(function(){
    $(this).addClass('active');
 });
