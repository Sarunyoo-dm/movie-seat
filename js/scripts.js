const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count =document.getElementById('count');
const total =document.getElementById('total');

const movieSelect = document.getElementById('movie');

//* คำนวณราคา
let price = +movieSelect.value; //* ใส่ +ด้านหน้าเพื่อทำให้เป็น int

//*เลือกที่นั่ง
//* ถ้าคลิก ต้องเป็น คลาส seat และ ไม่ใช่ คลาส occupied
container.addEventListener('click',e=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelected();
    }
});

//* นับจำนวนที่นั่งและราคา
function updateSelected(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected') //* เข้าถึงแถวแต่ละแถวโดยมี class seat selected
    const countseats = selectedSeats.length; //* นับจำนวนที่นั่ง
    const seatIndex = [...selectedSeats].map(seat=>[...seats].indexOf(seat)); //*กรองจากที่นั่งที่เหลือ โดย map จาก seats และเลือกเฉพาะ index
    console.log(seatIndex);
    localStorage.setItem("selectedSeats",JSON.stringify(seatIndex));
    count.innerText = countseats;
    total.innerText = countseats*price;
}

//* เลือกชื่อหนังและราคา
movieSelect.addEventListener('change',e=>{
    price = +e.target.value
    setMovieData(e.target.selectedIndex,e.target.value);
    updateSelected();
}); 

//* จัดเก็บ data ลง localStorage
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem("movieIndex",movieIndex);
    localStorage.setItem("moviePrice",moviePrice);
}

//* ดึง data มาแสดง
function showDatatoUI(){
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats")); 
    const selectmovieIndex = localStorage.getItem("movieIndex"); //* เก็บตำแหน่งหนังที่เรากดจองไว้
    seats.forEach((seat,index)=>{
        if(selectedSeats.indexOf(index)>-1){
            seat.classList.add('selected');
        }
    })
    if(selectmovieIndex != null){
        movieSelect.selectedIndex = selectmovieIndex;
    }
}

showDatatoUI();
updateSelected();