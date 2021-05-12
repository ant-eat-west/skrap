import { createVue } from '../util.js';
import DsMgr from 'dacp-meta-web/src/views/ds-mgr/DsMgr.vue';

describe('test DsMgr.vue', () => {
    const vm = createVue(DsMgr);
    const DsMgrVm = vm.$children[0];
    it('测试数据源类型转换', () => {
        expect(DsMgrVm.dsTypeClassFormat('mysql')).toEqual('uex-icon-mysql');
        expect(DsMgrVm.dsTypeClassFormat('oracle')).toEqual('uex-icon-oracle');
        expect(DsMgrVm.dsTypeClassFormat('db2')).toEqual('uex-icon-db2');
        expect(DsMgrVm.dsTypeClassFormat('gbase')).toEqual('uex-icon-gbase');
        expect(DsMgrVm.dsTypeClassFormat('hive')).toEqual('uex-icon-hive-database');
        expect(DsMgrVm.dsTypeClassFormat('hbase')).toEqual('uex-icon-hbase');
        expect(DsMgrVm.dsTypeClassFormat('ftp')).toEqual('uex-icon-ftp');
        expect(DsMgrVm.dsTypeClassFormat('ssh')).toEqual('uex-icon-ssh');
        expect(DsMgrVm.dsTypeClassFormat('hadoop')).toEqual('uex-icon-hadoop');
        expect(DsMgrVm.dsTypeClassFormat('postgresql')).toEqual('uex-icon-postgresql');
        expect(DsMgrVm.dsTypeClassFormat('vertica')).toEqual('uex-icon-vertica');
        expect(DsMgrVm.dsTypeClassFormat('redis')).toEqual('uex-icon-redis');
        expect(DsMgrVm.dsTypeClassFormat('kafka')).toEqual('uex-icon-kafka');
        expect(DsMgrVm.dsTypeClassFormat('http')).toEqual('uex-icon-http');
        expect(DsMgrVm.dsTypeClassFormat('es')).toEqual('uex-icon-ES');
        expect(DsMgrVm.dsTypeClassFormat('other')).toEqual('uex-icon-database');
    });

    it('测试数据源列表名称转换', () => {
        const row = { name: null, parentDsName: null, dsCategory: null, dsType: null, driverClassName: null };
        expect(DsMgrVm.baseDataFormat(row)[0].value.toEqual('数据源英文名 :'));
        expect(DsMgrVm.baseDataFormat(row)[0].value.toEqual('无'));
        expect(DsMgrVm.baseDataFormat(row)[1].label.toEqual('数据源所属 :'));
        expect(DsMgrVm.baseDataFormat(row)[1].value.toEqual('无'));
        expect(DsMgrVm.baseDataFormat(row)[2].label.toEqual('数据源类目 : '));
        expect(DsMgrVm.baseDataFormat(row)[2].value.toEqual('无'));
        expect(DsMgrVm.baseDataFormat(row)[3].label.toEqual('数据源类型 :'));
        expect(DsMgrVm.baseDataFormat(row)[3].value.toEqual('无'));
        expect(DsMgrVm.baseDataFormat(row)[4].label.toEqual('驱动类名称 :'));
        expect(DsMgrVm.baseDataFormat(row)[4].value.toEqual('无'));

        const rowb = { name: '1', parentDsName: '2', dsCategory: '3', dsType: '4', driverClassName: '5' };
        expect(DsMgrVm.baseDataFormat(rowb)[0].label.toEqual('数据源英文名 :'));
        expect(DsMgrVm.baseDataFormat(rowb)[0].value.toEqual('1'));
        expect(DsMgrVm.baseDataFormat(rowb)[1].label.toEqual('数据源所属 :'));
        expect(DsMgrVm.baseDataFormat(rowb)[1].value.toEqual('2'));
        expect(DsMgrVm.baseDataFormat(rowb)[2].label.toEqual('数据源类目 : '));
        expect(DsMgrVm.baseDataFormat(rowb)[2].value.toEqual('3'));
        expect(DsMgrVm.baseDataFormat(rowb)[3].label.toEqual('数据源类型 :'));
        expect(DsMgrVm.baseDataFormat(rowb)[3].value.toEqual('4'));
        expect(DsMgrVm.baseDataFormat(rowb)[4].label.toEqual('驱动类名称 :'));
        expect(DsMgrVm.baseDataFormat(rowb)[4].value.toEqual('5'));
    });
});
