let autos = [];

function showCategoriesList(arr){
    let htmlContentToAppend = "";
    for(let i = 0; i < arr.length; i++){ 
        let category = arr[i];
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name +` - `+ category.currency +` `+ category.cost + `</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` vendidos</small> 
                    </div>

                </div>
            </div>
        </div>
        `
        
        document.getElementById("autos-container").innerHTML = htmlContentToAppend; 
        
    }
}

document.addEventListener("DOMContentLoaded", function (e){
    getJSONData(URL_AUTOS).then(function (resultObj){
         if (resultObj.status === "ok") 
         {
            autos = resultObj.data.products;
            showCategoriesList(autos);
         }   
    })
});
