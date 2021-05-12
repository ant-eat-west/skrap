Vue.mixin({
	data: function (){
		return {
			extendData: {}
		}
	},
  	beforeCreate: function () {
	    if (this.$options.name === 'DsCreate') {

	      	/*const testHTML = `<div>
	          	<div>
	            	<span>测试更改数据源接口</span>
	          	</div>
	          	<el-button @click="save">保存</el-button>
	        </div>`;
	      	var div = document.createElement('div');
	      	div.innerHTML = testHTML;
	      	console.log(div);*/

	      	/*const res = Vue.compile(`
	        	<div>
	          		<div>
	            		<span>测试更改数据源接口</span>
	          		</div>
	          		<el-button @click="save">保存</el-button>
	        	</div>
	      	`);
	      	console.log(res);
	      	this.$options.render = res.render;
	      	this.$options.staticRenderFns = res.staticRenderFns;*/


	      	//const save = this.$options.methods['save'];
	      	//console.log(save.toString())
	      	this.$options.methods['save'] = function () {
	        	//save();
	        	alert('修改了保存接口')
	    	}
	    }
	    if (this.$options.name === 'DsCreateForm') {
	    	const template = this.$options.template;
	      	var div = document.createElement('div');
	      	div.innerHTML = template;
	      	var insertDom = document.createElement('template');
	      	insertDom.innerHTML = `
		      	<el-form-item label="数据源id" prop="id" ref="id">
	                <el-input v-model="extendData.id" :disabled="pageStatus == 'edit'"></el-input>
	            </el-form-item>
            `;
            div.querySelector('el-form').insertBefore(insertDom, div.querySelector('el-form el-form-item:nth-child(1)'));

            var res = Vue.compile(div.innerHTML);
	      	this.$options.render = res.render;
	      	this.$options.staticRenderFns = res.staticRenderFns;
	    }
  	},
  	created: function () {
    	if (this.$options.name === 'DsCreate') {
      		// console.log('xxx');
    	}
    	if (this.$options.name === 'DsCreateForm') {
    		// console.log(this);
    		Vue.set(this.extendData, 'id', '');
    		// console.log(this);
    	}
  	}
})