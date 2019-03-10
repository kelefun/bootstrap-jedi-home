import 'bootstrap/dist/js/bootstrap'
import './editor.scss';

import 'util'
import 'popper.js'
import $ from 'jquery';

$(document).ready(function(){
   let idOfHideTimer;
   //初始化tips
   $('[data-toggle="tooltip"]').tooltip();
   //
   $('[data-toggle="tooltip"]').on('click',function () {
      console.log($(this).data('original-title'));
      $(this).toggleClass('icon-active');
      let result=document.execCommand("bold",false,null);
      console.log(result);
   
   });
   $('.jedi-textarea-toolbar .dropdown').hover(function () {
      $('.jedi-textarea-toolbar .dropdown-menu').addClass('show');
      if (idOfHideTimer) {
         clearTimeout(idOfHideTimer);
      }
   }, function () {
      idOfHideTimer = setTimeout(() => {
         $('.jedi-textarea-toolbar .dropdown-menu').removeClass('show')
      }, 200);
   
   })
   
   $('.jedi-textarea-toolbar .dropdown-item').click(function () {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      $('.jedi-textarea-toolbar .dropdown-menu').removeClass('show');
   });
})

