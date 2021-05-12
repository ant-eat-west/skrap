package io.github.skrap.modeling;

import org.apache.avro.Schema;
import org.apache.avro.compiler.specific.CompilerProxy;
import org.apache.avro.compiler.specific.SpecificCompiler;
import org.apache.avro.file.DataFileReader;
import org.apache.avro.file.DataFileWriter;
import org.apache.avro.generic.GenericData;
import org.apache.avro.generic.GenericDatumReader;
import org.apache.avro.generic.GenericDatumWriter;
import org.apache.avro.generic.GenericRecord;
import org.apache.avro.io.DatumReader;
import org.apache.avro.io.DatumWriter;
import org.junit.Assert;
import org.junit.Test;

import java.io.File;
import java.io.IOException;


public class AvroTest {

    @Test
    public void test1(){
        Assert.assertEquals("1","1");
    }

//    @Test
    public void test2() throws IOException {
        String avscFilePath = AvroTest.class.getClassLoader().getResource("model/user.avsc").getPath();
        Schema schema = new Schema.Parser().parse(new File(avscFilePath));

        GenericRecord user1 = new GenericData.Record(schema);
        user1.put("name", "Tony");
        user1.put("id", "12");

        GenericRecord user2 = new GenericData.Record(schema);
        user2.put("name", "Ben");
        user2.put("id", "3");

        File file = new File("user2.avro");
        DatumWriter<GenericRecord> datumWriter = new GenericDatumWriter<GenericRecord>(schema);
        DataFileWriter<GenericRecord> dataFileWriter = new DataFileWriter<GenericRecord>(datumWriter);
        dataFileWriter.create(schema, file);
        dataFileWriter.append(user1);
        dataFileWriter.append(user2);
        dataFileWriter.close();
    }

//    @Test
    public void test3() throws IOException {
        String avscFilePath = AvroTest.class.getClassLoader().getResource("model/user.avsc").getPath();
        Schema schema = new Schema.Parser().parse(new File(avscFilePath));
        File file = new File("user2.avro");
        DatumReader<GenericRecord> datumReader = new GenericDatumReader<GenericRecord>(schema);
        DataFileReader<GenericRecord> dataFileReader = new DataFileReader<GenericRecord>(file, datumReader);
        GenericRecord user = null;
        while (dataFileReader.hasNext()) {
            user = dataFileReader.next(user);
            System.out.println(user);
        }
    }

//    @Test
    public void test4() throws IOException {
        String avscFilePath = AvroTest.class.getClassLoader().getResource("model/user.avsc").getPath();
        Schema schema = new Schema.Parser().parse(new File(avscFilePath));
        SpecificCompiler sp = new SpecificCompiler(schema);
        sp.setStringType(GenericData.StringType.String);
        String out = CompilerProxy.compiler(sp,schema);

        System.out.println(out);
    }

    @Test
    public void test5() throws IOException {
        String avscFilePath = AvroTest.class.getClassLoader().getResource("model/user.avsc").getPath();
        Schema schema = new Schema.Parser().parse(new File(avscFilePath));
        SpecificCompiler sp = new SpecificCompiler(schema);
        sp.setStringType(GenericData.StringType.String);
        String out = CompilerProxy.compiler(sp,schema);

        System.out.println(out);
    }
}
