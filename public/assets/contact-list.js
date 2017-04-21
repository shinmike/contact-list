$(document).ready(function(){

  $('form').on('submit', function(){

      var contact = $('form input');
      var contacts = {name: contact.val()};

      $.ajax({
        type: 'POST',
        url: '/contacts',
        data: contacts,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var contact = $(this).text().replace(/ /g, "-");
      $.ajax({
        type: 'DELETE',
        url: '/contacts/' + contact,
        success: function(data){
          //do something with the data via front-end framework
          location.reload();
        }
      });
  });

});
