$(function () {
  let search_list = $('#user-search-result');
  function appendHTML(user) {
    // let user_name = user.name ? user.name : "一致するユーザーが見つかりません"
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div`
    search_list.append(html);
  }

  function notApplicableToHTML(msg) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div`
    search_list.append(html);
  }

  $('#user-search-field').on("keyup", function () {
    let input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json',
    })
      .done(function (users) {
        search_list.empty();
        if (users.length !== 0) {
          users.forEach(function (user) {
            appendHTML(user);
          });
        } else {
          notApplicableToHTML("一致するユーザーが見つかりません");
        }
      })
      .fail(function (a, b, c) {
        console.log('fail');
        console.log(a.status);
        console.log(b);
        console.log(c);
        alert('ユーザー検索に失敗しました');
      })
  })
});