var slideIndex = 1;
showSlide(slideIndex);
function plusSlides(n) {
    showSlide(slideIndex += n);
}

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1
    }

    if (n < 1) {
        slideIndex = slides.length
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace("active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += "";
}

const btns_econom = document.querySelectorAll('.counter_btn_econom');

btns_econom.forEach(btn => {
    btn.addEventListener('click', function() {
        const direction = this.dataset.direction;
        const inp = this.parentElement.querySelector('.counter_value_econom');
        const currentValue = +inp.value;
        let newValue;

        if (direction === 'plus') {
            newValue = currentValue + 1;
        } else {
            newValue = currentValue - 1 > 0 ? currentValue - 1 : 0;
        }

        inp.value = newValue;

    })
})

const btns_buisness = document.querySelectorAll('.counter_btn_business');

btns_buisness.forEach(btn => {
    btn.addEventListener('click', function() {
        const direction = this.dataset.direction;
        const inp = this.parentElement.querySelector('.counter_value_business');
        const currentValue = +inp.value;
        let newValue;

        if (direction === 'plus') {
            newValue = currentValue + 1;
        } else {
            newValue = currentValue - 1 > 0 ? currentValue - 1 : 0;
        }

        inp.value = newValue;
    })
})

const btns_vip = document.querySelectorAll('.counter_btn_vip');

btns_vip.forEach(btn => {
    btn.addEventListener('click', function() {
        const direction = this.dataset.direction;
        const inp = this.parentElement.querySelector('.counter_value_vip');
        const currentValue = +inp.value;
        let newValue;

        if (direction === 'plus') {
            newValue = currentValue + 1;
        } else {
            newValue = currentValue - 1 > 0 ? currentValue - 1 : 0;
        }

        inp.value = newValue;
    })
})


let admarea = [];
let district = [];
let typeObject = [];
let content;


async function getResponse() {
    let response = await fetch('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=5dafa11f-92c6-479a-b181-87c0ee55146a')
    let content = await response.json()
    let key;
    for (key in content) {
        if (admarea.indexOf(content[key].admArea) === -1 && content[key].admArea !== null) {
            admarea.push(content[key].admArea);
            let option = document.createElement('option');
            option.value = content[key].admArea;
            option.innerHTML = content[key].admArea;
            document.querySelector('.form-select1').append(option);
        };
        if (district.indexOf(content[key].district) === -1 && content[key].district !== null) {
            district.push(content[key].district);
            let option = document.createElement('option');
            option.value = content[key].district
            option.innerHTML = content[key].district
            document.querySelector('.form-select2').append(option);
        };
        if (typeObject.indexOf(content[key].typeObject) === -1 && content[key].typeObject !== null) {
            typeObject.push(content[key].typeObject);
            let option = document.createElement('option');
            option.value = content[key].typeObject;
            option.innerHTML = content[key].typeObject;
            document.querySelector('.form-select3').append(option);
        };
        
        //document.querySelector('.json_out').innerHTML += `<li class="json_out"><h1>${content[key].address}</h1></li>`;
    };

    return content;
    
};

content = getResponse();


async function check_select(admarea, district, typeObject, discount) {
    let response = await fetch('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=5dafa11f-92c6-479a-b181-87c0ee55146a')
    let content = await response.json()
    let key;
    for (key in content) {
        if (content[key].admArea === admarea && content[key].district === district && content[key].typeObject === typeObject && String(content[key].socialPrivileges) === discount) {
            document.querySelector('.name').innerHTML = `<th class="1.name">${content[key].name}</th>`;
            document.querySelector('.type').innerHTML = `<td class="1.name">${content[key].typeObject}</td>`;
            document.querySelector('.address').innerHTML = `<td class="1.name">${content[key].address}</td>`;
        };
    };
};


async function check_prices(admarea, district, typeObject, discount) {
    let response = await fetch('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=5dafa11f-92c6-479a-b181-87c0ee55146a')
    let content = await response.json()
    let content1= Number(content);
    let key;
    for (key in content) {
        if (content[key].admArea === admarea && content[key].district === district && content[key].typeObject === typeObject && String(content[key].socialPrivileges) === discount) {
            document.querySelector('.econom_price').innerHTML = `<p class="econom_price" style="text-align: center;">${content1[key].set_1}</p>`;
            document.querySelector('.business_price').innerHTML = `<p class="business_price" style="text-align: center;">${content1[key].set_2}</p>`;
            document.querySelector('.vip_price').innerHTML = `<p class="vip_price" style="text-align: center;">${content1[key].set_3}</p>`;
        };
    };
};


async function check_discounts(admarea, district, typeObject, discount) {
    let response = await fetch('http://exam-2022-1-api.std-900.ist.mospolytech.ru/api/restaurants?api_key=5dafa11f-92c6-479a-b181-87c0ee55146a')
    let content = await response.json()
    let key;
    for (key in content) {
        if (content[key].admArea === admarea && content[key].district === district && content[key].typeObject === typeObject && String(content[key].socialPrivileges) === discount) {
            return content[key].socialDiscount;
        };
    };
};


document.querySelector('.btn-found').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    check_select(admarea, district, typeObject, discount);
    
});


document.querySelector('.btn-add-1').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let btnElement  = document.querySelector('.btn-add-1');
    btnElement.style.visibility='visible';
    //document.getElementsByClassName('.btn-add-1').style.visibility ='visible';
    let discount = document.querySelector('.form-select4').value;
    check_prices(admarea, district, typeObject, discount);   
});

document.querySelector('.btn-add-2').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    document.getElementsByClassName('.btn-add-2').style.visibility ='visible';
    check_prices(admarea, district, typeObject, discount);
});

document.querySelector('.btn-add-3').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    document.getElementsByClassName('.btn-add-3').style.visibility ='visible';
    check_prices(admarea, district, typeObject, discount);
});

document.querySelector('.btn-add-4').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    document.getElementsByClassName('.btn-add-4').style.visibility ='visible';
    check_prices(admarea, district, typeObject, discount);
});

document.querySelector('.btn-add-5').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    document.getElementsByClassName('.btn-add-5').style.visibility ='visible';
    check_prices(admarea, district, typeObject, discount);
});

document.querySelector('.btn-add-6').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    document.getElementsByClassName('.btn-add-6').style.visibility ='visible';
    check_prices(admarea, district, typeObject, discount);
});

document.querySelector('.btn-add-7').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    document.getElementsByClassName('.btn-add-7').style.visibility ='visible';
    check_prices(admarea, district, typeObject, discount);
});

document.querySelector('.btn-add-8').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    document.getElementsByClassName('.btn-add-8').style.visibility ='visible';
    check_prices(admarea, district, typeObject, discount);
});

document.querySelector('.btn-add-9').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    document.getElementsByClassName('.btn-add-9')[0].style.visibility ='visible';
    check_prices(admarea, district, typeObject, discount);
});

document.querySelector('.btn-add-10').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    document.getElementsByClassName('.btn-add-10').style.visibility ='visible';
    check_prices(admarea, district, typeObject, discount);
});


document.querySelector('.make_an_order').addEventListener('click', () => {
    let admarea = document.querySelector('.form-select1').value;
    let district = document.querySelector('.form-select2').value;
    let typeObject = document.querySelector('.form-select3').value;
    let discount = document.querySelector('.form-select4').value;
    let data_econom = document.querySelector('.counter_value_econom').value;
    let data_business = document.querySelector('.counter_value_business').value;
    let data_vip = document.querySelector('.counter_value_vip').value;
    let econom_price = +document.querySelector('.econom_price').value;
    let business_price = +document.querySelector('.business_price').value;
    let vip_price = +document.querySelector('.vip_price').value;
    let result = data_econom * econom_price + data_business * business_price + data_vip * vip_price;
    let social_discount = check_discounts(admarea, district, typeObject, discount);
    if (document.querySelector('.student').checked) {
        result *= social_discount / 100;
    };
    if (document.querySelector('.fast_delivery').checked) {
            result *= 1.2;
    };
    document.querySelector('.out').innerHTML = result;
});


// function pageBtnHandler (event) {
//     if (event.taget.dataset.page) {
//         downloadData(event.taget.dataset.page);
//         window.scrollTo(0, 0);
//     }
// }

// function createPageBtn(page, classes = []) {
//     let btn = document.createElement('button');
//     classes.push('btn');
//     for (cls of classes) {
//         btn.classList.add(cls);
//     }
//     btn.dataset.page = page;
//     btn.innerHTML = page;
//     return btn;
// }

// function renderPaginationElement(info){
//     let btn;
//     let paginationCotainer = document.querySelector('.pagination');
//     paginationCotainer.innerHTML = '';

//     btn = createPageBtn(1, ['page-first-btn']);
//     btn.innerHTML = 'Первая страница';
//     if (info.current_page == 1) btn.style.visibility = 'hidden';
//     paginationCotainer.add(btn);

//     let buttonsContainer = document.createElement('div');
//     buttonsContainer.classList.add('page-btn');
//     paginationCotainer.append(btn);

//     let start = Math.max(info.current_page - 2, 1);
//     let end = Math.min(info.current_page + 2, info.total_pages);
//     for (let i  = start; i <= end; i++){
//         buttonsContainer.append(createPageBtn(i, i == info.current_page ? ['active'] : []));
//     }

//     btn = createPageBtn(info.total_pages, ['page-last-btn']);
//     btn.innerHTML = 'Последняя страница';
//     if (info.current_page == info.total_pages) btn.style.visibility = 'hidden';
//     paginationCotainer.add(btn);
// }

// function pagePerPageBtnHandler(event){
//     downloadData(1);
// }

// function setPaginationInfo(info){
//     document.querySelector('.total-count').innerHTML = info.total_count;
//     let start = info.total_count > 0 ? (info.current_page - 1) * info.per_page + 1 : 0;
//     document.querySelector('.current-interval-start').innerHTML = start;
//     let end = Math.min(info.total_count, start + info.per_page-1);
//     document.querySelector('.current-interval-end').innerHTML = end;
// }

// function downloadData(page = 1){
//     let List = document.querySelector('.list');
//     let url = new URL(List.dataset.url);
//     let perPage = document.querySelector('.per-page-btn').value;
//     url.searchParams.append('page', page);
//     url.searchParams.append('per-page', perPage);
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url);
//     xhr.responseType = "json";
//     xhr.onload = function(){
//         setPaginationInfo(this.response['_pagination']);
//         renderPaginationElement(this.response['_pagination']);
//     }
//     xhr.send();
// }



// window.onload = function(){
//     downloadData();
//     document.querySelector('.pagination').onclick = pageBtnHandler;
//     document.querySelector('.per-page-btn').onclick = pagePerPageBtnHandler;
// }