import { createVue } from '../util.js';
import UserLogin from 'dacp-meta-web/src/views/user-login/UserLogin.vue';

describe('test UserLogin.vue', () => {
    const vm = createVue(UserLogin);
    const UserLoginVm = vm.$children[0];
    it('测试验证码', () => {
        expect(UserLoginVm.isverifycode).toEqual(false);
    });

    it('验证用户名', () => {
        UserLoginVm.form.userId = null;
        UserLoginVm.loginBtn();
        expect(UserLoginVm.errorMsg).toEqual('用户名长度错误！');

        UserLoginVm.form.userId = String('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        // console.log(UserLoginVm.form.userId.length);
        UserLoginVm.loginBtn();
        expect(UserLoginVm.errorMsg).toEqual('用户名长度错误！');
    });

    it('验证用户密码', () => {
        UserLoginVm.form.password = null;
        UserLoginVm.loginBtn();
        expect(UserLoginVm.errorMsg).toEqual('密码长度错误！');

        UserLoginVm.form.password = String('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
        // console.log(UserLoginVm.form.password.length);
        UserLoginVm.loginBtn();
        expect(UserLoginVm.errorMsg).toEqual('密码长度错误！');
    });
});
