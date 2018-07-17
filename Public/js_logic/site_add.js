var userId = getCookie("userId")
var token = getCookie("token")

if(userId == "" || token == ""){
    parent.location.href = CONFIG['path'];
}

$("#btn").click(function(){
    var gene = $("#gene").val();
    var origincode = $("#origincode").val();
    var itemid = $("#itemid").val();
    var gene_text = $("#gene_text").val();
    var wild_type = $("#wild_type").val();
    var mutant_type = $("#mutant_type").val();
    var genotype_value_ww = $("#genotype_value_ww").val();
    var genotype_value_wm = $("#genotype_value_wm").val();
    var genotype_value_mm = $("#genotype_value_mm").val();
    var risk_desc_ww = $("#risk_desc_ww").val();
    var risk_desc_wm = $("#risk_desc_wm").val();
    var risk_desc_mm = $("#risk_desc_mm").val();
    ajax("/Site/updSite",{"userId":userId,"token":token,"gene":gene,"origincode":origincode,"itemid":itemid,"gene_text":gene_text,"wild_type":wild_type,"mutant_type":mutant_type,"genotype_value_ww":genotype_value_ww,"genotype_value_wm":genotype_value_wm,"genotype_value_mm":genotype_value_mm,"risk_desc_ww":risk_desc_ww,"risk_desc_wm":risk_desc_wm,"risk_desc_mm":risk_desc_mm},function(result){
        if(result["code"] == 0){
            alert(result["msg"])
            location.href = CONFIG['path']+"Index/site_list";
        }
    });
})