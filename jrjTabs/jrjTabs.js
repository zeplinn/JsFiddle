//jquery tab Plugin

(function ($) {
    
    function JrjTabs(placeholder,options) {
        
        var $sc = function (parent, child) { return $(parent).children("."+child); };
        var $cp = function (child, parent) { return $(child).closest("."+parent); };
        // var $find= function(parent,child){ return $find}
        var obj = this,
            count = 1,
            ctabid="data-tabid",
            cbar = "jrj-tab-bar",
            ctabs= "jrj-tab-selectors",
            ctab= "jrj-tab-selector",
            cbody = "jrj-tab-body",
            celem = function(i){return "jrj-tab-elem-"+i},
            cselected = "jrj-selected",
            opt = $.extend({
                body:{
                    height:"200px",
                    content:function(body_){ return null;}
                },
                tabs:{
                    height:"20px"
                },
                onRemove:function(tab_,body_){},
                width:"100%"                
                
            },options),
            $tabbar = $sc($(placeholder).append('<div class="' + cbar + '"></div>'),cbar),
            $lefttab=$sc($tabbar.append('<i class="jrj-tab-left"></i>'),"i")                        
            $tabs = $sc($tabbar.append('<ul class="'+ctabs+'"></ul>'),ctabs),
            $righttab=$sc($tabbar.append('<i class="jrj-tab-right"></i>'),"i") 
            $tabbody = $sc($(placeholder).append('<div class="' + cbody + '"></div>'),cbody);

            function newtab( tabname_){
                
                
                // <i class="icon ion-android-close"></i>
                var t= {
                    header:'<li class="'+ celem(count)+'"><h4 class="jrj-tab-selector"><a '+ctabid+'="'+count+'">'+tabname_+'</a><i class="jrj-tab-close"></i></h4></li>',
                    body: '<div class="'+ celem(count)+'"></div>'  
                };
                count+=1;
                return t;
            }
            function select(tabid){
                // remove selected from old
                $sc($tabs,cselected).removeClass(cselected);
                $sc($tabbody,cselected).removeClass(cselected);
                //add selection to new
                $sc($tabs,celem(tabid)).addClass(cselected);
                $sc($tabbody,celem(tabid)).addClass(cselected);
            }
            
            
            function removeTab(tab_){
                var selector=tab_.children(),
                    tabid_ = selector.children("a").attr(ctabid);
                
                selector.children("a").off();
                selector.children("i").off();
                opt.onRemove(   tab_.detach(), 
                                $sc($tabbody,celem(tabid_)).detach() );
            }
            
            
            
            obj.addTab = function(tabname_){
                var t = newtab(tabname_),
                    body__ = $sc($tabbody.append(t.body),celem(count-1)),
                    tab__ =$sc($tabs.append(t.header),celem(count-1)),
                    addopt = opt.body.content(body__),
                    lopt = $.extend({select:false},addopt);
                if (lopt.select) {
                    select(count-1);
                    alert();
                }
                tab__.children().children("a").on("click",function(){
                    var tabid_ = $(this).attr(ctabid);                    
                    select(tabid_);
                });
                tab__.children().children("i").on("click",function(){
                    var tab_ = $cp(this,ctab);                
                    removeTab(tab_);                    
                });                      
            }

        };

    $.jrjTabs=function(placeholder,options){
        var tab = new JrjTabs(placeholder,options);
        return tab;
    }
    $.fn.jrjTabs = function (options) {
        return this.each(function () {
            $.jrjTabs(this, options);
        });
    };
    
})(jQuery);