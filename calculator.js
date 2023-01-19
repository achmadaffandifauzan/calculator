$('.button').each(function () {
  $(this).attr("onclick", "clickButton(event)")
})
let inputNum = document.querySelector("#inputNum")
let resultNum = document.querySelector("#resultNum")

var mathIn = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '*': function (x, y) { return x * y },
  '/': function (x, y) { return x / y },
  '%': function (x, y) { return x % y },
  ':': function (x, y) { return slice(0, x.length - 1) }
}
let arr1 = [];

function clickButton(e) {
  if (e.target.id == "equal") {
    let sementara = mathIn[arr1[1]](parseFloat(arr1[0]), parseFloat(arr1[2]));
    arr1 = [];
    arr1.push(sementara);
    //alert(arr1)
    inputNum.innerText = arr1[0];
    resultNum.innerText += e.target.innerText;

  } else if (e.target.id == "clear") {
    if (arr1[arr1.length - 1].length > 1) {
      arr1[arr1.length - 1] = arr1[arr1.length - 1].substring(0, arr1[arr1.length - 1].length - 1);
    } else {
      arr1.pop();
    }
    resultNum.innerText = resultNum.innerText.substring(0, resultNum.innerText.length - 1)
    inputNum.innerText = arr1[arr1.length - 1];
  } else if (e.target.id == "delete") {
    arr1 = [];
    resultNum.innerText = "";
    inputNum.innerText = "";
  } else {
    if (arr1.length >= 1) {
      // meng append ke angka yang sudah ada (termasuk titik dan minus di awal)
      if ((isNaN(arr1[arr1.length - 1]) == false && isNaN(e.target.innerText) == false) || e.target.id == "dot" || (arr1.length == 1 && arr1[0] == "-")) {
        arr1[arr1.length - 1] += e.target.innerText;
        inputNum.innerText += e.target.innerText;
      } else if (arr1.length == 3 && isNaN(e.target.innerText) == true) {
        // kalau bukan '=' yang untuk menghitung (kalau misal 9*9 lalu pencet * lagi)
        let sementara = mathIn[arr1[1]](parseFloat(arr1[0]), parseFloat(arr1[2]));
        arr1 = [];
        arr1.push(sementara); // [hasilAngka,]
        arr1.push(e.target.innerText); // menambah arr1 biar ada op lagi [angka,operator]
        //alert(arr1);
        inputNum.innerText = arr1[0];

      } else {
        arr1.push(e.target.innerText);
        // kalau angka, inputNum jadi angka itu (jadi inputNum selalu berubah)
        if (isNaN(e.target.innerText) == false) {
          inputNum.innerText = e.target.innerText;
        } else {
          // kalau tekan operator setelah =, maka resultNum dibersihkan
          resultNum.innerText = arr1[0]; // untuk mereset resultNum
        }
      }
      // memasukkan angka biasa pertama kali
    } else if (isNaN(e.target.innerText) == false || e.target.innerText == '-') {
      arr1.push(e.target.innerText);
      inputNum.innerText = e.target.innerText;
    }
    //alert(arr1);

    resultNum.innerText += e.target.innerText;
  }

}
