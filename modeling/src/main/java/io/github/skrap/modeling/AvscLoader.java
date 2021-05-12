package io.github.skrap.modeling;

import org.apache.avro.Schema;
import org.apache.avro.compiler.specific.CompilerProxy;
import org.apache.avro.compiler.specific.SpecificCompiler;
import org.apache.avro.generic.GenericData;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;

import javax.tools.JavaCompiler;
import javax.tools.ToolProvider;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;

public class AvscLoader {


    public void test4(ApplicationContext applicationContext) throws IOException {

        String rootPath = AvscLoader.class.getClassLoader().getResource("").getPath();

        String jarPath = rootPath.substring(0,rootPath.lastIndexOf("classes"))+File.separator+"lib"+File.separator;
        StringBuilder jarAbsolutePath = new StringBuilder();
//        jarAbsolutePath.append(jarPath).append("avro-1.10.2.jar:")
//                .append(jarPath).append("jackson-core-2.11.4.jar:")
//                .append(jarPath).append("jakarta.persistence-api-2.2.3.jar:");

        jarAbsolutePath.append("/Users/meikefu/.gradle/caches/modules-2/files-2.1/org.apache.avro/avro/1.10.2/a65aaa91c1aeceb3dd4859dbb9765d1c2063f5a2/avro-1.10.2.jar:")
                .append("/Users/meikefu/.gradle/caches/modules-2/files-2.1/com.fasterxml.jackson.core/jackson-core/2.11.4/593f7b18bab07a76767f181e2a2336135ce82cc4/jackson-core-2.11.4.jar:")
                .append("/Users/meikefu/.gradle/caches/modules-2/files-2.1/jakarta.persistence/jakarta.persistence-api/2.2.3/8f6ea5daedc614f07a3654a455660145286f024e/jakarta.persistence-api-2.2.3.jar:");

        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        Resource[] resources = applicationContext.getResources("classpath*:model/*.avsc");
        for (Resource resource : resources) {
            if (resource != null && resource.isReadable()) {
                Schema schema = new Schema.Parser().parse(resource.getFile());
                SpecificCompiler sp = new SpecificCompiler(schema);
                sp.setStringType(GenericData.StringType.String);
                String out = CompilerProxy.compiler(sp,schema);

                String pkg = schema.getNamespace();

                String javaFileName = schema.getName();

                String javaPackageName = pkg.replace(".", File.separator);
                String javaAbsolutePath = rootPath+javaPackageName+File.separator+javaFileName+".java";


                File javaFilePath = new File(rootPath+javaPackageName);
                if(!javaFilePath.isDirectory() && javaFilePath.mkdirs()){

                }

                File file = new File(javaAbsolutePath);

                PrintWriter pw = new PrintWriter(file);
                pw.println(out);
                pw.close();

                compiler.run(null,null,null,"-encoding","UTF-8","-classpath",jarAbsolutePath.toString(),javaAbsolutePath);

                try {
                    Class.forName(schema.getFullName());
                } catch (ClassNotFoundException e) {
                    e.printStackTrace();
                }

//                System.out.println(out);
            }
        }
    }

    public static void compiler(){

        AvscLoader.class.getClassLoader().getResource("/");



    }
}
