(function form() {

  // ПРОВЕРКА ВАЛИДНОСТИ ПОЛЕЙ Form

 
  var messageBtn = document.getElementById("message-btn");
  var callbackBtn = document.getElementById("callback-btn");
  var trainingBtn = document.getElementById("training-btn");
  var programmBtn = document.getElementById("programm-btn");

  function showError(elem) {
    elem.parentElement.classList.add("form__item--error");    
  };

  function controlError(elem) {
    elem.addEventListener("blur", function(event) {
      if(this.value) { 
        elem.parentElement.classList.remove("form__item--error");
      }
    }, true);  
  };

  function validator(formElements) {
    for (var i = 0; i < formElements.length - 1; i++) {
      if(!formElements[i].value) {
        showError(formElements[i]);
        controlError(formElements[i]);
        return false;
      }
    }
    return true;
  };

  function sendData(form) {
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    formData.append("btn", form.elements.btn.value);

    xhr.open("POST", "send.php");
    xhr.send(formData);
  }

  function showAppeal(block) {
    block.innerHTML = '<strong class="feedback__item-appeal feedback__item-appeal--sent">\
                                    Ваше сообщение успешно отправлено!</strong>\
                                    <a href="index.html" class="btn-inclined-lines feedback__btn-back">На главную</a>';
  }
  
  function handleRequest() {
    event.preventDefault();
    var feedbackItemText = this.closest(".feedback__item-text");
    var form = this.parentElement;
    var formElements = form.elements; 

    if (validator(formElements)) {      
      sendData(form);
      showAppeal(feedbackItemText);
    };    
  }

  messageBtn.addEventListener("click", handleRequest);
  callbackBtn.addEventListener("click", handleRequest);
  trainingBtn.addEventListener("click", handleRequest);
  programmBtn.addEventListener("click", handleRequest);

})();