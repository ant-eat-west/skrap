package io.github.skrap.modeling;

import lombok.extern.slf4j.Slf4j;

import org.springframework.asm.*;

import org.springframework.asm.ClassWriter;

/**
 * JpaRepo类的字节码生成器
 *
 * @author meikefu
 * @date 2021-5-2
 */
@Slf4j
public class JpaRepoByteCodeGenerator {

    protected String name;

    public JpaRepoByteCodeGenerator(String name){
        this.name = name;
    }

    public byte[] generator(){
        final ClassWriter classWriter = new ClassWriter(0);
        FieldVisitor fieldVisitor;
        MethodVisitor methodVisitor;
        AnnotationVisitor annotationVisitor0;

        classWriter.visit(Opcodes.V1_8, Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT | Opcodes.ACC_INTERFACE, "io/github/goat/TestRepo1", "Ljava/lang/Object;Lorg/springframework/data/jpa/repository/support/JpaRepositoryImplementation<Lio/github/goat/User;Ljava/lang/String;>;", "java/lang/Object", new String[]{"org/springframework/data/jpa/repository/support/JpaRepositoryImplementation"});

//        classWriter.visitSource("TestRepo.java", null);

        {
            annotationVisitor0 = classWriter.visitAnnotation("Lorg/springframework/stereotype/Repository;", true);
            annotationVisitor0.visitEnd();
        }
        classWriter.visitEnd();

        return classWriter.toByteArray();
    }
}
