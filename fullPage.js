$(document).ready(function () {
  $("#fullpage").fullpage({
    // options
    // autoScrolling: true,
    // scrollHorizontally: true,
    // 네비게이션
    navigation: true,
    navigationPosition: "right",

    // 링크
    anchors: ["menu1", "menu2", "menu3", "menu4", "menu5"],
    // 배경색
    sectionsColor: ["#F2805F", "#8A7DD8", "#6EE38A", "#EBE568"],
  });
});


