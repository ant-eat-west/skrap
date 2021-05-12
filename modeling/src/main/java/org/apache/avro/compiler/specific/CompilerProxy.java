package org.apache.avro.compiler.specific;

import org.apache.avro.Schema;

import javax.tools.JavaCompiler;
import javax.tools.ToolProvider;

public class CompilerProxy {
    public static String compiler(SpecificCompiler specificCompiler,Schema schema){
        SpecificCompiler.OutputFile o = specificCompiler.compile(schema);
        return o.contents;
    }
}
