const url = "http://localhost:4000/cafe";

let latlngList = [];
let cafeList = [];

fetch("./pet.json")
  .then((response) => response.json())
  .then((data) => {
    let cafes = data["cafe"];
    cafes.forEach((item) => {
      name = item.name;
      address = item.address;
      workingtime = item.workingtime;
      photo = item.photo;

      cafeInfo = {
        name: item.name,
        address: item.address,
        workingtime: item.workingtime,
        photo: item.photo,
      };

      // showPopup(name, address, workingtime);
      latlngInfo = {
        Latitude: item.Latitude,
        Longitude: item.Longitude,
        title: item.name,
      };

      latlngList.push(latlngInfo);
      cafeList.push(cafeInfo);
    });

    let positions = [];

    //   위치 정보를 저장
    latlngList.forEach((item) => {
      positions.push({
        latlng: new kakao.maps.LatLng(item.Latitude, item.Longitude),
        title: item.title,
      });
    });

    //지도 출력 기능을 가진 함수 호출
    showMap(positions);
  });

// 인포윈도우를 표시하는 클로저를 만드는 함수입니다.
function makeClick(map, marker, infoWindow) {
  return function () {
    infoWindow.open(map, marker);
  };
}

let marker;
// 지도
function showMap(positions) {
  let mapContainer = document.getElementById("map"); // 지도를 표시할 div

  let mapOption = {
    center: new kakao.maps.LatLng(37.5952285, 127.0762442), // 지도의 중심좌표
    level: 6, // 지도의 확대 레벨
    marker: positions,
  };

  let map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // 마커 이미지의 이미지 주소입니다
  var imageSrc =
    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";

  //이미지 마커 표시
  for (let i = 0; i < positions.length; i++) {
    let imageSize = new kakao.maps.Size(24, 35);
    let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    // 마커 생성
    marker = new kakao.maps.Marker({
      map: map,
      position: positions[i].latlng,
      title: positions[i].name,
      image: markerImage,
    });

    var c_address = cafeList[i].address;
    var c_name = cafeList[i].name;
    var c_photo = cafeList[i].photo;

    var content =
      "<div class = img>" +
      '        <img src="' +
      c_photo +
      '" width="73" height = "70" > ' +
      "        </div>" +
      "                <div class=name>" +
      c_name +
      "</div>" +
      "                <div class=address>" +
      c_address +
      "</div>" +
      "            </div>" +
      "        </div>" +
      "    </div>" +
      "</div>";

    var iwRemoveable = true;

    var overlay = new kakao.maps.InfoWindow({
      content: content,
      removable: iwRemoveable, // overlay에 표시할 내용
    });

    kakao.maps.event.addListener(
      marker,
      "click",
      makeOverListener(map, marker, overlay)
    );
  }

  function makeOverListener(map, marker, infowindow) {
    return function () {
      infowindow.open(map, marker);
    };
  }

  // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
  var zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

  // 지도가 확대 또는 축소되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
  kakao.maps.event.addListener(map, "zoom_changed", function () {
    // 지도의 현재 레벨을 얻어옵니다
    var level = map.getLevel();

    var message = "현재 지도 레벨은 " + level + " 입니다";
    var resultDiv = document.getElementById("result");
    resultDiv.innerHTML = message;
  });
}
