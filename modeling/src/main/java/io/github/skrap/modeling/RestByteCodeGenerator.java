package io.github.skrap.modeling;

import lombok.extern.slf4j.Slf4j;
import org.springframework.asm.*;


/**
 * Rest类的字节码生成器
 *
 * @author meikefu
 * @date 2021-5-10
 */
@Slf4j
public class RestByteCodeGenerator {

    protected String name;

    public RestByteCodeGenerator(String name){
        this.name = name;
    }

    public byte[] generator(){
        final ClassWriter classWriter = new ClassWriter(0);
        FieldVisitor fieldVisitor;
        MethodVisitor methodVisitor;
        AnnotationVisitor annotationVisitor0;

        classWriter.visit(Opcodes.V1_8, Opcodes.ACC_PUBLIC | Opcodes.ACC_SUPER, "io/github/goat/UserController", "Lio/github/goat/AbstractRestController<Lio/github/goat/UserRepo;Lio/github/goat/User;>;", "io/github/goat/AbstractRestController", null);

//        classWriter.visitSource("UserController.java", null);

        {
            annotationVisitor0 = classWriter.visitAnnotation("Lio/swagger/annotations/Api;", true);
            annotationVisitor0.visit("value", "\u7528\u6237\u7ba1\u7406\u76f8\u5173\u670d\u52a1");
            annotationVisitor0.visitEnd();
        }
        {
            annotationVisitor0 = classWriter.visitAnnotation("Lorg/springframework/web/bind/annotation/RestController;", true);
            annotationVisitor0.visitEnd();
        }
        {
            annotationVisitor0 = classWriter.visitAnnotation("Lorg/springframework/web/bind/annotation/RequestMapping;", true);
            {
                AnnotationVisitor annotationVisitor1 = annotationVisitor0.visitArray("value");
                annotationVisitor1.visit(null, "/_api/user");
                annotationVisitor1.visitEnd();
            }
            annotationVisitor0.visitEnd();
        }
        {
            methodVisitor = classWriter.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "(Lio/github/goat/UserRepo;)V", null, null);
            methodVisitor.visitCode();
            Label label0 = new Label();
            methodVisitor.visitLabel(label0);
            methodVisitor.visitLineNumber(13, label0);
            methodVisitor.visitVarInsn(Opcodes.ALOAD, 0);
            methodVisitor.visitVarInsn(Opcodes.ALOAD, 1);
            methodVisitor.visitLdcInsn("user");
            methodVisitor.visitMethodInsn(Opcodes.INVOKESPECIAL, "io/github/goat/AbstractRestController", "<init>", "(Lorg/springframework/data/jpa/repository/support/JpaRepositoryImplementation;Ljava/lang/String;)V", false);
            Label label1 = new Label();
            methodVisitor.visitLabel(label1);
            methodVisitor.visitLineNumber(14, label1);
            methodVisitor.visitInsn(Opcodes.RETURN);
            Label label2 = new Label();
            methodVisitor.visitLabel(label2);
            methodVisitor.visitLocalVariable("this", "Lio/github/goat/UserController;", null, label0, label2, 0);
            methodVisitor.visitLocalVariable("userRepo", "Lio/github/goat/UserRepo;", null, label0, label2, 1);
            methodVisitor.visitMaxs(3, 2);
            methodVisitor.visitEnd();
        }
        classWriter.visitEnd();

        return classWriter.toByteArray();
    }
}
