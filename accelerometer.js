var aX = 0, aY = 0, aZ = 0;                     // 加速度の値を入れる変数を3個用意
var alpha = 0, beta = 0, gamma = 0;

function ClickRequestDeviceSensor(){
  //. ユーザーに「許可」を求めるダイアログを表示
  DeviceOrientationEvent.requestPermission().then( function( response ){
    if( response === 'granted' ){
      //. 画面上部のボタンを消す
      $('#sensorrequest').css( 'display', 'none' );
      //. 許可された場合のみイベントハンドラを追加できる
      window.addEventListener( "devicemotion", (dat) =>{
        aX = dat.accelerationIncludingGravity.x;    // x軸の重力加速度（Android と iOSでは正負が逆）
        aY = dat.accelerationIncludingGravity.y;    // y軸の重力加速度（Android と iOSでは正負が逆）
        aZ = dat.accelerationIncludingGravity.z;    // z軸の重力加速度（Android と iOSでは正負が逆）
      });

      window.addEventListener("deviceorientation", (dat) => {
        alpha = dat.alpha;  // z軸（表裏）まわりの回転の角度（反時計回りがプラス）
        beta  = dat.beta;   // x軸（左右）まわりの回転の角度（引き起こすとプラス）
        gamma = dat.gamma;  // y軸（上下）まわりの回転の角度（右に傾けるとプラス）
    });

      // 指定時間ごとに繰り返し実行される setInterval(実行する内容, 間隔[ms]) タイマーを設定
        var timer = window.setInterval(() => {
            displayData();      // displayData 関数を実行
        }, 200); // 33msごとに（1秒間に約5回）

      
    }
  }).catch( function( e ){
    console.log( e );
  });
}

//. DeviceOrientationEvent オブジェクトが有効な環境か？　をチェック
if( window.DeviceOrientationEvent ){
  //. iOS13 以上であれば DeviceOrientationEvent.requestPermission 関数が定義されているので、ここで条件分岐
  if( DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function' ){
    //. iOS 13 以上の場合、
    //. 画面上部に「センサーの有効化」ボタンを追加
    var banner = '<div  style="z-index: 1; position: absolute; width: 100%; background-color: rgb(0, 0, 0);" onclick="ClickRequestDeviceSensor();" id="sensorrequest"><p style="color: rgb(0, 0, 255);">センサーの有効化</p></div>';
    $('body').prepend( banner );
  }else{
    //. Android または iOS 13 未満の場合、
    //. DeviceOrientationEvent オブジェクトが有効な場合のみ、deviceorientation イベント発生時に deviceOrientaion 関数がハンドリングするよう登録
    window.addEventListener( "devicemotion", (dat) =>{
        aX = dat.accelerationIncludingGravity.x;    // x軸の重力加速度（Android と iOSでは正負が逆）
        aY = dat.accelerationIncludingGravity.y;    // y軸の重力加速度（Android と iOSでは正負が逆）
        aZ = dat.accelerationIncludingGravity.z;    // z軸の重力加速度（Android と iOSでは正負が逆）
      });

      window.addEventListener("deviceorientation", (dat) => {
        alpha = dat.alpha;  // z軸（表裏）まわりの回転の角度（反時計回りがプラス）
        beta  = dat.beta;   // x軸（左右）まわりの回転の角度（引き起こすとプラス）
        gamma = dat.gamma;  // y軸（上下）まわりの回転の角度（右に傾けるとプラス）
    });

      // 指定時間ごとに繰り返し実行される setInterval(実行する内容, 間隔[ms]) タイマーを設定
        var timer = window.setInterval(() => {
            displayData();      // displayData 関数を実行
        }, 200); // 200msごとに（1秒間に約5回）
  }
}
  

//. deviceorientation イベントハンドラ
function deviceOrientation( e ){
  //. 通常の処理を無効にする
  e.preventDefault();

  //. スマホの向きを取得
  var dir = e.alpha;   //. 北極方向に対する向きの角度
  var fb = e.beta;      //. 前後の傾き角度
  var lr = e.gamma;  //. 左右の傾き角度

    
}

// データを表示する displayData 関数
function displayData() {
    var txt = document.getElementById("txt");   // データを表示するdiv要素の取得
    txt.innerHTML = "x: " + aX.toPrecision(4) + "<br>"         // x軸の値
                  + "y: " + aY.toPrecision(4) + "<br>"         // y軸の値
                  + "z: " + aZ.toPrecision(4) + "<br>"         // z軸の値
                  +  "α: " + alpha.toPrecision(4) + "<br>"         // x軸の値
                  + "β: " + beta.toPrecision(4) + "<br>"         // y軸の値
                  + "γ: " + gamma.toPrecision(4) + "<br>"         // z軸の値
}
  
