let productos = [];
let Json_producto = localStorage.getItem("catID")
let Url_productos = "https://japceibal.github.io/emercado-api/cats_products/" + Json_producto + ".json";




const ORDER_ASC_BY_COST = "PriceAsc";
const ORDER_DESC_BY_COST = "PriceDesc";
const ORDER_BY_PROD_SOLD = "Cant.";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_SOLD){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}



function showProductsList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < productos.length; i++){ 
        let product = productos[i];
        //buscador
        let  busqueda = document.getElementById('site-search').value.toLowerCase();


        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) &&
        ((product.name.toLowerCase().includes(busqueda)))){


        htmlContentToAppend += `
        <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ product.name +` - `+ product.currency +` `+ product.cost + `</h4> 
                        <p> `+ product.description +`</p> 
                        </div>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
     }
        
        document.getElementById("products-container").innerHTML = htmlContentToAppend; 
        
    }
}


function sortAndShowProducts(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        productos = categoriesArray;
    }

    productos = sortProducts(currentSortCriteria, productos);

    //Muestro las categorías ordenadas
    showProductsList();
}


document.addEventListener("DOMContentLoaded", function (e){
    getJSONData(Url_productos).then(function (resultObj){
         if (resultObj.status === "ok") 
         {
            productos = resultObj.data.products;
            showProductsList();
         }   
    })


document.getElementById("sortAsc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_ASC_BY_COST);
});

document.getElementById("sortDesc").addEventListener("click", function(){
    sortAndShowProducts(ORDER_DESC_BY_COST);
});

document.getElementById("sortBySold").addEventListener("click", function(){
    sortAndShowProducts(ORDER_BY_PROD_SOLD);
});

document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = "";
    document.getElementById("rangeFilterCountMax").value = "";

    minCount = undefined;
    maxCount = undefined;

    showProductsList();
});

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showProductsList();
});
});



