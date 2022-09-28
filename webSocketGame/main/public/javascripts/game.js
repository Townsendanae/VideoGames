var socket = io();
socket.on("messages", function (data) {
    var html = data
      .map(function (elem, index) {
        return `<div>
                <strong>${elem.author}</strong>:
                <em>${elem.text}</em>
              </div>`;
      })
      .join(" ");
  
    document.getElementById("messages").innerHTML = html;
    console.log(data)
});
  
  function addMessage(e) {
    var message = {
      author: document.getElementById("username").value,
      text: document.getElementById("texto").value,
    };
    console.log("nuevo mensaje",message)
    console.log(messages)
    socket.emit("new-message", message);
    return false;
  }