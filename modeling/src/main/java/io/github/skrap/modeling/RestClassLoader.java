package io.github.skrap.modeling;

import lombok.extern.slf4j.Slf4j;


/**
 * Rest类的加载器
 *
 * @author meikefu
 * @date 2021-5-10
 */
@Slf4j
public class RestClassLoader extends ClassLoader{

    public RestClassLoader(ClassLoader parent){
        super(parent);
    }

    @Override
    public Class findClass(String name) throws ClassFormatError{

        RestByteCodeGenerator byteCodeGenerator = new RestByteCodeGenerator(name);
        byte[] clazzBytes = byteCodeGenerator.generator();
/*
            if(name.endsWith("MetaUserRoleMapDao")){
                try {
                    FileOutputStream file = new FileOutputStream("/Users/meikefu/Desktop/"+name+".class");
                    file.write(clazzBytes);
                    file.close();
                } catch ( IOException e) {
                    e.printStackTrace();
                }
            }*/
        log.info("生成RestController字节码成功，{}",name);
        return defineClass(name, clazzBytes, 0, clazzBytes.length);
    }
}
