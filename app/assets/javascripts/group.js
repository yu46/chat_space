$(function () {
  function appendHTML(user) {
    let html = `<div class='chat-group-user'>
                  <input name='group[user_ids][]' type='hidden' value='${user.id}'>
                  <p class='chat-group-user__name'>${user.name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $('.js-add-user').append(html);
  }
  function removeListHTML(user) {
    $('[data-user-id=' + user.id + ']').parent().remove();
  }

  function removeMember(user) {
    $('input[value=' + user.id + ']').parent().remove();
  }

  $('#user-search-result').on("click", '.chat-group-user__btn--add', function () {


    let user_name = $(this).data('user-name');


    let url = location.href;
    $.ajax({
      type: 'GET',
      url: url,
      data: { name: user_name },
      dataType: 'json'
    })
      .done(function (user) {
        appendHTML(user);
        removeListHTML(user);
      })
      .fail(function () {
        console.log('error');
      })
  });

  $('.js-add-user').on('click', '.chat-group-user__btn--remove', function () {
    console.log('削除ボタン発火');
    let user_name = $(this).parent().find('p').text().replace(/\r?\n/g, "");
    let url = location.href;
    console.log(user_name);
    $.ajax({
      type: 'GET',
      url: url,
      data: { name: user_name },
      dataType: 'json'
    })
      .done(function (user) {
        removeMember(user);
      })
      .fail(function () {
        console.log('error');
      })
  });
});