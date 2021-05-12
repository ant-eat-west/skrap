import Vue from 'vue';

import Test from 'dacp-meta-web/src/views/test/Test.vue';

describe('test Test.vue', () => {
	it('xxxxxx', () => {
		let vm = new Vue(Test).$mount();
		expect(vm.title).toEqual('test');
		expect(vm.b).toEqual(0);
		vm.a = 10;
		vm.$nextTick(function() {
			expect(vm.b).toEqual(10);
		});
	});
})