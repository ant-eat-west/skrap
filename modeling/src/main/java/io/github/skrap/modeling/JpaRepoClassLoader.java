package io.github.skrap.modeling;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

import java.util.Map;


/**
 * JpaRepo类的加载器
 *
 * @author meikefu
 * @date 2021-5-2
 */
@Slf4j
public class JpaRepoClassLoader extends ClassLoader{

    public JpaRepoClassLoader(ClassLoader parent){
        super(parent);
    }

    @Override
    public Class findClass(String name) throws ClassFormatError{

        JpaRepoByteCodeGenerator byteCodeGenerator = new JpaRepoByteCodeGenerator(name);
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
        log.info("生成JpaDao字节码成功，{}",name);
        return defineClass(name, clazzBytes, 0, clazzBytes.length);
    }
}
