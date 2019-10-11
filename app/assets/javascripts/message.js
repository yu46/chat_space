$(function () {
  function buildHTML(message) {
    let image = message.image ? message.image : ""
    let html =
      `<div class="message">
          <div class="message__top">
            <p class="message__top__user-name">
              ${message.user_name}
            </p>
            <p class="message__top__date">
                ${message.created_at}
            </p>
          </div>
          <div class="message__bottom">
            <p class="message__bottom__text">
              ${message.content}
            </p>
            <img src=${image} >
          </div>
        </div>`
    return html;
  }
  $('#new_message').on("submit", function (e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (data) {
        console.log('OK1');
        let html = buildHTML(data);
        $('.chat__messages').append(html);
        $('form')[0].reset();
        let position = $('.chat__messages')[0].scrollHeight;
        $('.chat__messages').animate(
          { scrollTop: position },
          'slow',
          'swing'
        );
      })
      .fail(function () {
        alert('error');
      })
      .always(function () {
        $('.form__btn').attr('disabled', false);
      })
    e.stopPropagation();
  })
});



