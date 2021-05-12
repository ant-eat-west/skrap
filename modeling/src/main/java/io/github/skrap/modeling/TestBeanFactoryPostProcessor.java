package io.github.skrap.modeling;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanCreationException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.AbstractBeanDefinition;
import org.springframework.beans.factory.support.BeanDefinitionBuilder;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean;
import org.springframework.stereotype.Component;

//@Component
@Slf4j
public class TestBeanFactoryPostProcessor implements ApplicationContextAware, BeanFactoryPostProcessor {

    private ApplicationContext applicationContext;

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory1) throws BeansException {
        if(beanFactory1 instanceof DefaultListableBeanFactory) {
            DefaultListableBeanFactory beanFactory = (DefaultListableBeanFactory) beanFactory1;

            JpaRepoClassLoader classLoader = new JpaRepoClassLoader(beanFactory.getBeanClassLoader());
            beanFactory.setBeanClassLoader(classLoader);

            Class daoClass = null;
            try{
                daoClass = classLoader.loadClass("io.github.goat.TestRepo1");
                validateClass(daoClass);
                String simpleDaoName = "testRepo";
                registerDaoBeanDefinition(beanFactory,daoClass,simpleDaoName);
                log.debug("注册{}的BeanDefine成功",simpleDaoName);
            }catch(NoClassDefFoundError | ClassNotFoundException e){
                log.error("{}字节码生成错误，请联系meikf",daoClass.getName());
                throw new BeanCreationException(daoClass.getName()+" 字节码生成错误，MeiKefu");
            }
        }

    }

    private void validateClass(Class clazz){
        clazz.getMethods();
        clazz.getPackage();
        clazz.getAnnotations();
    }

    private void registerDaoBeanDefinition(DefaultListableBeanFactory beanFactory,Class daoClass,String simpleDaoName){
        BeanDefinitionBuilder builder = BeanDefinitionBuilder.rootBeanDefinition(JpaRepositoryFactoryBean.class);
        builder.addConstructorArgValue(daoClass);
        builder.addPropertyValue("queryLookupStrategyKey", "CREATE_IF_NOT_FOUND");
        builder.addPropertyValue("lazyInit", false);
        builder.setLazyInit(false);
        AbstractBeanDefinition beanDefinition = builder.getBeanDefinition();
        beanDefinition.setPrimary(false);
        beanDefinition.setAttribute("factoryBeanObjectType", daoClass);
        beanFactory.registerBeanDefinition(simpleDaoName, beanDefinition);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
