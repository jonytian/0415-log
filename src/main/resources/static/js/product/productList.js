/**
 * 产品管理
 */


layui.extend({
    tableFilter: '{/}../../js/tableFilter'
});
var pageCurr;

$(function() {

    layui.use(['jquery', 'table', 'code','util','form','tableFilter'], function(){
        layui.code();
        var $ = layui.jquery,
             table = layui.table
            ,form = layui.form
            ,util = layui.util
            ,tableFilter = layui.tableFilter;

       var tableIns=table.render({
            id: 'idTest',
            elem: '#demo'
            ,url:'/product/getProducts'
            ,method: 'post' //默认：get请求
            ,cellMinWidth: 80
            , height: 'full-250'
            ,limits: [20,50,100,1000]
            ,limit: 20
            ,page: true,
            request: {
                pageName: 'page' //页码的参数名称，默认：page
                ,limitName: 'limit' //每页数据量的参数名，默认：limit
            },response:{
                statusName: 'code' //数据状态的字段名称，默认：code
                ,statusCode: 200 //成功的状态码，默认：0
                ,countName: 'totals' //数据总数的字段名称，默认：count
                ,dataName: 'list' //数据列表的字段名称，默认：data
            }
            ,   cols : [ [  //日期，箱号，整机SN，IMEI，ICCID，BT号段，wifi号段
                {type:'checkbox'},
                {field : 'date',width : 200,title : '日期', align: 'center'},
                {field : 'case_number', width : 200, title : '箱号', align: 'center'},
                {field : 'product_type', width : 200, title : '产品类型', align: 'center'},
                {field : 'machine_sn', width : 200, title : '整机SN', align: 'center'},
                {field : 'imei_1', width : 200, title : 'IMEI1', align: 'center'},
                {field : 'aging_test_temperature', width : 200, title : '老化测试温度', align: 'center'},
                {field : 'motherboard_id', width : 200, title : '主板ID', align: 'center'},
                {field : 'main_camera', width : 200, title : '主摄像头', align: 'center'},
                {field : 'usb_camera', width : 200, title : 'USB摄像头', align: 'center'},
                {field : 'secondary_camera', width : 200, title : '副摄像头', align: 'center'},
                {field : 'imei_2', width : 200, title : 'IMEI2', align: 'center'},
                {field : 'motherboard_sn', width : 200, title : '主板SN', align: 'center'},
                {field : 'ICCID1', width : 200, title : 'ICCID1', align: 'center'},
                {field : 'ICCID2', width : 200, title : 'ICCID2', align: 'center'},
                {field : 'BT', width : 200, title : 'BT', align: 'center'},
                {field : 'WiFi', width : 200, title : 'WiFi', align: 'center'},
                {field : 'software_version', width : 200, title : '软件版本', align: 'center'},
                {field : 'T1_CID', width : 200, title : 'T1_CID', align: 'center'},
                {field : 'T2_CID', width : 200, title : 'T2_CID', align: 'center'},
                {field : 'shipping_address', width : 200, title : '出货地址', align: 'center'},
                {field : 'AHD_A_channel', width : 200, title : 'AHD_A通道', align: 'center'},
                {field : 'AHD_B_channel', width : 200, title : 'AHD_B通道', align: 'center'},
                {field : 'AHD_C_channel', width : 200, title : 'AHD_C通道', align: 'center'},
                {field : 'AHD_D_channel', width : 200, title : 'AHD_D通道', align: 'center'},
                {field : 'touch_screen', width : 200, title : '触摸屏', align: 'center'},
                {field : 'secondary_touch_screen', width : 200, title : '副触摸屏', align: 'center'},
                {field : 'third_touch_screen', width : 200, title : '第三触摸屏', align: 'center'},
                {field : 'display', width : 200, title : '显示屏', align: 'center'},
                {field : 'secondary_display', width : 200, title : '副显示屏', align: 'center'},
                {field : 'third_display', width : 200, title : '第三显示屏', align: 'center'},
                {field : 'fm_launch', width : 200, title : 'fm发射', align: 'center'},
                {field : 'accelerometer', width : 200, title : '加速传感计', align: 'center'},
                {field : 'gyro_sensor', width : 200, title : '陀螺仪传感器', align: 'center'},
                {field : 'electronic_compass_sensor', width : 200, title : '电子罗盘传感器', align: 'center'},
                {field : 'light_perception_and_proximity_sensor', width : 200, title : '光感和接近传感器', align: 'center'},
                {field:'createTime', title: '上传时间',width: 200,align: 'center' ,templet:function (d) {
                        if (d.createTime == null) {return "";}
                        return util.toDateString(d.createTime, "yyyy-MM-dd HH:mm:ss");
                    }},

            ] ],
            done: function(res, curr, count){
                //如果是异步请求数据方式，res即为你接口返回的信息。
                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                //console.log(res);
                //得到当前页码
                //console.log(curr);
                //得到数据总量
                //console.log(count);
                pageCurr=curr;
                // AutoTableHeight();

                console.log("监听where:", this.where);
                //非常重要！如果使table.reload()后依然使用过滤，就必须将过滤组件也reload()一下
                apitableFilterIns.reload()

            }
        });
       var apitableFilterIns = tableFilter.render({
            'elem' : '#demo',
            'parent' : '#doc-content',
            'mode' : 'api',
            'filters' : [
                {type:'checkbox'},
                {field : 'date',type:'input'},
                {field : 'case_number',type:'input'},
                {field : 'product_type', type:'input'},
                {field : 'machine_sn',type:'input'},
                {field : 'imei_1', type:'input'},
                {field : 'aging_test_temperature', type:'input'},
                {field : 'motherboard_id', type:'input'},
                {field : 'main_camera', type:'input'},
                {field : 'usb_camera',type:'input'},
                {field : 'secondary_camera', type:'input'},
                {field : 'imei_2', type:'input'},
                {field : 'motherboard_sn', type:'input'},
                {field : 'ICCID1', type:'input'},
                {field : 'ICCID2', type:'input'},
                {field : 'BT', type:'input'},
                {field : 'WiFi', type:'input'},
                {field : 'software_version', type:'input'},
                {field : 'T1_CID',type:'input'},
                {field : 'T2_CID', type:'input'},
                {field : 'shipping_address',type:'input'},
                {field : 'AHD_A_channel', type:'input'},
                {field : 'AHD_B_channel',type:'input'},
                {field : 'AHD_C_channel',type:'input'},
                {field : 'AHD_D_channel', type:'input'},
                {field : 'touch_screen',type:'input'},
                {field : 'secondary_touch_screen', type:'input'},
                {field : 'third_touch_screen', type:'input'},
                {field : 'display', type:'input'},
                {field : 'secondary_display', type:'input'},
                {field : 'third_display', type:'input'},
                {field : 'fm_launch', type:'input'},
                {field : 'accelerometer', type:'input'},
                {field : 'gyro_sensor', type:'input'},
                {field : 'electronic_compass_sensor',type:'input'},
                {field : 'light_perception_and_proximity_sensor',type:'input'},
            ],
            'done': function(filters){

            }
        })




        //监听表格复选框选择
        table.on('checkbox(demo)', function(obj){
            console.log(obj.checked); //当前是否选中状态
        });

        //监听工具条
        table.on('tool(demo)', function(obj){
            var data = obj.data;
            if(obj.event === 'del'){
                delUser(data,data.id,data.username);
            } else if(obj.event === 'edit'){
                //编辑
                getUserAndRoles(data,data.id);
            }
        });
        //监听提交
        form.on('submit(userSubmit)', function(data){
            // TODO 校验
            formSubmit(data);
            return false;
        });

        var $ = layui.$, active = {
            /**批量删除*/
            del: function(){ //获取选中数据
                var checkStatus = table.checkStatus('idTest')
                    ,data = checkStatus.data;
                if(data.length<1){
                    alert("请选中一条记录！");
                    return false;
                }
                var dataStr = JSON.stringify(data);
                $.ajax({
                    type: "POST",
                    data: {data : dataStr},
                    url: "/product/delProduct",
                    success: function (res) {
                        console.log(typeof res);
                            if (res == "ok") {
                                layer.alert("操作成功",function(){
                                        layer.closeAll();
                                        load(res);
                                });
                            } else {
                                layer.alert(res,function(){
                                    layer.closeAll();
                                    //加载load方法
                                    load(res);//自定义
                                });
                            }

                    },
                    error: function (res) {
                        layer.alert("操作请求错误，请您稍后再试",function(){
                            layer.closeAll();
                            //加载load方法
                            load(res);//自定义
                        });
                    }
                });
                // layer.alert(JSON.stringify(data));
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            },

        };

        $('.demoTable .layui-btn').on('click', function(){
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });



    });
    //搜索框
    layui.use(['form','laydate'], function(){
        var form = layui.form ,layer = layui.layer
            ,laydate = layui.laydate;
        //日期
        laydate.render({
            elem: '#insertTimeStart'
        });
        laydate.render({
            elem: '#insertTimeEnd'
        });
        //TODO 数据校验
        //监听搜索框
        form.on('submit(searchSubmit)', function(data){
            //重新加载table
            load(data);
            return false;
        });
    });

    layui.use('upload', function() {
        var $ = layui.jquery
            , upload = layui.upload;

        //指定允许上传的文件类型
        upload.render({
            elem: '#test3'
            ,url: '/product/upload'
            ,accept: 'file' //普通文件
            ,done: function(res){
                //上传完毕回调
                console.log(res)
                layer.open({
                    content: res.data
                    ,btn: ['下载']
                    ,yes: function(index, layero){
                        window.open("/product/exportExcel");
                    }
                    ,cancel: function(){
                        //右上角关闭回调
                        //return false 开启该代码可禁止点击该按钮关闭
                        window.parent.location.reload(); //刷新父页面
                    }
                });

            }
            ,error: function(){
                //请求异常回调
            }

        });


    });
});


/**
 * 重新刷新页面
 * */
function load(obj){
    //重新加载table
    tableIns.reload({
        where: obj.field
        , page: {
            curr: pageCurr //从当前页码开始
        }
    });
}

