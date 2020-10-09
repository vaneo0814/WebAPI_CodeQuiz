function showHighScore() {
    var high_score= JSON.parse(localStorage.getItem("high_score")) || [];
  
    high_score.sort(function (a, b) {
      return b.score - a.score
    })
    var contentUl = document.createElement("ul")
    for (var i = 0; i < high_score.length; i++) {
      var contentLi = document.createElement("li");
      contentLi.textContent = "Name: " + high_score[i].name + " Score: " + high_score[i].score;
      contentUl.append(contentLi);
    }
  
    document.body.append(contentUl)
  }
  showHighScore();
  
  function clearScores() {
      localStorage.removeItem("high_score");
      window.location.reload(); 
  }
  
  document.getElementById("clearScores").onclick = clearScores;