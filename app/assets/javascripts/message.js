$(function () {
  function buildHTML(message) {
    if (message.image) {
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
            <img src=${message.image} >
          </div>
        </div>`
      return html;
    } else {
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
          </div>
        </div>`
      return html;
    };
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
        $('.form__input-box__text').val('');
        console.log('OK2');
        let position = $('.chat__messages')[0].scrollHeight;
        let test = $('.chat')[0].scrollHeight;
        console.log(position);
        console.log(`テスト:${test}`);
        $('.chat__messages').animate(
          { scrollTop: position },
          'slow',
          'swing'
        );
      })
      .fail(function (data1, data2, data3) {
        alert('error');
        console.log(data1.status);
        console.log(data2);
        console.log(data3);
      })
      .always(function () {
        $('.form__btn').attr('disabled', false);
      })
    e.stopPropagation();
  })
});