// kita panggil id formINput untuk dijadikan document objek model
let formInput = document.getElementById("formInput");
let parent = document.getElementById("parent");

function createNote (data) {
    data.preventDefault();
    //ambil data dari form input dengan id note
    let note = data.target.note.value;
    //tampilkan data note ke console
    console.log(note);    
    
    //ambil data  dari local storage dengan method getItem
    let dataStorage = localStorage.getItem("dataStorage")
    //jika data didalam storage masih null maka
    if (dataStorage == null){
     localStorage.setItem("dataStorage", "[]"); //create di localstorage array kosong
     dataStorage = localStorage.getItem("dataStorage") //get item lagi (arraykosongnya)
    }
    //rubah datastorage  menjadi JSON
    let jsonDataStorage=JSON.parse(dataStorage);

    //kita push data dari input note ke jsonDataStorage. method push itu untuk metode yang digunakan pada array untuk menambahkan satu atau lebih elemen ke akhir array.
    jsonDataStorage.push({
        id : Date.now(),
        note : note,
        date : Date.now()
    });

    data.target.note.value = "";


    //kita kembalikan atau create data dari JSON ke localStorage dengan method setItem dan rubah tipe datanya menjadi string (stringofy)

    localStorage.setItem("dataStorage", JSON.stringify(jsonDataStorage));
    window.alert("data berhasil disimpan");

    //kita reload page html
    window.location.reload();

}
//membuat compnent noteCard
function NoteCard(id, content, date){
    //kita buat element div
    let div = document.createElement("div");
    div.setAttribute("id", id);
    div.setAttribute("class", "w-full min-h-[120px] p-2 flex flex-col bg-white shadow-md rounded-md relative") //ketika ada atribute yang posisinya absolute harus dikasih relative supaya atribute tetap masih dalam div
    // buat elemen paragraf

    let p =document.createElement("p");
    p.setAttribute("class", "font-light");
    p.textContent = content

    ///buat element small
     let small = document.createElement("small")
     small.setAttribute("class", "text-slate-500 italic text-xs mt-auto")
     small.textContent = formatDate(date);
    

     //buat element button close
     let buttonClose = document.createElement("button");
     buttonClose.setAttribute("class", "w-10 h-10 bg-red-500 flex justify-center items-center rounded-md absolute right-2 top-2") //posisiton absolute itu posisi yang ditempatkan terserah (tidak masuk hierarki dalam div)
     buttonClose.textContent = "x";
     buttonClose.addEventListener("click", ()=>{deleteCard(id)})

     //kita masukan element child ke div
     div.appendChild(p);
     div.appendChild(small);
     div.appendChild(buttonClose);

     return div;

}
//kita test
// parent.appendChild(NoteCard(1, "ini test aja", "27/10/2023"))
// parent.appendChild(NoteCard(1, "ini test aja", "27/10/2023"))
//buat function untuk merender data dari localStorage ke html

function renderToHtml(){
//kita ambil data dari localstorage

let dataStorage = localStorage.getItem("dataStorage");

// jika tidak ada data di local storage maka abaikan
if (dataStorage==null){
    return;
}
//ubah tipe data string dari storage menjadi json/object
let jsonDataStorage = JSON.parse (dataStorage);

//mapping data dari jsondatastorage ke html

jsonDataStorage.reverse().map((elem)=>{
    parent.appendChild(NoteCard(elem.id, elem.note,elem.date));
});
}

function formatDate(date){
    let newDate = new Date(date);
    let day = newDate.getDate().toString().padStart(2, '0');
    let month = (newDate.getMonth() +1).toString().padStart(2, "0");
    let year = newDate.getFullYear();
    let hour = newDate.getHours().toString().padStart(2, "0");
    let minute = newDate.getMinutes().toString().padStart(2,"0");

    let format = `${day}/${month}/${year}/${hour}/${minute}`;
    return format;

}

//buat fungsi delete 
function deleteCard(id){
//konfirmasi ke user
let confirm = window.confirm("Yakin delete card ini?");
if (!confirm) return; //code stop disini
//ambil data dari localstorage
let dataStorage = localStorage.getItem("dataStorage"); // mengambil data dalam bentuk string

let dataStorageJson = JSON.parse(dataStorage); // dibuah dari string menjadi object

//filter array diatas dengan membuat array baru yang akan disimpan di localstorage (tanpa konten dengan id yang akan dihapus)
let newArray = dataStorageJson.filter((e)=>{ //membuat array baru dengan memfilter e.id yang tidak sama dengan id (yang mau didelet) jadi yang tersimpan di newArray yang tidak akam dihapus
    return  e.id != id;

    //e diatas itu perwakilan dari setiap objek di local storage, contoh :
    //e.note
    //e.date
});

localStorage.setItem("dataStorage", JSON.stringify(newArray));
window.location.reload();

}

renderToHtml();

formInput.addEventListener("submit", createNote);

