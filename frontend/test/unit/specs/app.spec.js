import {createVue} from '../util.js';
import DsCreate from 'dacp-meta-web/src/views/ds-create/DsCreate.vue';

describe('test DsCreate.vue', () => {
	let vm = createVue(DsCreate);
	let dsCreateVm = vm.$children[0];
	it('测试名称', () => {
  		expect(dsCreateVm.title).toEqual('ds-create');
	});
	it('数据源为编辑状态时，数据源名称表单项禁止修改', () => {
  		dsCreateVm.setPageStatus('edit');
  		dsCreateVm.$nextTick(function() {
  			expect(dsCreateVm.$store.state['dsCreate-' + dsCreateVm.storeIdx].pageStatus).toEqual('edit');
  			expect(dsCreateVm.$refs['dsCreateForm'].$refs['name'].$children[1].disabled).toEqual(true);
  		});
	});
	it('验证数据源名称', () => {
	/*验证*/
		dsCreateVm.setForm({name: ''});
		dsCreateVm.$refs['dsCreateForm'].validate((valid) => {
			expect(valid).toEqual(false);
			expect(dsCreateVm.$refs['dsCreateForm'].$refs['name'].validateMessage).toEqual('请输入数据源名称');
		});
		dsCreateVm.setForm({name: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'});
		dsCreateVm.$refs['dsCreateForm'].validate((valid) => {
			expect(valid).toEqual(false);
			expect(dsCreateVm.$refs['dsCreateForm'].$refs['name'].validateMessage).toEqual('不能超过32位');
		});
		dsCreateVm.setForm({name: '＊＊＊＊'});
		dsCreateVm.$refs['dsCreateForm'].validate((valid) => {
			expect(valid).toEqual(false);
			expect(dsCreateVm.$refs['dsCreateForm'].$refs['name'].validateMessage).toEqual('数据源名必须包含英文字母，且只能输入英文字母、数字、括号,“-”,“_”,“.”,“|”');
		});
	});
	it('验证数据源中文名', () => {
		dsCreateVm.setForm({label: ''});
		dsCreateVm.$refs['dsCreateForm'].validate((valid) => {
			expect(valid).toEqual(false);
			expect(dsCreateVm.$refs['dsCreateForm'].$refs['label'].validateMessage).toEqual('请输入数据源中文名');
		});
		dsCreateVm.setForm({label: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'});
		dsCreateVm.$refs['dsCreateForm'].validate((valid) => {
			expect(valid).toEqual(false);
			expect(dsCreateVm.$refs['dsCreateForm'].$refs['label'].validateMessage).toEqual('不能超过64位');
		});
	});
	it('验证生产库IP地址和端口', () => {
		dsCreateVm.setForm({dsInstLoc: ''});
		dsCreateVm.$refs['dsCreateForm'].validate((valid) => {
			expect(valid).toEqual(false);
			expect(dsCreateVm.$refs['dsCreateForm'].$refs['dsInstLoc'].validateMessage).toEqual('请输入生产库IP地址和端口');
		});
	});
	it('验证开发库IP地址和端口', () => {
		dsCreateVm.setForm({devDsInstLoc: ''});
		dsCreateVm.$refs['dsCreateForm'].validate((valid) => {
			expect(valid).toEqual(false);
			expect(dsCreateVm.$refs['dsCreateForm'].$refs['devDsInstLoc'].validateMessage).toEqual('请输入开发库IP地址和端口');
		});
	});
	it('验证数据源类目', () => {
		dsCreateVm.setForm({dsCategory: ''});
		dsCreateVm.$refs['dsCreateForm'].validate((valid) => {
			expect(valid).toEqual(false);
			expect(dsCreateVm.$refs['dsCreateForm'].$refs['dsCategory'].validateMessage).toEqual('请选择数据源类目');
		});
	});
})